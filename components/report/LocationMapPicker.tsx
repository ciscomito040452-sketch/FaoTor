"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { BANGKOK_CENTER, getReportCoords } from "@/lib/map-utils";

const REPORT_PIN_COLOR = "#2f6fed";

function createReportPinIcon() {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:20px;height:20px;border-radius:50% 50% 50% 0;background:${REPORT_PIN_COLOR};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.35);transform:rotate(-45deg)"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 18],
  });
}

function MapClickPicker({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapRecenter({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom, map]);
  return null;
}

function DraggablePin({
  position,
  onMove,
}: {
  position: [number, number];
  onMove: (lat: number, lng: number) => void;
}) {
  const markerRef = useRef<L.Marker | null>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (!marker) return;
        const { lat, lng } = marker.getLatLng();
        onMove(lat, lng);
      },
    }),
    [onMove]
  );

  return (
    <Marker
      draggable
      position={position}
      icon={createReportPinIcon()}
      eventHandlers={eventHandlers}
      ref={markerRef}
    />
  );
}

export interface LocationMapPickerProps {
  coords: { lat: number; lng: number } | null;
  onCoordsChange: (lat: number, lng: number) => void;
  labels: {
    hint: string;
    useMyLocation: string;
    coords: string;
    loading: string;
  };
}

export function LocationMapPicker({
  coords,
  onCoordsChange,
  labels,
}: LocationMapPickerProps) {
  const [ready, setReady] = useState(false);
  const [recenter, setRecenter] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getReportCoords().then((c) => {
      if (cancelled) return;
      onCoordsChange(c.lat, c.lng);
      setRecenter({ ...c, zoom: 16 });
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [onCoordsChange]);

  const handlePick = useCallback(
    (lat: number, lng: number) => {
      onCoordsChange(lat, lng);
    },
    [onCoordsChange]
  );

  async function handleUseMyLocation() {
    setLocating(true);
    const c = await getReportCoords();
    onCoordsChange(c.lat, c.lng);
    setRecenter({ ...c, zoom: 16 });
    setLocating(false);
  }

  const position: [number, number] = coords
    ? [coords.lat, coords.lng]
    : [BANGKOK_CENTER.lat, BANGKOK_CENTER.lng];

  return (
    <div className="space-y-3">
      <p className="text-[13px] text-slate-600">{labels.hint}</p>
      <div className="overflow-hidden rounded-[12px] border border-slate-100">
        {!ready ? (
          <div className="flex h-[200px] items-center justify-center bg-slate-50 text-[13px] text-slate-600">
            {labels.loading}
          </div>
        ) : (
          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            className="h-[200px] w-full [&_.leaflet-control-attribution]:text-[10px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {recenter && (
              <MapRecenter
                lat={recenter.lat}
                lng={recenter.lng}
                zoom={recenter.zoom}
              />
            )}
            <MapClickPicker onPick={handlePick} />
            {coords && (
              <DraggablePin
                position={[coords.lat, coords.lng]}
                onMove={handlePick}
              />
            )}
          </MapContainer>
        )}
      </div>

      <button
        type="button"
        onClick={handleUseMyLocation}
        disabled={locating}
        className="h-[44px] w-full rounded-[12px] border border-slate-100 bg-white text-[15px] font-semibold text-brand-blue hover:bg-brand-blue-soft disabled:opacity-60 dark:bg-[var(--color-surface)]"
      >
        {labels.useMyLocation}
      </button>

      {coords && (
        <p className="text-[13px] text-slate-600">
          {labels.coords}:{" "}
          <span className="font-semibold text-slate-900">
            {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </span>
        </p>
      )}
    </div>
  );
}
