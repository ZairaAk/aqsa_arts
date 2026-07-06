"use client";

import { useState } from "react";
import { Modal } from "@/components/admin/shared/Modal";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description: string;
  confirmLabel?: string;
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    setPending(true);
    try {
      await onConfirm();
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm leading-relaxed text-charcoal/70">{description}</p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          className="min-h-[44px] rounded-sm border border-charcoal/20 px-4 py-2.5 text-sm uppercase tracking-wide text-charcoal/70 transition-colors hover:bg-charcoal/5 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending}
          className="min-h-[44px] rounded-sm bg-red-600 px-4 py-2.5 text-sm uppercase tracking-wide text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {pending ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
