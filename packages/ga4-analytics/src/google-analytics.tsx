"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export interface GoogleAnalyticsProps {
  measurementId: string;
}

function RoutePageView({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    window.gtag?.("event", "page_view", {
      page_path: `${pathname}${window.location.search}`,
      page_location: window.location.href,
      page_title: document.title,
      send_to: measurementId,
    });
  }, [measurementId, pathname]);

  return null;
}

/** Loads gtag and records initial and client-side Next.js page views. */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-bootstrap" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config','${measurementId}',{anonymize_ip:true});`}
      </Script>
      <RoutePageView measurementId={measurementId} />
    </>
  );
}

export function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, parameters);
}
