"use client";

import { ICON_LIBRARY } from "@/lib/constants/icons";

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (path: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ICON_LIBRARY.map((icon) => (
        <button
          key={icon.name}
          type="button"
          onClick={() => onChange(icon.path)}
          title={icon.name}
          aria-pressed={value === icon.path}
          className={`flex h-11 w-11 items-center justify-center rounded-sm border transition-colors ${
            value === icon.path
              ? "border-gold bg-gold/10 text-walnut"
              : "border-charcoal/15 text-charcoal/50 hover:border-charcoal/30"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d={icon.path} />
          </svg>
        </button>
      ))}
    </div>
  );
}
