// src/hooks/useSaveHash.ts
import { useEffect } from "react";

export default function useSaveHash() {
  useEffect(() => {
    const save = () => {
      try {
        const hash = window.location.hash || "";
        sessionStorage.setItem("lastHash", JSON.stringify({ hash, ts: Date.now() }));
      } catch (e) {
        // ignore
      }
    };

    // initial save
    save();

    window.addEventListener("hashchange", save);
    window.addEventListener("beforeunload", save);
    // sometimes anchor clicks change intended hash without triggering hashchange immediately
    document.addEventListener("click", save, true);

    return () => {
      window.removeEventListener("hashchange", save);
      window.removeEventListener("beforeunload", save);
      document.removeEventListener("click", save, true);
    };
  }, []);
}
