"use client";

import { useState } from "react";

// §3.3: 연간 요금제를 실제로 운영할 때만 노출한다.
// lib/pricing.ts의 ANNUAL_BILLING_OFFERED가 true가 되기 전까지는
// 어디에서도 렌더되지 않는다 (연간 할인율 {{X}}%도 그때 채운다).
export default function BillingToggle({
  onChange,
}: {
  onChange?: (period: "monthly" | "annual") => void;
}) {
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");

  const select = (p: "monthly" | "annual") => {
    setPeriod(p);
    onChange?.(p);
  };

  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg)] p-1"
    >
      {(["monthly", "annual"] as const).map((p) => (
        <button
          key={p}
          type="button"
          aria-pressed={period === p}
          onClick={() => select(p)}
          className={`rounded px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
            period === p
              ? "bg-[var(--btn)] text-white"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          {p === "monthly" ? (
            "Monthly"
          ) : (
            <>
              Annual{" "}
              <span className="font-mono text-[0.6875rem] text-[var(--ok)]">
                Save {"{{X}}"}%
              </span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
