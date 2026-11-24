"use client";

import { useEffect, useState } from "react";

// visitor counter connected to Neon PostgreSQL
export function VisitorCounter({ site = "stick-it-up" }: { site?: string }) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let unmounted = false;

    async function recordAndFetch() {
      try {
        // Record visit and get authoritative server count
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ site }),
        });

        if (!res.ok) throw new Error("Visitor API response not ok");
        const data = await res.json();
        const target = Number(data.unique_visitors ?? data.total_visits ?? 0);

        if (unmounted) return;
        try {
          localStorage.setItem(`siu_visitors_${site}`, String(target));
        } catch {}

        // Smooth roll-up animation starting dynamically from 0
        const startCount = 0;
        const startTime = performance.now();
        const duration = Math.min(1000, Math.max(450, target * 120));

        const tick = (now: number) => {
          if (unmounted) return;
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const val = Math.round(startCount + (target - startCount) * ease);
          setCount(val);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      } catch (err) {
        console.warn("Could not connect to live visitor DB, using local fallback", err);
        if (!unmounted) {
          setCount((prev) => prev ?? 0);
        }
      }
    }

    recordAndFetch();

    return () => {
      unmounted = true;
    };
  }, [site]);

  return (
    <div
      title="Live verified unique visitors (Neon PostgreSQL)"
      className="inline-flex shrink-0 select-none items-center gap-1.5 rounded-[10px_7px_11px_7px/7px_11px_7px_10px] border-2 border-ink/25 bg-paper-card px-2 py-1.5 text-sm text-ink-soft transition-colors hover:border-ink/45 sm:px-2.5 sm:py-2"
    >
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-mono font-semibold text-ink">
        {count.toLocaleString()}
      </span>
      <span className="hidden font-hand text-[13px] text-ink-muted sm:inline">visitors</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   GitHub star button — link only, no star counts
------------------------------------------------------------------- */
export function GitHubStarButton() {
  return (
    <a
      href="https://github.com/Sam721166/stick-it-up"
      target="_blank"
      rel="noreferrer"
      aria-label="View stick-it-up on GitHub"
      className="group inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-[10px_7px_11px_7px/7px_11px_7px_10px]
        border-2 border-ink bg-ink px-2.5 sm:px-3 py-1.5 text-sm font-medium text-paper-card
        shadow-[2px_2px_0_rgba(36,36,42,0.22)]
        transition-all duration-150
        hover:bg-[#101015]
        active:scale-95"
    >
      {/* GitHub Octocat Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>

      <span className="flex items-center gap-1 font-medium">
        GitHub
      </span>
    </a>
  );
}
