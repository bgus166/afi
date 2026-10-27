import { Bell, CalendarDays, ChartNoAxesCombined, ChevronDown, ChevronsUpDown, CircleHelp, Ellipsis, FilePenLine, LayoutDashboard, MessagesSquare, Settings2, Workflow } from "lucide-react";
import { workspaceViews, type WorkspacePeriod, type WorkspaceView } from "./workspaceData";
import styles from "./hero-split.module.css";

const navigation = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "assist", label: "AfiAssist", icon: MessagesSquare },
  { key: "creator", label: "AfiCreator", icon: FilePenLine },
  { key: "insight", label: "AfiInsight", icon: ChartNoAxesCombined },
  { key: "flow", label: "AfiFlow", icon: Workflow },
] as const;

export function HeroWorkspace({ view, period, onView, onPeriod, decorative = false }: {
  view: WorkspaceView; period: WorkspacePeriod; onView?: (view: WorkspaceView) => void;
  onPeriod?: (period: WorkspacePeriod) => void; decorative?: boolean;
}) {
  const data = workspaceViews[view];
  const bars = period === 7 ? [52, 64, 57, 72, 68, 85, 96] : [31, 46, 38, 51, 44, 66, 58, 62, 71, 82, 75, 96];
  const dates = period === 7 ? ["24 Okt", "27 Okt", "30 Okt"] : ["1 Okt", "15 Okt", "30 Okt"];
  return <div className={styles.workspace}>
    <aside className={styles.sidebar}>
      <div className={styles.workspaceLogo}><span aria-hidden="true">Λ</span><strong>Afilabs<small>workspace</small></strong></div>
      <div className={styles.workspaceSwitch}><span className={styles.avatar}>D</span><span>Demo brand<small>Business workspace</small></span><ChevronsUpDown size={12} aria-hidden="true" /></div>
      <span className={styles.menuLabel}>Workspace</span>
      <nav aria-label={decorative ? undefined : "Menu demo dashboard"}>{navigation.map(({ key, label, icon: Icon }) => <button key={key} type="button" aria-label={label} aria-pressed={key === view} onClick={() => onView?.(key)}><Icon size={16} aria-hidden="true" /><span>{label}</span>{key === "assist" && <small>12</small>}</button>)}</nav>
      <div className={styles.sidebarFoot}><span><CircleHelp size={15} aria-hidden="true" /><span>Help &amp; resources</span></span><div><span className={styles.avatar}>K</span><span>Kamu<small>Workspace admin</small></span><Settings2 size={15} aria-hidden="true" /></div></div>
    </aside>
    <div className={styles.workspaceMain}>
      <div className={styles.toolbar}><span>Workspace <b>/</b> {data.name}</span><div><span className={styles.demoDot}>Data ilustrasi</span><Bell size={15} aria-hidden="true" /><span className={styles.avatar}>K</span></div></div>
      <div className={styles.workspaceContent}>
        <div className={styles.workspaceHeading}><div><span>Your business at a glance</span><h3>{data.title}</h3></div><label><CalendarDays size={13} aria-hidden="true" /><select aria-label="Periode demo dashboard" value={period} onChange={(event) => onPeriod?.(Number(event.target.value) as WorkspacePeriod)}><option value={7}>7 hari terakhir</option><option value={30}>30 hari terakhir</option></select><ChevronDown size={11} aria-hidden="true" /></label></div>
        <div className={styles.metrics}>{data.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.values[period === 7 ? 0 : 1]}</strong><small>{metric.note}</small></div>)}</div>
        <div className={styles.workspaceGrid}>
          <div className={styles.chartPanel}><div className={styles.panelHeading}><h4>{data.chart}</h4><span>{data.unit}</span></div><div className={styles.chart} role="img" aria-label={`${data.chart}, grafik ilustrasi ${period} hari.`}><div className={styles.chartGrid} aria-hidden="true">{data.ticks.map((tick) => <span key={tick}>{tick}</span>)}</div><div className={styles.chartBars} aria-hidden="true">{bars.map((height, index) => <i key={index} className={index >= bars.length - 3 ? styles.strongBar : ""} style={{ height: `${height}%` }} />)}</div></div><div className={styles.chartDates} aria-hidden="true">{dates.map((date) => <span key={date}>{date}</span>)}</div></div>
          <div className={styles.distribution}><div className={styles.panelHeading}><h4>{data.distribution}</h4><Ellipsis size={14} aria-hidden="true" /></div><div className={styles.donut} aria-hidden="true"><span>3<small>{data.sourceLabel}</small></span></div><div className={styles.legend}>{data.legend.map((name, index) => <span key={name}><i aria-hidden="true" /><span>{name}</span><b>{[40, 38, 22][index]}%</b></span>)}</div></div>
        </div>
        <div className={styles.activity}><div className={styles.panelHeading}><h4>{data.table}</h4><span>Contoh workspace</span></div><table aria-label={`Contoh ${data.table.toLowerCase()}`}><thead><tr><th scope="col">Aktivitas</th><th scope="col">Layanan</th><th scope="col">Status</th></tr></thead><tbody>{data.rows.map(([name, service, status]) => <tr key={name}><td>{name}</td><td>{service}</td><td><span>{status}</span></td></tr>)}</tbody></table></div>
      </div>
    </div>
  </div>;
}
