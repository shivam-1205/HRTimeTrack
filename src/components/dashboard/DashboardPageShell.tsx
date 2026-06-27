export default function DashboardPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
      <div className="mx-auto min-w-0 max-w-[1440px] space-y-8">{children}</div>
    </main>
  );
}
