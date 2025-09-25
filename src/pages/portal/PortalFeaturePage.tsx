import { Fragment, type ReactNode } from "react";

import { PORTAL_FEATURES } from "@/_mock/portal";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Text, Title } from "@/ui/typography";

import type {
	PortalFeatureContent,
	PortalFeatureOperation,
	PortalFeatureTable,
	PortalFeatureTableColumn,
	PortalFeatureTableRow,
	PortalMetric,
	PortalPipeline,
	PortalQuickWin,
	PortalRisk,
	PortalWorkstream,
} from "./types";

interface PortalFeaturePageProps {
	sectionKey: string;
	featureKey: string;
}

export default function PortalFeaturePage({ sectionKey, featureKey }: PortalFeaturePageProps) {
	const feature = PORTAL_FEATURES[sectionKey]?.[featureKey];

	if (!feature) {
		return (
			<section className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
				<Icon icon="solar:archive-minimalistic-bold-duotone" size={72} className="text-muted-foreground" />
				<div className="space-y-2">
					<Title as="h2" className="text-2xl font-semibold">
						功能配置缺失
					</Title>
					<Text variant="body2" className="text-muted-foreground">
						未找到 {sectionKey}/{featureKey} 的配置，请联系平台管理员完善模拟数据。
					</Text>
				</div>
			</section>
		);
	}

	return (
		<div className="space-y-6 pb-12">
			<HeroCard feature={feature} />

			{feature.operations?.length ? (
				<OperationsPanel title={feature.hero.title} operations={feature.operations} />
			) : null}

			{feature.metrics?.length ? <MetricsGrid metrics={feature.metrics} /> : null}

			{feature.tables?.length ? feature.tables.map((table) => <FeatureTable key={table.id} table={table} />) : null}

			{feature.highlights?.length ? <HighlightsCard highlights={feature.highlights} /> : null}

			{feature.workstreams?.length ? <WorkstreamsCard workstreams={feature.workstreams} /> : null}

			{feature.datasets?.length ? <DatasetsCard datasets={feature.datasets} /> : null}

			{feature.pipelines?.length ? <PipelinesCard pipelines={feature.pipelines} /> : null}

			{feature.quickWins?.length ? <QuickWinsCard items={feature.quickWins} /> : null}

			{feature.risks?.length ? <RisksCard risks={feature.risks} /> : null}

			{feature.insights?.length ? <InsightsCard insights={feature.insights} /> : null}
		</div>
	);
}

function HeroCard({ feature }: { feature: PortalFeatureContent }) {
	const { hero } = feature;
	return (
		<Card>
			<CardHeader>
				<CardTitle>{hero.title}</CardTitle>
				<Text variant="body2" className="text-muted-foreground">
					{hero.summary}
				</Text>
			</CardHeader>
			<CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
				<p>{hero.description}</p>
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					<InfoItem label="负责人" value={hero.owner} />
					<InfoItem label="当前阶段" value={<StageBadge stage={hero.stage} />} />
					<InfoItem label="最近更新" value={hero.lastUpdated} />
					<InfoItem label="参考产品" value={hero.relatedProducts?.length ? hero.relatedProducts.join(" · ") : "--"} />
				</div>
			</CardContent>
		</Card>
	);
}

function InfoItem({ label, value }: { label: string; value: ReactNode }) {
	return (
		<div className="space-y-1">
			<Text variant="body3" className="text-xs uppercase tracking-wide text-muted-foreground">
				{label}
			</Text>
			<div className="text-base text-text-primary">{value}</div>
		</div>
	);
}

function StageBadge({ stage }: { stage: PortalFeatureContent["hero"]["stage"] }) {
	const variant: Record<PortalFeatureContent["hero"]["stage"], "secondary" | "default" | "outline" | "destructive"> = {
		规划: "outline",
		建设: "secondary",
		试运行: "default",
		运营: "default",
	};
	return <Badge variant={variant[stage]}>{stage}</Badge>;
}

