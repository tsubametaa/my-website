"use client";

import { useEffect, type ReactNode } from "react";
import {
  useScriptProtection,
  useDOMProtection,
  useClipboardProtection,
} from "@/app/hooks/useSecurity";

interface SecurityProviderProps {
  children: ReactNode;
  enableScriptProtection?: boolean;
  enableDOMProtection?: boolean;
  enableClipboardProtection?: boolean;
}

export function SecurityProvider({
  children,
  enableScriptProtection = true,
  enableDOMProtection = true,
  enableClipboardProtection = true,
}: SecurityProviderProps) {
  if (enableScriptProtection) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScriptProtection();
  }
  if (enableDOMProtection) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDOMProtection();
  }
  if (enableClipboardProtection) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useClipboardProtection();
  }

  useEffect(() => {
    const preventContextMenu = (_e: MouseEvent) => {
      if (process.env.NODE_ENV === "production") {
      }
    };

    const preventSelection = (_e: Event) => {};

    const preventDrag = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("selectstart", preventSelection);
    document.addEventListener("dragstart", preventDrag);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("selectstart", preventSelection);
      document.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[SECURITY] Security Provider initialized");
      console.log("[SECURITY] Protections enabled:", {
        script: enableScriptProtection,
        dom: enableDOMProtection,
        clipboard: enableClipboardProtection,
      });
    }
  }, [enableScriptProtection, enableDOMProtection, enableClipboardProtection]);

  return <>{children}</>;
}

export default SecurityProvider;
