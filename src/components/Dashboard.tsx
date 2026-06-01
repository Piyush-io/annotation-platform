import { useState } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  CircleCheck,
  CircleX,
  LoaderCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { AreaChart, Sparkline, ProgressBar } from "./Charts";
import {
  slaSeries,
  latencySeries,
  lagSeries,
  liveFeed,
  mostErrored,
  timeRanges,
  type RunStatus,
} from "../data";

export function Dashboard() {
  const [range, setRange] = useState("1H");
  const [feedTab, setFeedTab] = useState<"live" | "upcoming">("live");

  return (
    <div className="animate-fade-up mx-auto max-w-[1200px] px-6 pb-24 pt-6 lg:px-9">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[26px] font-semibold tracking-tight text-ink">
            Overview
          </h1>
          <p className="mt-0.5 text-[13.5px] text-ink/45">
            Real-time health across all annotation workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 rounded-full bg-black/[0.04] p-1">
            {timeRanges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium transition ${
                  range === r
                    ? "bg-ink text-white shadow-sm"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-full border border-black/8 bg-white px-3.5 py-2 text-[12.5px] font-medium text-ink shadow-sm transition hover:bg-black/[0.02]">
            Analytics <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Hero row: big SLA + sparkline area */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
        <HeroMetric />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SmallMetric
            label="Avg latency"
            value="1.8s"
            data={latencySeries}
            trend={-6.2}
            footer={[
              ["P99", "3.6s"],
              ["P95", "0.4s"],
            ]}
            tag="1H"
          />
          <SmallMetric
            label="Average lag"
            value="38s"
            data={lagSeries}
            trend={-12.4}
            footer={[
              ["P99", "67s"],
              ["P95", "48s"],
            ]}
            tag="5M"
            stroke="#c2772f"
          />
        </div>
      </div>

      {/* Second row */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatCard
          label="Total workflows"
          value="15"
          footer={
            <div className="space-y-2">
              <div className="flex justify-between text-[12.5px]">
                <span className="text-ink/45">
                  <b className="font-semibold text-ink">12</b> active
                </span>
                <span className="text-ink/45">
                  <b className="font-semibold text-ink">3</b> paused
                </span>
              </div>
              <ProgressBar
                segments={[
                  { value: 12, color: "var(--color-forest)" },
                  { value: 3, color: "#d9d3ca" },
                ]}
              />
            </div>
          }
        />
        <StatCard
          label="Workflow success"
          value="98.7%"
          accent="text-forest"
          footer={
            <div className="space-y-2">
              <div className="flex justify-between text-[12.5px]">
                <span className="text-ink/45">
                  <b className="font-semibold text-ink">1,444</b> success
                </span>
                <span className="text-ink/45">
                  <b className="font-semibold text-flame">18</b> errors
                </span>
              </div>
              <ProgressBar
                segments={[
                  { value: 1444, color: "var(--color-forest)" },
                  { value: 18, color: "var(--color-flame)" },
                ]}
              />
            </div>
          }
        />
        <MostErrored />
      </div>

      {/* Live feed table */}
      <div className="mt-4 rounded-3xl bg-cream p-1.5 ring-1 ring-black/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-2 pt-3">
          <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-black/[0.04]">
            <button
              onClick={() => setFeedTab("live")}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                feedTab === "live" ? "bg-ink text-white" : "text-ink/55"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-flame" />
              </span>
              Live feed
            </button>
            <button
              onClick={() => setFeedTab("upcoming")}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                feedTab === "upcoming" ? "bg-ink text-white" : "text-ink/55"
              }`}
            >
              Upcoming schedule
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] text-ink/40 ring-1 ring-black/[0.05] sm:flex">
              <Search size={14} />
              <span>Search runs…</span>
            </div>
            <button className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink/70 ring-1 ring-black/[0.05] transition hover:text-ink">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink shadow-sm ring-1 ring-black/[0.05]">
              Runs & Logs <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-ink/35">
                <th className="px-5 py-3 font-semibold">Started</th>
                <th className="px-5 py-3 font-semibold">Workflow</th>
                <th className="px-5 py-3 font-semibold">Duration</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Error</th>
                <th className="px-5 py-3 text-right font-semibold">Retries</th>
                <th className="w-10 px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {liveFeed.map((row) => (
                <tr
                  key={row.id}
                  className="group border-t border-black/[0.04] text-[13px] transition hover:bg-cream-2/60"
                >
                  <td className="px-5 py-3.5 text-ink/55">{row.started}</td>
                  <td className="px-5 py-3.5 font-medium text-ink">
                    {row.workflow}
                  </td>
                  <td className="px-5 py-3.5 tabular-nums text-ink/70">
                    {row.duration}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={
                        row.status === "failed"
                          ? "text-ink/70"
                          : "text-ink/35"
                      }
                    >
                      {row.error}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-ink/55">
                    {row.retries}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {row.status === "failed" ? (
                      <button className="inline-flex items-center gap-1 rounded-full bg-flame/10 px-2.5 py-1 text-[11.5px] font-semibold text-flame opacity-0 transition group-hover:opacity-100">
                        <RotateCcw size={12} /> Re-run
                      </button>
                    ) : (
                      <ArrowUpRight
                        size={15}
                        className="ml-auto text-ink/25 opacity-0 transition group-hover:opacity-100"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Pieces ---------- */

function HeroMetric() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-cream p-2 ring-1 ring-black/[0.03]">
      <div className="flex flex-col gap-2">
        <div className="relative overflow-hidden rounded-[20px] bg-forest p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-wider text-white/55">
                % Within SLA
              </p>
              <div className="mt-1 flex items-end gap-1">
                <span className="font-display text-[64px] font-semibold leading-none tracking-tight">
                  96
                </span>
                <span className="mb-2 text-[26px] font-medium text-white/70">
                  %
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white">
              <TrendingUp size={12} /> 2.4%
            </span>
          </div>
          <div className="mt-3 flex gap-6 text-[12px] text-white/70">
            <span>
              Latency <b className="font-semibold text-white">91% &lt; 2s</b>
            </span>
            <span>
              Freshness <b className="font-semibold text-white">93% &lt; 5m</b>
            </span>
          </div>
          <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-leaf/10 blur-2xl" />
        </div>

        <div className="h-[120px] overflow-hidden rounded-[20px] bg-leaf-soft px-1 pt-3">
          <AreaChart data={slaSeries} height={120} />
        </div>
      </div>
    </div>
  );
}

function SmallMetric({
  label,
  value,
  data,
  trend,
  footer,
  tag,
  stroke = "#2f9e54",
}: {
  label: string;
  value: string;
  data: number[];
  trend: number;
  footer: [string, string][];
  tag: string;
  stroke?: string;
}) {
  const down = trend < 0;
  return (
    <div className="flex flex-col rounded-3xl bg-cream p-5 ring-1 ring-black/[0.03] transition hover:ring-black/[0.08]">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-ink/45">{label}</p>
        <ArrowUpRight size={15} className="text-ink/25" />
      </div>
      <div className="mt-1 flex items-end justify-between">
        <span className="font-display text-[34px] font-semibold leading-none tracking-tight text-ink">
          {value}
        </span>
        <div className="text-right text-[11.5px] leading-tight text-ink/45">
          {footer.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <span>{k}</span>
              <span className="font-medium text-ink/70">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-3 h-[44px]">
        <Sparkline data={data} stroke={stroke} />
        <span className="absolute bottom-0 right-0 rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-ink/40">
          {tag}
        </span>
      </div>
      <div
        className={`mt-2 flex items-center gap-1 text-[11.5px] font-medium ${
          down ? "text-forest" : "text-flame"
        }`}
      >
        {down ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
        {Math.abs(trend)}% vs prev
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  footer,
  accent = "text-ink",
}: {
  label: string;
  value: string;
  footer: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-cream p-5 ring-1 ring-black/[0.03] transition hover:ring-black/[0.08]">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-ink/45">{label}</p>
        <ArrowUpRight size={15} className="text-ink/25" />
      </div>
      <span
        className={`mt-3 font-display text-[40px] font-semibold leading-none tracking-tight ${accent}`}
      >
        {value}
      </span>
      <div className="mt-5">{footer}</div>
    </div>
  );
}

function MostErrored() {
  return (
    <div className="rounded-3xl bg-cream p-5 ring-1 ring-black/[0.03]">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] font-medium text-ink/45">Most errored</p>
        <ArrowUpRight size={15} className="text-ink/25" />
      </div>
      <div className="mt-3 space-y-3">
        {mostErrored.map((e) => (
          <div key={e.name}>
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-ink">
                  {e.name}
                </p>
                <p className="truncate text-[11px] text-ink/40">{e.sub}</p>
              </div>
              <span className="shrink-0 tabular-nums text-[12px] font-medium text-ink/55">
                {e.total}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.05]">
              <div
                className="h-full rounded-full bg-flame/80"
                style={{ width: `${e.bar * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: RunStatus }) {
  const map = {
    success: {
      icon: CircleCheck,
      label: "Success",
      cls: "bg-forest/8 text-forest",
    },
    failed: {
      icon: CircleX,
      label: "Failed",
      cls: "bg-flame/10 text-flame",
    },
    running: {
      icon: LoaderCircle,
      label: "Running",
      cls: "bg-black/[0.05] text-ink/55",
    },
  } as const;
  const { icon: Icon, label, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${cls}`}
    >
      <Icon size={13} className={status === "running" ? "animate-spin" : ""} />
      {label}
    </span>
  );
}
