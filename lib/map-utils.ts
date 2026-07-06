/** พิกัดศูนย์กลางกรุงเทพฯ สำหรับแผนที่ dashboard */
export const BANGKOK_CENTER = {
  lat: 13.7563,
  lng: 100.5018,
} as const;

export const DEFAULT_MAP_ZOOM = 11;

/** สุ่มพิกัดรอบกรุงเทพฯ สำหรับรายงานใหม่ที่ไม่มี GPS */
export function randomBangkokCoords(): { lat: number; lng: number } {
  return {
    lat: BANGKOK_CENTER.lat + (Math.random() - 0.5) * 0.12,
    lng: BANGKOK_CENTER.lng + (Math.random() - 0.5) * 0.18,
  };
}

/** แปลง mapX/mapY เก่า (0–100) เป็นพิกัดโดยประมาณในกรุงเทพฯ */
export function coordsFromLegacyMapXY(
  mapX: number,
  mapY: number
): { lat: number; lng: number } {
  return {
    lat: 13.65 + (mapY / 100) * 0.22,
    lng: 100.45 + (mapX / 100) * 0.28,
  };
}

/** ดึงพิกัดจาก Geolocation API หรือ fallback สุ่มกรุงเทพฯ */
export function getReportCoords(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve(randomBangkokCoords());
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => resolve(randomBangkokCoords()),
      { timeout: 4000, maximumAge: 60_000 }
    );
  });
}
