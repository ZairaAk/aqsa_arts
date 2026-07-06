import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { verifySession } from "@/lib/auth/session";
import { logout } from "@/lib/auth/actions";
import { AdminNav } from "@/components/admin/shared/AdminNav";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream/40">
      <Toaster position="top-right" richColors />
      <header className="flex items-center justify-between border-b border-charcoal/10 bg-charcoal px-4 py-4 text-ivory sm:px-6 md:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Aqsa Arts
          </p>
          <p className="font-display text-lg">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden text-sm text-ivory/70 sm:inline">
            Signed in as {session.username}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="min-h-[40px] rounded-sm border border-ivory/30 px-3 text-xs uppercase tracking-wide transition hover:bg-ivory hover:text-charcoal"
            >
              Log Out
            </button>
          </form>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <AdminNav />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}
