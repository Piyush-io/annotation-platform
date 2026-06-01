interface ChartProps {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  showEndDot?: boolean;
  strokeWidth?: number;
}

function buildPath(data: number[], w: number, h: number, pad = 4) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (w - pad * 2) / (data.length - 1);
  return data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return { x, y };
  });
}

// Smooth area chart (used for the big SLA card)
export function AreaChart({
  data,
  width = 600,
  height = 150,
  stroke = "var(--color-forest)",
  fill = "var(--color-leaf)",
  showEndDot = true,
  strokeWidth = 2.5,
}: ChartProps) {
  const pts = buildPath(data, width, height, 6);
  const line = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");
  const area = `${line} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`;
  const last = pts[pts.length - 1];
  const gid = `g-${Math.round(width)}-${data.length}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
          <stop offset="100%" stopColor={fill} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {showEndDot && (
        <g>
          <circle cx={last.x} cy={last.y} r="6" fill={stroke} opacity="0.18" />
          <circle cx={last.x} cy={last.y} r="3.2" fill={stroke} />
        </g>
      )}
    </svg>
  );
}

// Compact sparkline for small metric cards
export function Sparkline({
  data,
  width = 220,
  height = 56,
  stroke = "#2f9e54",
  showEndDot = true,
}: ChartProps) {
  const pts = buildPath(data, width, height, 4);
  const line = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");
  const last = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {showEndDot && <circle cx={last.x} cy={last.y} r="3" fill={stroke} />}
    </svg>
  );
}

export function ProgressBar({
  segments,
}: {
  segments: { value: number; color: string }[];
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full">
      {segments.map((s, i) => (
        <div
          key={i}
          className="h-full rounded-full"
          style={{ width: `${(s.value / total) * 100}%`, background: s.color }}
        />
      ))}
    </div>
  );
}
