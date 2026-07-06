"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";

type ImageUploaderProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  label?: string;
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024;

export function ImageUploader({ value, onChange, max = 10, label = "Images" }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const remaining = max - value.length;
    if (remaining <= 0) {
      toast.error(`You can only add up to ${max} image${max === 1 ? "" : "s"}.`);
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    const invalid = selected.find(
      (file) => !ALLOWED_TYPES.includes(file.type) || file.size > MAX_SIZE_BYTES
    );
    if (invalid) {
      toast.error("Only JPEG, PNG, WEBP or AVIF images up to 8MB are allowed.");
      return;
    }

    setUploading(true);
    try {
      const uploaded = await Promise.all(
        selected.map((file) =>
          upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/admin/upload",
          })
        )
      );
      onChange([...value, ...uploaded.map((blob) => blob.url)]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function setCover(index: number) {
    if (index === 0) return;
    const next = [...value];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-charcoal/50">{label}</span>
        <span className="text-xs text-charcoal/40">
          {value.length}/{max}
        </span>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-sm border border-charcoal/10 bg-cream"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-1 top-1 rounded-sm bg-charcoal/80 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-ivory">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 flex items-end justify-between gap-1 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent p-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => setCover(index)}
                    className="rounded-sm bg-ivory/90 px-1.5 py-1 text-[10px] uppercase tracking-wide text-charcoal hover:bg-ivory"
                  >
                    Set cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  aria-label="Remove image"
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-ivory/90 text-charcoal hover:bg-ivory"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length < max && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-sm border border-dashed border-charcoal/25 px-4 py-3 text-sm text-charcoal/60 transition-colors hover:border-gold hover:text-charcoal disabled:opacity-60"
        >
          {uploading ? "Uploading..." : `Add ${max > 1 ? "images" : "image"}`}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={max > 1}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </div>
  );
}
