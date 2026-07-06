import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";
import { logout } from "@/lib/auth-actions";

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
    <div className="min-h-screen bg-cream/40">
      <header className="flex items-center justify-between border-b border-charcoal/10 bg-charcoal px-6 py-4 text-ivory md:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Aqsa Arts
          </p>
          <p className="font-display text-lg">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-ivory/70">
            Signed in as {session.username}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-sm border border-ivory/30 px-3 py-1.5 text-xs uppercase tracking-wide transition hover:bg-ivory hover:text-charcoal"
            >
              Log Out
            </button>
          </form>
        </div>
      </header>
      <main className="px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
