"use client";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./context/SidebarContext";

export const SIDEBAR_WIDTH_EXPANDED = 188;
export const SIDEBAR_WIDTH_COLLAPSED = 52;

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardOutlinedIcon },
  {
    href: "/dashboard/daily-worksheet",
    label: "Daily Worksheet",
    icon: EventNoteOutlinedIcon,
  },
  { href: "/dashboard/attendance", label: "Attendance", icon: CalendarTodayOutlinedIcon },
  {
    href: "/dashboard/monthly-attendance",
    label: "Monthly",
    icon: CalendarMonthOutlinedIcon,
  },
  { href: "/dashboard/Holiday-Calendar", label: "Holiday Calendar", icon: EventBusyOutlinedIcon },
  { href: "/dashboard/extra-working-days", label: "Extra Days", icon: MoreTimeOutlinedIcon },
  { href: "/dashboard/leave-management", label: "Leaves", icon: BeachAccessOutlinedIcon },
  { href: "/dashboard/leave-balance", label: "Leave Balance", icon: AccountBalanceWalletOutlinedIcon },
  { href: "/dashboard/notifications", label: "Notifications", icon: NotificationsOutlinedIcon },
  { href: "/dashboard/employees", label: "Employees", icon: GroupOutlinedIcon },
  { href: "/dashboard/employee-handbook", label: "Handbook", icon: MenuBookOutlinedIcon },
  { href: "/dashboard/directory", label: "Directory", icon: BadgeOutlinedIcon },
  { href: "/dashboard/payroll", label: "Payroll", icon: PaymentsOutlinedIcon },
];

const bottomNavItems = [
  { href: "/dashboard/settings", label: "Settings", icon: SettingsOutlinedIcon },
  { href: "/login", label: "Logout", icon: LogoutOutlinedIcon },
];

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof DashboardOutlinedIcon;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={`flex items-center rounded-md transition-colors duration-200 ${
        collapsed ? "justify-center px-1.5 py-1.5" : "gap-2 px-2 py-1.5"
      } ${
        active
          ? "border-l-[3px] border-primary-fixed bg-white/10 font-semibold text-primary-fixed"
          : "text-[#b8bbd4] hover:bg-white/10 hover:text-primary-fixed"
      }`}
    >
      <Icon className="shrink-0" sx={{ fontSize: 17 }} />
      {!collapsed && <span className="truncate text-[11px] leading-4 font-medium">{label}</span>}
    </Link>
  );
}

function SidebarHeaderExpanded({
  onToggleCollapse,
}: {
  onToggleCollapse: () => void;
}) {
  return (
    <div className="flex shrink-0 items-start justify-between gap-1 border-b border-white/10 px-2 py-3">
      <div className="min-w-0 flex-1">
        <h2 className="text-[15px] font-semibold leading-tight text-primary-fixed">Enterprise HRMS</h2>
        <p className="mt-0.5 text-[10px] text-[#8b8fa8]">Employee Portal</p>
      </div>
      <button
        type="button"
        onClick={onToggleCollapse}
        aria-label="Collapse sidebar"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#b8bbd4] transition-colors hover:bg-white/10 hover:text-primary-fixed"
      >
        <ChevronLeftOutlinedIcon sx={{ fontSize: 18 }} />
      </button>
    </div>
  );
}

function SidebarHeaderCollapsed({
  onToggleCollapse,
}: {
  onToggleCollapse: () => void;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2 border-b border-white/10 px-1.5 py-3">
      <button
        type="button"
        onClick={onToggleCollapse}
        aria-label="Expand sidebar"
        className="flex h-6 w-6 items-center justify-center rounded-md text-[#b8bbd4] transition-colors hover:bg-white/10 hover:text-primary-fixed"
      >
        <ChevronRightOutlinedIcon sx={{ fontSize: 18 }} />
      </button>
      <div
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-on-primary shadow-sm"
        title="Enterprise HRMS"
      >
        <DomainOutlinedIcon sx={{ fontSize: 16 }} />
      </div>
    </div>
  );
}

function SidebarHeader({
  collapsed,
  onToggleCollapse,
  showCollapseToggle,
}: {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  showCollapseToggle?: boolean;
}) {
  if (!showCollapseToggle || !onToggleCollapse) {
    return (
      <div className="shrink-0 border-b border-white/10 px-2 py-3">
        <h2 className="text-[15px] font-semibold leading-tight text-primary-fixed">Enterprise HRMS</h2>
        <p className="mt-0.5 text-[10px] text-[#8b8fa8]">Employee Portal</p>
      </div>
    );
  }

  if (collapsed) {
    return <SidebarHeaderCollapsed onToggleCollapse={onToggleCollapse} />;
  }

  return <SidebarHeaderExpanded onToggleCollapse={onToggleCollapse} />;
}

function SidebarContent({
  collapsed,
  onNavigate,
  showCollapseToggle,
  onToggleCollapse,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  showCollapseToggle?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <SidebarHeader
        collapsed={collapsed}
        showCollapseToggle={showCollapseToggle}
        onToggleCollapse={onToggleCollapse}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-1.5 py-1.5">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={isActive(item.href)}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <div className="mt-auto shrink-0 flex flex-col gap-0.5 border-t border-white/10 px-1.5 py-2">
        <div className={`mb-0.5 ${collapsed ? "flex justify-center" : ""}`}>
          <button
            type="button"
            title="Help Center"
            className={`flex items-center justify-center rounded-md border border-white/20 text-[11px] font-medium text-primary-fixed transition-colors hover:bg-white/10 ${
              collapsed ? "h-8 w-8" : "w-full gap-1.5 py-1.5"
            }`}
          >
            <HelpOutlineOutlinedIcon sx={{ fontSize: 16 }} />
            {!collapsed && <span>Help Center</span>}
          </button>
        </div>

        {bottomNavItems.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={isActive(item.href)}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

const sidebarBaseClass =
  "dashboard-sidebar dashboard-sidebar-compact fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-white/10 shadow-md transition-[width] duration-300 ease-in-out";

export default function Sidebar() {
  const { collapsed, toggle, mobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeMobile}
        />
      )}

      <nav
        className={`${sidebarBaseClass} z-[60] md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: SIDEBAR_WIDTH_EXPANDED }}
      >
        <div className="flex shrink-0 justify-end px-2 pt-2">
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close sidebar"
            className="rounded-md p-1.5 text-[#b8bbd4] hover:bg-white/10 hover:text-primary-fixed"
          >
            <CloseOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
        <SidebarContent collapsed={false} onNavigate={closeMobile} />
      </nav>

      <nav
        className={`${sidebarBaseClass} hidden md:flex`}
        style={{
          width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        }}
      >
        <SidebarContent
          collapsed={collapsed}
          showCollapseToggle
          onToggleCollapse={toggle}
        />
      </nav>
    </>
  );
}
