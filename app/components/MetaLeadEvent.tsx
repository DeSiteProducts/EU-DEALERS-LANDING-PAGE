"use client";

import { useEffect } from "react";
import { META_PIXEL_ID, readLeadHandoff, markLeadFired, whenPixelReady } from "../lib/metaPixel";

const fired = new Set<string>();

export function MetaLeadEvent() {
  useEffect(() => {
    let cancelled = false;
    if (!META_PIXEL_ID) return;
    void whenPixelReady().then((ready) => {
      if (!ready || cancelled) return;
      const lead = readLeadHandoff();
      if (!lead?.eventId || lead.firedAt || fired.has(lead.eventId)) return;
      fired.add(lead.eventId);
      markLeadFired(lead);
      window.fbq?.("init", META_PIXEL_ID, lead.userData ?? {});
      window.fbq?.("track", "Lead", lead.customData ?? { quote_currency: "EUR" }, { eventID: lead.eventId });
    });
    return () => { cancelled = true; };
  }, []);
  return null;
}
