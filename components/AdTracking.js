// WHAT THIS FILE DOES: Loads the Meta Pixel and the Google Ads tag on
// every PUBLIC page (it lives in app/(site)/layout.js, so the admin panel
// is never tracked). The IDs come from the admin "Ads & Tracking" page —
// if an ID is blank or doesn't look valid, that platform's script is
// simply never loaded. It also:
//   - remembers which ad / link / website brought the visitor here (see
//     lib/adTracking.js), so it can be attached to their enquiry;
//   - reports a page view each time the visitor moves to another page;
//   - reports a "Contact" conversion whenever a WhatsApp, email, or phone
//     link anywhere on the site is tapped — one listener here covers the
//     footer, Contact page, and every other place those links appear.
// The enquiry form reports its own "Lead" conversion (components/EnquiryForm.js).
// Runs in the browser because it reads the page address and listens for clicks.

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { getSiteSettings } from "@/lib/firestore";
import {
  captureAttribution,
  isValidGoogleAdsId,
  isValidMetaPixelId,
  isValidConversionLabel,
  setGoogleAdsConfig,
  trackContact,
  trackPageView,
} from "@/lib/adTracking";

function contactMethodFor(href) {
  if (!href) return null;
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return "WhatsApp";
  if (href.startsWith("mailto:")) return "Email";
  if (href.startsWith("tel:")) return "Phone";
  return null;
}

export default function AdTracking() {
  const pathname = usePathname();
  const [ids, setIds] = useState({ metaPixelId: "", googleAdsId: "" });
  const isFirstPath = useRef(true);

  useEffect(() => {
    captureAttribution();

    getSiteSettings().then((result) => {
      const settings = result.data || {};
      const metaPixelId = isValidMetaPixelId(settings.metaPixelId)
        ? settings.metaPixelId
        : "";
      const googleAdsId = isValidGoogleAdsId(settings.googleAdsId)
        ? settings.googleAdsId
        : "";
      setGoogleAdsConfig({
        id: googleAdsId,
        leadLabel: isValidConversionLabel(settings.googleAdsLeadLabel)
          ? settings.googleAdsLeadLabel
          : "",
        contactLabel: isValidConversionLabel(settings.googleAdsContactLabel)
          ? settings.googleAdsContactLabel
          : "",
      });
      setIds({ metaPixelId, googleAdsId });
    });
  }, []);

  // The first page view is sent by the scripts themselves as they load;
  // this covers every page change after that.
  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  useEffect(() => {
    function handleClick(event) {
      const link = event.target.closest?.("a[href]");
      const method = contactMethodFor(link?.getAttribute("href"));
      if (method) trackContact(method);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {ids.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${ids.metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {ids.googleAdsId && (
        <>
          <Script
            id="google-ads-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${ids.googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;gtag('js',new Date());gtag('config','${ids.googleAdsId}');`}
          </Script>
        </>
      )}
    </>
  );
}
