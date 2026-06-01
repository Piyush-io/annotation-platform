import {
  LayoutGrid,
  Workflow,
  LayoutTemplate,
  ScrollText,
  ChartNoAxesColumn,
  Bell,
  UserPlus,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { notifications } from "../data";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const primaryNav: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "runs", label: "Runs & Logs", icon: ScrollText },
  { id: "analytics", label: "Analytics", icon: ChartNoAxesColumn },
];

const toneStyles: Record<string, string> = {
  flame: "bg-flame",
  amber: "bg-amber-500",
  green: "bg-emerald-500",
};

export function Sidebar({
  open,
  active,
  onSelect,
  onToggle,
}: {
  open: boolean;
  active: string;
  onSelect: (id: string) => void;
  onToggle: () => void;
}) {
  return (
    <aside
      className={`relative z-20 flex shrink-0 flex-col bg-ink text-white/90 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "w-[264px]" : "w-[76px]"
      }`}
    >
      {/* Brand + collapse */}
      <div className="flex items-center gap-3 px-4 pb-2 pt-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-flame to-orange-400 shadow-lg shadow-black/30">
          <span className="text-[15px] font-bold text-white">✦</span>
        </div>
        <div
          className={`min-w-0 flex-1 overflow-hidden transition-all duration-200 ${
            open ? "opacity-100" : "w-0 opacity-0"
          }`}
        >
          <p className="truncate font-display text-[15px] font-semibold leading-tight text-white">
            Flowsy
          </p>
          <p className="truncate text-[11px] text-white/40">Annotation Ops</p>
        </div>
        <button
          onClick={onToggle}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white/45 transition hover:bg-white/10 hover:text-white ${
            open ? "" : "absolute right-1/2 top-[68px] translate-x-1/2"
          }`}
          aria-label="Toggle sidebar"
        >
          {open ? (
            <PanelLeftClose size={18} />
          ) : (
            <PanelLeftOpen size={18} />
          )}
        </button>
      </div>

      <div className={`px-3 ${open ? "mt-4" : "mt-12"}`}>
        <p
          className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 transition-all ${
            open ? "opacity-100" : "h-0 overflow-hidden opacity-0"
          }`}
        >
          Workspace
        </p>
        <nav className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              open={open}
              active={active === item.id}
              onClick={() => onSelect(item.id)}
            />
          ))}
        </nav>
      </div>

      {/* Notifications panel — shown when expanded */}
      <div
        className={`mx-3 mt-5 overflow-hidden transition-all duration-300 ${
          open ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl bg-white/[0.04] p-2.5 ring-1 ring-white/5">
          <div className="mb-1.5 flex items-center justify-between px-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Alerts
            </span>
            <span className="rounded-full bg-flame px-1.5 py-0.5 text-[10px] font-bold text-white">
              3
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-xl bg-white/[0.03] px-3 py-2 transition hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${toneStyles[n.tone]}`}
                  />
                  <p className="truncate text-[12.5px] font-medium text-white/90">
                    {n.title}
                  </p>
                </div>
                <p className="mt-0.5 truncate pl-3.5 text-[11px] text-white/40">
                  {n.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* Secondary nav */}
      <div className="px-3 pb-2">
        <nav className="flex flex-col gap-1">
          <NavButton
            item={{ id: "notifications", label: "Notifications", icon: Bell, badge: "3" }}
            open={open}
            active={active === "notifications"}
            onClick={() => onSelect("notifications")}
          />
          <NavButton
            item={{ id: "invite", label: "Invite teammates", icon: UserPlus }}
            open={open}
            active={false}
            onClick={() => onSelect("invite")}
          />
          <NavButton
            item={{ id: "settings", label: "Settings", icon: Settings }}
            open={open}
            active={active === "settings"}
            onClick={() => onSelect("settings")}
          />
        </nav>
      </div>

      {/* User */}
      <div className="mx-3 mb-3 mt-1 border-t border-white/10 pt-3">
        <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-white/5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-forest text-[13px] font-semibold text-white ring-2 ring-white/10">
            AA
          </div>
          <div
            className={`min-w-0 flex-1 overflow-hidden transition-all duration-200 ${
              open ? "opacity-100" : "w-0 opacity-0"
            }`}
          >
            <p className="truncate text-[13px] font-medium text-white">
              Alex A.
            </p>
            <p className="truncate text-[11px] text-white/40">
              alex@flowsy.io
            </p>
          </div>
          <button
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white ${
              open ? "" : "hidden"
            }`}
            aria-label="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavButton({
  item,
  open,
  active,
  onClick,
}: {
  item: NavItem;
  open: boolean;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      title={!open ? item.label : undefined}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
        active
          ? "bg-white text-ink shadow-sm"
          : "text-white/55 hover:bg-white/[0.07] hover:text-white"
      } ${open ? "" : "justify-center"}`}
    >
      <Icon size={18} className="shrink-0" strokeWidth={active ? 2.4 : 2} />
      <span
        className={`flex-1 truncate text-left transition-all duration-200 ${
          open ? "opacity-100" : "hidden w-0 opacity-0"
        }`}
      >
        {item.label}
      </span>
      {item.badge && open && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
            active ? "bg-flame text-white" : "bg-flame text-white"
          }`}
        >
          {item.badge}
        </span>
      )}
      {item.badge && !open && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-flame ring-2 ring-ink" />
      )}
    </button>
  );
}
