"use client";

import { useEffect } from "react";

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
] as const;

export default function TrackingParams() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasTracking = TRACKING_KEYS.some((k) => params.has(k));
    if (!hasTracking) return;

    const stored = JSON.parse(sessionStorage.getItem("initialSearchParams") ?? "{}");
    const merged: Record<string, string> = { ...stored };
    for (const key of TRACKING_KEYS) {
      const val = params.get(key);
      if (val) merged[key] = val;
    }
    sessionStorage.setItem("initialSearchParams", JSON.stringify(merged));
  }, []);

  return null;
}
