export interface PortalMetric {
	label: string;
	value: string;
	change?: string;
	trend?: "up" | "down";
	helper?: string;
}

export interface PortalHighlight {
	title: string;
	description: string;
	tags?: string[];
}

export type WorkstreamStatus = "on-track" | "at-risk" | "delayed" | "done";

export interface PortalWorkstream {
	name: string;
	owner: string;
	due: string;
	status: WorkstreamStatus;
	progress: number;
	notes?: string;
}

export interface PortalDataAsset {
	name: string;
	domain: string;
	usage: string;
	steward: string;
	status: string;
	freshness: string;
}

export type PipelineHealth = "healthy" | "warning" | "critical";

export interface PortalPipeline {
	name: string;
	type: string;
	tool: string;
	schedule: string;
	throughput: string;
	status: PipelineHealth;
	notes?: string;
}

export interface PortalRisk {
	name: string;
	severity: "高" | "中" | "低";
	description: string;
	mitigation: string;
	owner: string;
}

export interface PortalQuickWin {
	name: string;
	description: string;
	impact: "高" | "中" | "低";
	status: "进行中" | "已完成" | "规划中";
	owner: string;
}

export interface PortalInsight {
	label: string;
	detail: string;
}

export interface PortalFeatureHero {
	title: string;
	summary: string;
	description: string;
	owner: string;
	stage: "规划" | "建设" | "试运行" | "运营";
	lastUpdated: string;
	relatedProducts?: string[];
}

export interface PortalFeatureContent {
	id: string;
	hero: PortalFeatureHero;
	metrics?: PortalMetric[];
	highlights?: PortalHighlight[];
	workstreams?: PortalWorkstream[];
	datasets?: PortalDataAsset[];
	pipelines?: PortalPipeline[];
	risks?: PortalRisk[];
	quickWins?: PortalQuickWin[];
	insights?: PortalInsight[];
}
