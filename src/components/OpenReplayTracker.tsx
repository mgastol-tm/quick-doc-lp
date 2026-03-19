"use client";

import { useEffect } from "react";

const PROJECT_KEY = "8jaoxbd4jjp2kh0BbByA";
const INGEST_POINT = "https://openreplay.telemedi.com/ingest";

type TrackerType = import("@openreplay/tracker").default;

let tracker: TrackerType | null = null;
let trackerPromise: Promise<TrackerType | null> | null = null;

async function initTracker(): Promise<TrackerType | null> {
  if (typeof window === "undefined") return null;
  if (tracker) return tracker;

  const { default: Tracker } = await import("@openreplay/tracker");

  tracker = new Tracker({
    projectKey: PROJECT_KEY,
    ingestPoint: INGEST_POINT,
    respectDoNotTrack: true,
    capturePerformance: true,
  });

  return tracker;
}

export default function OpenReplayTracker() {
  useEffect(() => {
    if (!trackerPromise) {
      trackerPromise = initTracker();
    }

    trackerPromise.then((t) => {
      if (t) t.start().catch(console.error);
    });
  }, []);

  return null;
}
