"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Modal } from "@/components/admin/shared/Modal";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Field, inputClass, selectClass } from "@/components/admin/shared/Field";
import {
  createMediaFeatureAction,
  updateMediaFeatureAction,
  deleteMediaFeatureAction,
  moveMediaFeatureAction,
} from "@/lib/actions/media";
import type { MediaFeature } from "@/generated/prisma/client";

const TYPE_OPTIONS = [
  { value: "INTERVIEW", label: "Interview" },
  { value: "ARTICLE", label: "Article" },
  { value: "VIDEO", label: "Video" },
] as const;

function MediaForm({
  feature,
  onClose,
  onSaved,
}: {
  feature?: MediaFeature;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(feature?.title ?? "");
  const [outlet, setOutlet] = useState(feature?.outlet ?? "");
  const [year, setYear] = useState(feature?.year ?? "");
  const [type, setType] = useState<(typeof TYPE_OPTIONS)[number]["value"]>(feature?.type ?? "ARTICLE");
  const [url, setUrl] = useState(feature?.url ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const input = { title, outlet, year, type, url };
    const result = feature
      ? await updateMediaFeatureAction(feature.id, input)
      : await createMediaFeatureAction(input);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success(feature ? "Media feature updated." : "Media feature added.");
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Title">
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Outlet">
          <input className={inputClass} value={outlet} onChange={(e) => setOutlet(e.target.value)} required />
        </Field>
        <Field label="Year">
          <input className={inputClass} value={year} onChange={(e) => setYear(e.target.value)} required />
        </Field>
      </div>
      <Field label="Type">
        <select
          className={selectClass}
          value={type}
          onChange={(e) => setType(e.target.value as (typeof TYPE_OPTIONS)[number]["value"])}
        >
          {TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Link" hint="Optional URL to the full interview/article/video.">
        <input
          className={inputClass}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://"
        />
      </Field>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="min-h-[44px] rounded-sm border border-charcoal/20 px-5 py-2.5 text-sm uppercase tracking-wide text-charcoal/70 hover:bg-charcoal/5 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="min-h-[44px] rounded-sm bg-charcoal px-5 py-2.5 text-sm uppercase tracking-wide text-ivory hover:bg-gold disabled:opacity-60"
        >
          {submitting ? "Saving..." : feature ? "Save Changes" : "Add Feature"}
        </button>
      </div>
    </form>
  );
}

export function MediaManager({ features }: { features: MediaFeature[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MediaFeature | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<MediaFeature | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  function handleSaved() {
    setFormOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteMediaFeatureAction(deleteTarget.id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Media feature deleted.");
    setDeleteTarget(null);
    router.refresh();
  }

  async function move(id: string, direction: "up" | "down") {
    setMovingId(id);
    const result = await moveMediaFeatureAction(id, direction);
    setMovingId(null);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-charcoal">Interviews & Media</h2>
        <button
          type="button"
          onClick={() => {
            setEditing(undefined);
            setFormOpen(true);
          }}
          className="min-h-[40px] rounded-sm bg-charcoal px-4 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold"
        >
          Add Feature
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {features.map((feature, index) => (
          <div key={feature.id} className="rounded-sm border border-charcoal/10 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gold">{feature.type}</p>
                <p className="mt-1 font-display text-base text-charcoal">{feature.title}</p>
                <p className="mt-1 text-sm text-charcoal/60">
                  {feature.outlet} &middot; {feature.year}
                </p>
                {feature.url && (
                  <a
                    href={feature.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-walnut underline"
                  >
                    {feature.url}
                  </a>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  onClick={() => move(feature.id, "up")}
                  disabled={index === 0 || movingId === feature.id}
                  aria-label="Move up"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-charcoal/15 text-charcoal/60 disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(feature.id, "down")}
                  disabled={index === features.length - 1 || movingId === feature.id}
                  aria-label="Move down"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-charcoal/15 text-charcoal/60 disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditing(feature);
                  setFormOpen(true);
                }}
                className="min-h-[40px] flex-1 rounded-sm border border-charcoal/20 text-xs uppercase tracking-wide text-charcoal/70 sm:flex-none sm:px-4"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(feature)}
                className="min-h-[40px] flex-1 rounded-sm border border-red-200 text-xs uppercase tracking-wide text-red-600 sm:flex-none sm:px-4"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {features.length === 0 && (
          <p className="rounded-sm border border-dashed border-charcoal/20 p-6 text-center text-sm text-charcoal/50">
            No media features yet.
          </p>
        )}
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit Media Feature" : "Add Media Feature"}
      >
        <MediaForm
          key={editing?.id ?? "new"}
          feature={editing}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Media Feature"
        description={`Are you sure you want to delete "${deleteTarget?.title}"?`}
      />
    </div>
  );
}
