"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Modal } from "@/components/admin/shared/Modal";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Field, inputClass, textareaClass } from "@/components/admin/shared/Field";
import {
  createAwardAction,
  updateAwardAction,
  deleteAwardAction,
  moveAwardAction,
} from "@/lib/actions/awards";
import type { Award } from "@/generated/prisma/client";

function AwardForm({
  award,
  onClose,
  onSaved,
}: {
  award?: Award;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [year, setYear] = useState(award?.year ?? "");
  const [title, setTitle] = useState(award?.title ?? "");
  const [description, setDescription] = useState(award?.description ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const input = { year, title, description };
    const result = award
      ? await updateAwardAction(award.id, input)
      : await createAwardAction(input);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success(award ? "Award updated." : "Award added.");
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Year">
        <input className={inputClass} value={year} onChange={(e) => setYear(e.target.value)} required />
      </Field>
      <Field label="Title">
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Field>
      <Field label="Description">
        <textarea
          className={textareaClass}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
          {submitting ? "Saving..." : award ? "Save Changes" : "Add Award"}
        </button>
      </div>
    </form>
  );
}

export function AwardsManager({ awards }: { awards: Award[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Award | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Award | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  function handleSaved() {
    setFormOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteAwardAction(deleteTarget.id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Award deleted.");
    setDeleteTarget(null);
    router.refresh();
  }

  async function move(id: string, direction: "up" | "down") {
    setMovingId(id);
    const result = await moveAwardAction(id, direction);
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
        <h2 className="font-display text-lg text-charcoal">Awards</h2>
        <button
          type="button"
          onClick={() => {
            setEditing(undefined);
            setFormOpen(true);
          }}
          className="min-h-[40px] rounded-sm bg-charcoal px-4 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold"
        >
          Add Award
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {awards.map((award, index) => (
          <div key={award.id} className="rounded-sm border border-charcoal/10 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gold">{award.year}</p>
                <p className="mt-1 font-display text-base text-charcoal">{award.title}</p>
                <p className="mt-1 text-sm text-charcoal/60">{award.description}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  onClick={() => move(award.id, "up")}
                  disabled={index === 0 || movingId === award.id}
                  aria-label="Move up"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-charcoal/15 text-charcoal/60 disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(award.id, "down")}
                  disabled={index === awards.length - 1 || movingId === award.id}
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
                  setEditing(award);
                  setFormOpen(true);
                }}
                className="min-h-[40px] flex-1 rounded-sm border border-charcoal/20 text-xs uppercase tracking-wide text-charcoal/70 sm:flex-none sm:px-4"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(award)}
                className="min-h-[40px] flex-1 rounded-sm border border-red-200 text-xs uppercase tracking-wide text-red-600 sm:flex-none sm:px-4"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {awards.length === 0 && (
          <p className="rounded-sm border border-dashed border-charcoal/20 p-6 text-center text-sm text-charcoal/50">
            No awards yet.
          </p>
        )}
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Award" : "Add Award"}>
        <AwardForm
          key={editing?.id ?? "new"}
          award={editing}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Award"
        description={`Are you sure you want to delete "${deleteTarget?.title}"?`}
      />
    </div>
  );
}
