// src/components/ClientBodyAttributes.tsx
"use client";

import { useEffect } from "react";

/**
 * Client-only component that:
 * - removes extension-injected attributes that break hydration (e.g. Grammarly)
 * - applies any client-only dataset or class safely after hydration
 *
 * Add any other client-only DOM mutations here (analytics, theme toggle that depends on localStorage, etc.)
 */
export default function ClientBodyAttributes() {
  useEffect(() => {
    try {
      // Remove well-known extension attributes that often show up in diffs
      // (these were seen in your trace: data-new-gr-c-s-check-loaded, data-gr-ext-installed)
      document.body.removeAttribute("data-new-gr-c-s-check-loaded");
      document.body.removeAttribute("data-gr-ext-installed");

      // Example: if you want to mark hydration done or add a client-only class
      document.body.dataset.clientHydrated = "1";

      // If you need to add a class depending on localStorage or other browser-only values:
      // const theme = localStorage.getItem("theme");
      // if (theme === "dark") document.body.classList.add("dark");
    } catch (e) {
      // swallow errors — don't crash render
      // optionally log to console for debugging in dev
      // console.warn("ClientBodyAttributes error", e);
    }
  }, []);

  // This component intentionally renders nothing to the DOM tree.
  return null;
}
