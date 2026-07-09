"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import type { Report, RiskLevel } from "@/lib/types";
import { BANGKOK_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/map-utils";

const PIN_COLORS: Record<RiskLevel, string> = {
  ปกติ: "#4E5768",
  เริ่มอุดตัน: "#8A5A00",
  อุดตันหนัก: "#B3261E",
};

function createPinIcon(color: string, selected: boolean) {
  const size = selected ? 22 : 16;
  const border = selected ? 3 : 2;
  return L.divIcon({
    className: selected
      ? "faotor-map-pin--selected faotor-map-pin--selected-bounce"
      : "faotor-map-pin",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:50%;background:${color};border:${border}px solid #fff;box-shadow:0 ${selected ? 3 : 1}px ${selected ? 8 : 4}px rgba(0,0,0,${selected ? 0.45 : 0.35})${selected ? ",0 0 0 3px rgba(47,111,237,0.4)" : ""}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapController({
  selectedId,
  reports,
}: {
  selectedId?: string | null;
  reports: Report[];
}) {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 50);
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [map]);

  useEffect(() => {
    if (!selectedId) return;
    const report = reports.find((r) => r.id === selectedId);
    if (
      report?.lat == null ||
      report?.lng == null ||
      Number.isNaN(report.lat) ||
      Number.isNaN(report.lng)
    ) {
      return;
    }
    map.flyTo([report.lat, report.lng], Math.max(map.getZoom(), 14), {
      duration: 0.55,
      easeLinearity: 0.25,
    });
  }, [selectedId, reports, map]);

  return null;
}

interface LeafletMapProps {
  reports: Report[];
  selectedId?: string | null;
  onPinClick: (report: Report) => void;
  className?: string;
}

export function LeafletMap({
  reports,
  selectedId,
  onPinClick,
  className = "h-full min-h-[200px] w-full",
}: LeafletMapProps) {
  const markers = useMemo(
    () =>
      reports.filter(
        (r) =>
          r.lat != null &&
          r.lng != null &&
          !Number.isNaN(r.lat) &&
          !Number.isNaN(r.lng)
      ),
    [reports]
  );

  return (
    <MapContainer
      center={[BANGKOK_CENTER.lat, BANGKOK_CENTER.lng]}
      zoom={DEFAULT_MAP_ZOOM}
      scrollWheelZoom
      className={`faotor-leaflet-map ${className} [&_.leaflet-control-attribution]:text-[10px]`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedId={selectedId} reports={markers} />
      {markers.map((report) => {
        const selected = report.id === selectedId;
        return (
          <Marker
            key={report.id}
            position={[report.lat!, report.lng!]}
            zIndexOffset={selected ? 1000 : 0}
            icon={createPinIcon(PIN_COLORS[report.riskLevel], selected)}
            eventHandlers={{
              click: (e) => {
                L.DomEvent.stopPropagation(e);
                onPinClick(report);
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}
