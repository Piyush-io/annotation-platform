import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Command, Bell } from "lucide-react";

export default function App() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("overview");

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-ink p-0 lg:p-3">
      <div className="flex h-full w-full overflow-hidden rounded-none bg-ink lg:rounded-[28px] lg:shadow-2xl lg:shadow-black/40">
        <Sidebar
          open={open}
          active={active}
          onSelect={setActive}
          onToggle={() => setOpen((v) => !v)}
        />

        {/* Main surface */}
        <main className="relative m-0 flex-1 overflow-hidden bg-canvas lg:my-1.5 lg:mr-1.5 lg:rounded-[22px]">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/[0.05] bg-canvas/80 px-6 py-3.5 backdrop-blur lg:px-9">
            <div className="flex items-center gap-2 text-[13px] text-ink/45">
              <span className="font-medium text-ink/70">Flowsy</span>
              <span>/</span>
              <span className="font-medium capitalize text-ink">
                {active === "runs" ? "Runs & Logs" : active}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-2 rounded-full border border-black/8 bg-white px-3 py-1.5 text-[12.5px] text-ink/45 shadow-sm transition hover:text-ink">
                <Command size={13} /> Search
                <kbd className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-ink/50">
                  ⌘K
                </kbd>
              </button>
              <button className="relative grid h-9 w-9 place-items-center rounded-full border border-black/8 bg-white text-ink/60 shadow-sm transition hover:text-ink">
                <Bell size={16} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-flame ring-2 ring-white" />
              </button>
            </div>
          </header>

          {/* Scroll region */}
          <div className="scroll-slim h-[calc(100%-57px)] overflow-y-auto">
            {active === "overview" || active === "analytics" ? (
              <Dashboard />
            ) : (
              <Placeholder name={active} />
            )}
          </div>

          {/* Floating actions */}
          <button className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-white shadow-xl shadow-black/25 transition hover:scale-[1.03]">
            Actions
            <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold">
              /
            </kbd>
          </button>
        </main>
      </div>
    </div>
  );
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="animate-fade-up grid h-full place-items-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cream ring-1 ring-black/5">
          <span className="font-display text-2xl">✦</span>
        </div>
        <h2 className="font-display text-xl font-semibold capitalize text-ink">
          {name === "runs" ? "Runs & Logs" : name}
        </h2>
        <p className="mt-1 text-[13.5px] text-ink/45">
          This view is part of the demo shell. Open Overview to explore the
          dashboard.
        </p>
      </div>
    </div>
  );
}