function OperationsPanel({ title, operations }: { title: string; operations: PortalFeatureOperation[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title} 操作面板</CardTitle>
				<Text variant="body3" className="text-muted-foreground">
					快速发起新增、导入或批量治理动作，保持能力与流程的持续演进。
				</Text>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-3">
					{operations.map((operation) => (
						<Button
							key={operation.label}
							variant={operation.variant}
							size={operation.size ?? "default"}
							className="flex items-center gap-2"
						>
							{operation.icon ? <Icon icon={operation.icon} className="size-4" /> : null}
							{operation.label}
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

function MetricsGrid({ metrics }: { metrics: PortalMetric[] }) {
	return (
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{metrics.map((metric) => (
				<Card key={metric.label} className="border-dashed">
					<CardHeader className="pb-2">
						<Text variant="body3" className="text-xs uppercase tracking-wide text-muted-foreground">
							{metric.label}
						</Text>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-end justify-between gap-2">
							<span className="text-3xl font-semibold text-text-primary">{metric.value}</span>
							{metric.change ? <TrendBadge change={metric.change} trend={metric.trend} /> : null}
						</div>
						{metric.helper ? (
							<Text variant="body3" className="text-muted-foreground">
								{metric.helper}
							</Text>
						) : null}
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function TrendBadge({ change, trend }: { change: string; trend?: PortalMetric["trend"] }) {
	const icon = trend === "down" ? "solar:arrow-down-line-duotone" : "solar:arrow-up-line-duotone";
	const color = trend === "down" ? "text-destructive" : "text-success";
	return (
		<span className={`flex items-center gap-1 text-sm font-medium ${color}`}>
			<Icon icon={icon} size={16} />
			{change}
		</span>
	);
}

function HighlightsCard({ highlights }: { highlights: NonNullable<PortalFeatureContent["highlights"]> }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>能力亮点</CardTitle>
				<Text variant="body3" className="text-muted-foreground">
					对标 Cloudera、星环大数据平台的成熟能力，梳理当前建设重点。
				</Text>
			</CardHeader>
			<CardContent className="grid gap-3 md:grid-cols-2">
				{highlights.map((item) => (
					<div key={item.title} className="space-y-2 rounded-lg border border-dashed p-3">
						<Text variant="body2" className="font-semibold">
							{item.title}
						</Text>
						<Text variant="body3" className="text-muted-foreground">
							{item.description}
						</Text>
						{item.tags?.length ? (
							<div className="flex flex-wrap gap-2">
								{item.tags.map((tag) => (
									<Badge key={tag} variant="outline">
										{tag}
									</Badge>
								))}
							</div>
						) : null}
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function FeatureTable({ table }: { table: PortalFeatureTable }) {
	const hasRowActions = table.rows.some((row) => row.actions?.length);

	return (
		<Card>
			<CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div>
					<CardTitle>{table.title}</CardTitle>
					{table.description ? (
						<Text variant="body3" className="text-muted-foreground">
							{table.description}
						</Text>
					) : null}
				</div>
				{table.actions?.length ? (
					<div className="flex flex-wrap gap-2">
						{table.actions.map((action) => (
							<Button
								key={action.label}
								variant={action.variant}
								size={action.size ?? "sm"}
								className="flex items-center gap-2"
							>
								{action.icon ? <Icon icon={action.icon} className="size-4" /> : null}
								{action.label}
							</Button>
						))}
					</div>
				) : null}
			</CardHeader>
			<CardContent className="overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="border-b text-left text-muted-foreground">
						<tr>
							{table.columns.map((column) => (
								<th key={column.key} className={`py-2 pr-4 font-medium ${getAlignmentClass(column.align)}`}>
									{column.label}
								</th>
							))}
							{hasRowActions ? <th className="py-2 text-right font-medium">操作</th> : null}
						</tr>
					</thead>
					<tbody>
						{table.rows.map((row) => (
							<tr key={row.id} className="border-b last:border-none">
								{table.columns.map((column) => (
									<td key={`${row.id}-${column.key}`} className={`py-2 pr-4 ${getAlignmentClass(column.align)}`}>
										{renderTableCell(column, row)}
									</td>
								))}
								{hasRowActions ? (
									<td className="py-2 text-right">
										<div className="flex flex-wrap justify-end gap-1">
											{row.actions?.map((action) => (
												<Button
													key={`${row.id}-${action.label}`}
													variant={action.variant ?? "ghost"}
													size="sm"
													className={`flex items-center gap-1 ${action.tone === "danger" ? "text-destructive" : ""}`}
												>
													{action.icon ? <Icon icon={action.icon} className="size-3.5" /> : null}
													{action.label}
												</Button>
											))}
										</div>
									</td>
								) : null}
							</tr>
						))}
					</tbody>
				</table>
			</CardContent>
		</Card>
	);
}

function getAlignmentClass(align: PortalFeatureTableColumn["align"]) {
	if (align === "center") return "text-center";
	if (align === "right") return "text-right";
	return "text-left";
}

function renderTableCell(column: PortalFeatureTableColumn, row: PortalFeatureTableRow) {
	const value = row.values[column.key] ?? "--";
	if (column.format === "badge") {
		const variant = row.badges?.[column.key] ?? "secondary";
		return <Badge variant={variant}>{value}</Badge>;
	}
	if (column.format === "number") {
		return Number.isNaN(Number(value)) ? value : Number(value).toLocaleString();
	}
	return value;
}

function WorkstreamsCard({ workstreams }: { workstreams: PortalWorkstream[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>重点工作推进</CardTitle>
				<Text variant="body3" className="text-muted-foreground">
					聚焦业务上线、制度完善、技术能力三条线闭环推进。
				</Text>
			</CardHeader>
			<CardContent className="space-y-3">
				{workstreams.map((stream) => (
					<div key={stream.name} className="space-y-2 rounded-lg border p-3">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<Text variant="body2" className="font-semibold">
								{stream.name}
							</Text>
							<WorkstreamStatusBadge status={stream.status} />
						</div>
						<Text variant="body3" className="text-muted-foreground">
							责任人：{stream.owner} · 截止：{stream.due}
						</Text>
						<Progress value={stream.progress} />
						{stream.notes ? (
							<Text variant="body3" className="text-muted-foreground">
								{stream.notes}
							</Text>
						) : null}
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function WorkstreamStatusBadge({ status }: { status: PortalWorkstream["status"] }) {
	const map: Record<
		PortalWorkstream["status"],
		{ label: string; variant: "secondary" | "outline" | "default" | "destructive" }
	> = {
		"on-track": { label: "按计划", variant: "secondary" },
		"at-risk": { label: "有风险", variant: "outline" },
		delayed: { label: "已延期", variant: "destructive" },
		done: { label: "已完成", variant: "default" },
	};
	const current = map[status];
	return <Badge variant={current.variant}>{current.label}</Badge>;
}

function DatasetsCard({ datasets }: { datasets: NonNullable<PortalFeatureContent["datasets"]> }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>核心数据资产</CardTitle>
				<Text variant="body3" className="text-muted-foreground">
					结合数据目录对资产域内的重点数据集进行盘点与治理。
				</Text>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="overflow-x-auto">
					<table className="min-w-full table-fixed text-sm">
						<thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
							<tr>
								<th className="px-4 py-2">数据资产</th>
								<th className="px-4 py-2">所属域</th>
								<th className="px-4 py-2">主要用途</th>
								<th className="px-4 py-2">数据管理员</th>
								<th className="px-4 py-2">状态</th>
								<th className="px-4 py-2">新鲜度</th>
							</tr>
						</thead>
						<tbody>
							{datasets.map((item) => (
								<tr key={item.name} className="border-b last:border-b-0">
									<td className="px-4 py-3 font-medium text-text-primary">{item.name}</td>
									<td className="px-4 py-3 text-muted-foreground">{item.domain}</td>
									<td className="px-4 py-3 text-muted-foreground">{item.usage}</td>
									<td className="px-4 py-3 text-muted-foreground">{item.steward}</td>
									<td className="px-4 py-3">
										<Badge variant="outline">{item.status}</Badge>
									</td>
									<td className="px-4 py-3 text-muted-foreground">{item.freshness}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}

function PipelinesCard({ pipelines }: { pipelines: PortalPipeline[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>集成与作业运行</CardTitle>
				<Text variant="body3" className="text-muted-foreground">
					关注跨平台作业在 CDP、TDS 中的调度、性能与稳定性。
				</Text>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="overflow-x-auto">
					<table className="min-w-full table-fixed text-sm">
						<thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
							<tr>
								<th className="px-4 py-2">作业名称</th>
								<th className="px-4 py-2">类型</th>
								<th className="px-4 py-2">工具</th>
								<th className="px-4 py-2">调度策略</th>
								<th className="px-4 py-2">吞吐</th>
								<th className="px-4 py-2">状态</th>
							</tr>
						</thead>
						<tbody>
							{pipelines.map((pipeline) => (
								<tr key={pipeline.name} className="border-b last:border-b-0">
									<td className="px-4 py-3 font-medium text-text-primary">{pipeline.name}</td>
									<td className="px-4 py-3 text-muted-foreground">{pipeline.type}</td>
									<td className="px-4 py-3 text-muted-foreground">{pipeline.tool}</td>
									<td className="px-4 py-3 text-muted-foreground">{pipeline.schedule}</td>
									<td className="px-4 py-3 text-muted-foreground">{pipeline.throughput}</td>
									<td className="px-4 py-3">
										<PipelineBadge status={pipeline.status} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{pipelines.some((pipeline) => pipeline.notes) ? (
					<div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
						{pipelines.map((pipeline) =>
							pipeline.notes ? (
								<Fragment key={pipeline.name}>
									<div className="flex items-start gap-2">
										<Icon icon="solar:info-circle-linear" className="mt-1 text-warning" size={16} />
										<span>
											<strong className="text-text-primary">{pipeline.name}</strong>：{pipeline.notes}
										</span>
									</div>
								</Fragment>
							) : null,
						)}
					</div>
				) : null}
			</CardContent>
		</Card>
	);
}

function PipelineBadge({ status }: { status: PortalPipeline["status"] }) {
	const map: Record<PortalPipeline["status"], { label: string; variant: "secondary" | "outline" | "destructive" }> = {
		healthy: { label: "健康", variant: "secondary" },
		warning: { label: "关注", variant: "outline" },
		critical: { label: "告警", variant: "destructive" },
	};
	const current = map[status];
	return <Badge variant={current.variant}>{current.label}</Badge>;
}

function QuickWinsCard({ items }: { items: PortalQuickWin[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>当季交付与快速收益</CardTitle>
				<Text variant="body3" className="text-muted-foreground">
					结合业务诉求，规划快速上线的服务能力。
				</Text>
			</CardHeader>
			<CardContent className="grid gap-3 md:grid-cols-2">
				{items.map((item) => (
					<div key={item.name} className="space-y-2 rounded-lg border border-dashed p-3">
						<Text variant="body2" className="font-semibold">
							{item.name}
						</Text>
						<Text variant="body3" className="text-muted-foreground">
							{item.description}
						</Text>
						<div className="flex items-center justify-between">
							<Badge variant="outline">影响：{item.impact}</Badge>
							<Badge
								variant={item.status === "已完成" ? "default" : item.status === "进行中" ? "secondary" : "outline"}
							>
								{item.status}
							</Badge>
						</div>
						<Text variant="body3" className="text-muted-foreground">
							负责人：{item.owner}
						</Text>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function RisksCard({ risks }: { risks: PortalRisk[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>风险与合规</CardTitle>
				<Text variant="body3" className="text-muted-foreground">
					针对监管要求与平台安全，建立风险识别与缓解策略。
				</Text>
			</CardHeader>
			<CardContent className="space-y-3">
				{risks.map((risk) => (
					<div key={risk.name} className="space-y-2 rounded-lg border p-3">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<Text variant="body2" className="font-semibold">
								{risk.name}
							</Text>
							<SeverityBadge severity={risk.severity} />
						</div>
						<Text variant="body3" className="text-muted-foreground">
							{risk.description}
						</Text>
						<Text variant="body3" className="text-muted-foreground">
							缓解：{risk.mitigation}
						</Text>
						<Text variant="body3" className="text-muted-foreground">
							责任人：{risk.owner}
						</Text>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function SeverityBadge({ severity }: { severity: PortalRisk["severity"] }) {
	const map: Record<PortalRisk["severity"], { label: string; variant: "destructive" | "secondary" | "outline" }> = {
		高: { label: "高", variant: "destructive" },
		中: { label: "中", variant: "secondary" },
		低: { label: "低", variant: "outline" },
	};
	const current = map[severity];
	return <Badge variant={current.variant}>风险：{current.label}</Badge>;
}

function InsightsCard({ insights }: { insights: PortalFeatureContent["insights"] }) {
	if (!insights?.length) return null;
	return (
		<Card>
			<CardHeader>
				<CardTitle>分析洞察</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 text-sm text-muted-foreground">
				{insights.map((insight) => (
					<div key={insight.label} className="flex items-start gap-2">
						<Icon icon="solar:chart-2-line-duotone" size={18} className="mt-0.5 text-primary" />
						<div>
							<Text variant="body2" className="font-semibold text-text-primary">
								{insight.label}
							</Text>
							<Text variant="body3" className="text-muted-foreground">
								{insight.detail}
							</Text>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
