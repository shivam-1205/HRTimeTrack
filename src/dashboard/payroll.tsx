import DashboardPageShell from "../components/dashboard/DashboardPageShell";

export default function PayrollPage() {
  return (
    <DashboardPageShell>
      <div>
        <h1 className="text-h1 font-semibold text-on-surface">Payroll</h1>
        <p className="text-body-lg text-on-surface-variant">
          View payslips, salary breakdowns, and payment history.
        </p>
      </div>

      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-xl shadow-sm">
        <p className="text-body-md text-on-surface-variant">
          Payroll content will be added here.
        </p>
      </div>
    </DashboardPageShell>
  );
}
