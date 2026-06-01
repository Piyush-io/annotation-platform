export type RunStatus = "success" | "failed" | "running";

export interface RunRow {
  id: string;
  started: string;
  workflow: string;
  duration: string;
  status: RunStatus;
  error: string;
  retries: string;
}

export const slaSeries = [
  96, 95.2, 94.8, 95.6, 94.1, 93.7, 94.4, 95.1, 94.6, 93.9, 94.8, 96.2,
  97.1, 96.4, 95.8, 96.9, 98.2, 97.6, 96.8, 98.7,
];

export const latencySeries = [
  2.1, 2.0, 2.3, 1.9, 1.7, 1.8, 1.6, 1.9, 2.2, 1.8, 1.5, 1.4, 1.6, 1.5, 1.3,
  1.7, 1.9, 1.6, 1.8, 1.8,
];

export const lagSeries = [
  41, 44, 39, 46, 52, 48, 55, 60, 57, 49, 44, 41, 38, 36, 40, 43, 39, 37, 38,
  38,
];

export const liveFeed: RunRow[] = [
  {
    id: "6721",
    started: "42s ago",
    workflow: "Orders import",
    duration: "8.2s",
    status: "failed",
    error: "TimeoutError: Supplier API timed out",
    retries: "2 / 4",
  },
  {
    id: "6722",
    started: "1m 21s ago",
    workflow: "Product Sync",
    duration: "45.2s",
    status: "running",
    error: "—",
    retries: "0 / 0",
  },
  {
    id: "6723",
    started: "1m 49s ago",
    workflow: "Deduplication",
    duration: "58.7s",
    status: "success",
    error: "None",
    retries: "0 / 1",
  },
  {
    id: "6724",
    started: "2m 11s ago",
    workflow: "Customer Webhook",
    duration: "50.1s",
    status: "success",
    error: "None",
    retries: "0 / 0",
  },
  {
    id: "6725",
    started: "4m 13s ago",
    workflow: "Orders import",
    duration: "62.3s",
    status: "success",
    error: "None",
    retries: "0 / 0",
  },
  {
    id: "6726",
    started: "5m 02s ago",
    workflow: "Data enrichment",
    duration: "10.4s",
    status: "failed",
    error: "HTTPError 404: Not Found",
    retries: "1 / 3",
  },
  {
    id: "6727",
    started: "6m 38s ago",
    workflow: "Analytics Refresh",
    duration: "25.9s",
    status: "success",
    error: "None",
    retries: "0 / 0",
  },
];

export const mostErrored = [
  { name: "Orders import", sub: "TimeoutError", total: "36 / 13", bar: 1 },
  { name: "Data enrichment", sub: "404: Not Found", total: "12 / 3", bar: 0.42 },
  { name: "Deduplication", sub: "MergeConflict", total: "8 / 2", bar: 0.26 },
  { name: "KYC Update", sub: "SchemaDrift", total: "5 / 1", bar: 0.17 },
];

export const notifications = [
  {
    title: "Orders Import failed",
    meta: "42s · TimeoutError at Step 2",
    badge: "2",
    tone: "flame" as const,
  },
  {
    title: "SLA breach",
    meta: "2m 11s · Data enrichment",
    tone: "amber" as const,
  },
  {
    title: "Product sync auto-fixed",
    meta: "5m · 404 on GET /products",
    tone: "green" as const,
  },
];

export const timeRanges = ["1H", "4H", "24H", "72H", "7D", "30D"];
