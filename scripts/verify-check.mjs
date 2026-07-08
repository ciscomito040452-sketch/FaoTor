#!/usr/bin/env node
/**
 * End-to-end local verification:
 * 1) lint
 * 2) build
 * 3) start prod server on localhost
 * 4) run smoke checks against that server
 */
import { spawn } from "node:child_process";

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const host = "127.0.0.1";
const port = process.env.VERIFY_PORT ?? "3011";
const baseUrl = `http://${host}:${port}`;

function runStep(label, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n==> ${label}`);
    const child = spawn(npmCmd, args, {
      stdio: "inherit",
      shell: false,
      ...options,
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${label} failed with exit code ${code}`));
    });
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    console.log(`\n==> start server (${baseUrl})`);
    const child = spawn(
      npmCmd,
      ["run", "start", "--", "--hostname", host, "--port", port],
      {
        stdio: ["ignore", "pipe", "pipe"],
        shell: false,
      },
    );

    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("Server startup timed out"));
    }, 20000);

    const onData = (buf) => {
      const text = buf.toString();
      process.stdout.write(text);
      if (!settled && /Ready in|ready on/i.test(text)) {
        settled = true;
        clearTimeout(timeout);
        resolve(child);
      }
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", (buf) => process.stderr.write(buf.toString()));
    child.on("exit", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(new Error(`Server exited early with code ${code}`));
    });
  });
}

async function stopServer(child) {
  if (!child || child.killed) return;
  child.kill("SIGTERM");
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (!child.killed) child.kill("SIGKILL");
}

let server;
try {
  await runStep("lint", ["run", "lint"]);
  await runStep("build", ["run", "build"]);
  server = await startServer();
  await runStep("smoke", ["run", "smoke", "--", baseUrl]);
  console.log("\nAll verification checks passed.");
} catch (error) {
  console.error(`\nVerification failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await stopServer(server);
}
