import type {
	PortalFeatureContent,
	PortalHighlight,
	PortalInsight,
	PortalMetric,
	PortalPipeline,
	PortalQuickWin,
	PortalRisk,
	PortalWorkstream,
	PortalDataAsset,
} from "@/pages/portal/types";

type PortalFeatureMap = Record<string, Record<string, PortalFeatureContent>>;

const makeId = (section: string, feature: string) => `${section}.${feature}`;

const createMetrics = (topic: string, values: [string, string, string]): PortalMetric[] => {
	const [valueOne, valueTwo, valueThree] = values;
	return [
		{
			label: "纳管资产量",
			value: valueOne,
			change: "+8%",
			trend: "up",
			helper: `覆盖${topic}所需的关键资产与指标。`,
		},
		{
			label: "上线能力模块",
			value: valueTwo,
			change: "+2",
			trend: "up",
			helper: `参考 Cloudera 与星环产品的成熟能力，完善${topic}模块。`,
		},
		{
			label: "治理指标达成率",
			value: valueThree,
			change: "+5%",
			trend: "up",
			helper: "结合星环治理评分与 Cloudera SteadyOps 指标进行对齐。",
		},
	];
};

const createHighlights = (items: { title: string; description: string; tags?: string[] }[]): PortalHighlight[] =>
	items.map((item) => ({
		...item,
		tags: item.tags ?? ["CDP", "TDS"],
	}));

const createWorkstreams = (topic: string): PortalWorkstream[] => [
	{
		name: `${topic}蓝图设计`,
		owner: "数据架构组",
		due: "2024-07-15",
		status: "on-track",
		progress: 68,
		notes: "梳理业务域与技术域映射，形成统一蓝图。",
	},
	{
		name: `${topic}制度流程完善`,
		owner: "数据治理办公室",
		due: "2024-08-10",
		status: "at-risk",
		progress: 54,
		notes: "结合等保、数据出境要求修订制度条款。",
	},
	{
		name: `${topic}平台化落地`,
		owner: "平台研发中心",
		due: "2024-09-01",
		status: "on-track",
		progress: 62,
		notes: "复用 TDS Fabric 与 CDP Management Console 能力。",
	},
	{
		name: `${topic}业务场景试点`,
		owner: "行业方案团队",
		due: "2024-09-30",
		status: "delayed",
		progress: 38,
		notes: "与重点业务联合试点，迭代优化流程。",
	},
];

const createDatasets = (topic: string): PortalDataAsset[] => [
	{
		name: `${topic}主数据`,
		domain: "主数据域",
		usage: "支撑统一索引与跨域检索",
		steward: "王敏",
		status: "已纳管",
		freshness: "T+1",
	},
	{
		name: `${topic}画像数据集`,
		domain: "分析域",
		usage: "供智能分析与 AI 模型训练",
		steward: "李卓",
		status: "试运行",
		freshness: "实时",
	},
	{
		name: `${topic}指标快照`,
		domain: "指标域",
		usage: "用于治理评估与运营对标",
		steward: "陈立",
		status: "建设中",
		freshness: "T+3",
	},
];

const createProcesses = (topic: string): PortalPipeline[] => [
	{
		name: `${topic}执行编排`,
		type: "批调度",
		tool: "TDS DataStudio / CDP Workload XM",
		schedule: "每日 02:00",
		throughput: "执行 42 个节点",
		status: "healthy",
		notes: "按优先级动态分配资源，保障 SLA。",
	},
	{
		name: `${topic}实时监控`,
		type: "实时流控",
		tool: "Cloudera Flow Management",
		schedule: "实时",
		throughput: "处理峰值 35 万条记录/分钟",
		status: "warning",
		notes: "Kafka Topic 水位偏高，建议扩容 Broker。",
	},
	{
		name: `${topic}质量守护`,
		type: "质量规则",
		tool: "TDS Quality Center",
		schedule: "发布前",
		throughput: "覆盖 180 条规则",
		status: "healthy",
	},
];

const createQuickWins = (topic: string): PortalQuickWin[] => [
	{
		name: `${topic}自动化报表`,
		description: "复用资产洞察模板，快速发布业务可视化。",
		impact: "高",
		status: "进行中",
		owner: "经营分析处",
	},
	{
		name: `${topic}治理看板`,
		description: "将 Cloudera 与 TDS 治理指标整合到驾驶舱。",
		impact: "中",
		status: "已完成",
		owner: "平台体验组",
	},
	{
		name: `${topic}最佳实践指引`,
		description: "沉淀操作手册与 SOP，提升上线效率。",
		impact: "中",
		status: "规划中",
		owner: "数据运营部",
	},
	{
		name: `${topic}培训营`,
		description: "围绕关键场景为业务团队开展实操培训。",
		impact: "高",
		status: "进行中",
		owner: "培训赋能中心",
	},
];

const createInsights = (topic: string): PortalInsight[] => [
	{
		label: "价值贡献",
		detail: `${topic}相关服务的调用占比达到 34%，同比提升 11%。`,
	},
	{
		label: "流程效率",
		detail: `对标 Cloudera SDX 自动化审批，${topic}平均处理时长缩短至 3.5 天。`,
	},
	{
		label: "质量趋势",
		detail: `关键数据缺陷率从 2.1% 降至 0.6%，满足星环治理红线要求。`,
	},
];

interface FeatureDefinition {
	key: string;
	title: string;
	summary: string;
	description: string;
	owner: string;
	stage: "规划" | "建设" | "试运行" | "运营";
	lastUpdated: string;
	relatedProducts: string[];
	topic: string;
	metricValues: [string, string, string];
	highlights: { title: string; description: string; tags?: string[] }[];
	quickWinTopic?: string;
	insightTopic?: string;
	datasetTopic?: string;
	processTopic?: string;
	workstreamTopic?: string;
	risks?: PortalRisk[];
}

const createSection = (sectionKey: string, definitions: FeatureDefinition[]): Record<string, PortalFeatureContent> => {
	return definitions.reduce<Record<string, PortalFeatureContent>>((acc, definition) => {
		const workTopic = definition.workstreamTopic ?? definition.topic;
		const datasetTopic = definition.datasetTopic ?? definition.topic;
		const processTopic = definition.processTopic ?? definition.topic;
		const quickTopic = definition.quickWinTopic ?? definition.topic;
		const insightTopic = definition.insightTopic ?? definition.topic;

		acc[definition.key] = {
			id: makeId(sectionKey, definition.key),
			hero: {
				title: definition.title,
				summary: definition.summary,
				description: definition.description,
				owner: definition.owner,
				stage: definition.stage,
				lastUpdated: definition.lastUpdated,
				relatedProducts: definition.relatedProducts,
			},
			metrics: createMetrics(definition.topic, definition.metricValues),
			highlights: createHighlights(definition.highlights),
			workstreams: createWorkstreams(workTopic),
			datasets: createDatasets(datasetTopic),
			pipelines: createProcesses(processTopic),
			quickWins: createQuickWins(quickTopic),
			insights: createInsights(insightTopic),
			...(definition.risks ? { risks: definition.risks } : {}),
		};
		return acc;
	}, {});
};
const assetPlanningDefinitions: FeatureDefinition[] = [
	{
		key: "segmentation",
		title: "资产规划与分层",
		summary: "构建跨平台统一的资产分层体系，支持域、层、对象三级治理。",
		description:
			"结合 Cloudera 数据域划分与星环多级资产模型，形成覆盖业务、技术、治理维度的分层规划，支撑资产目录快速定位。",
		owner: "企业数据架构委员会",
		stage: "建设",
		lastUpdated: "2024-06-28",
		relatedProducts: ["Cloudera Data Catalog", "TDS 数据中台"],
		topic: "资产分层",
		metricValues: ["18,420", "12", "84%"],
		highlights: [
			{
				title: "域-层-对象三维模型",
				description: "复用 CDP 主题域与 TDS 融合模型，支持资产跨平台定位。",
				tags: ["域模型", "跨平台映射"],
			},
			{ title: "生命周期策略联动", description: "按资产层级定义创建、变更、下线策略，衔接审批与自动化执行。" },
			{ title: "资产热度分析", description: "结合 CDP Usage Analytics 分析调用频次，识别重点治理资产。" },
			{ title: "行业最佳实践库", description: "引入星环行业模板，形成分层标准组件库。" },
		],
		insightTopic: "分层体系",
	},
	{
		key: "lifecycle",
		title: "资产生命周期管理",
		summary: "贯穿需求、设计、上线、退役全流程，实现自动化状态切换。",
		description: "借鉴 Cloudera SDX 元数据版本与 TDS 生命周期引擎，对资产从创建到退役的每个节点进行标准化定义与审计。",
		owner: "数据资产管理部",
		stage: "运营",
		lastUpdated: "2024-06-21",
		relatedProducts: ["Cloudera SDX", "TDS 生命周期中心"],
		topic: "资产生命周期",
		metricValues: ["12,760", "9", "88%"],
		highlights: [
			{
				title: "自动化状态流转",
				description: "集成审批中心，实现资产上线、变更、退役的一键驱动。",
				tags: ["自动化", "审批联动"],
			},
			{ title: "版本与回溯能力", description: "对标 Cloudera 元数据版本管理，支持多版本差异对比与回滚。" },
			{ title: "策略触发器", description: "结合 TDS Policy 引擎，按状态触发质检、告警、同步等操作。" },
			{ title: "归档与留存", description: "面向监管要求设置留存周期，自动进入低频存储或清理流程。" },
		],
		insightTopic: "生命周期管理",
	},
	{
		key: "assessment",
		title: "资产评估体系",
		summary: "构建价值、质量、风险三位一体评估体系，形成资产星级。",
		description:
			"融合 Cloudera Data Stewardship 与 TDS 治理评分框架，对资产价值、使用频率、合规风险进行量化评估，辅助决策。",
		owner: "数据价值运营中心",
		stage: "试运行",
		lastUpdated: "2024-06-26",
		relatedProducts: ["Cloudera Data Stewardship", "TDS 治理评分"],
		topic: "资产评估",
		metricValues: ["9,860", "7", "81%"],
		highlights: [
			{ title: "价值评估模型", description: "引入 ROI、收益率等指标，结合业务贡献度进行量化。", tags: ["价值", "ROI"] },
			{ title: "质量分层规则", description: "对标 TDS 质量红线，设置可视化质量雷达图。" },
			{ title: "风险量化引擎", description: "集成 Cloudera Navigator 审计指标，量化风险等级。" },
			{ title: "评估结果闭环", description: "评估结果驱动分层调整、治理任务与共享策略。" },
		],
		insightTopic: "资产评估",
	},
	{
		key: "map",
		title: "资产地图",
		summary: "多维可视化资产地图，支持行业、业务、地区、系统等多维交叉。",
		description: "结合 Cloudera Atlas 与 TDS 可视化组件，构建资产地理、组织、主题多维地图，实现资产全景洞察。",
		owner: "数据可视化创新组",
		stage: "建设",
		lastUpdated: "2024-06-18",
		relatedProducts: ["Cloudera Atlas", "TDS 可视化组件"],
		topic: "资产地图",
		metricValues: ["24,500", "11", "86%"],
		highlights: [
			{ title: "多维联动视角", description: "提供地区、组织、应用、系统四层钻取能力。", tags: ["多维分析", "可视化"] },
			{ title: "热度热力图", description: "基于实时调用量渲染热力，识别资产热点与盲区。" },
			{ title: "能力对标报告", description: "自动生成对标 Cloudera、星环平台的能力差距报告。" },
			{ title: "地图服务开放", description: "支持导出到业务门户或 API，提升共享效率。" },
		],
		insightTopic: "资产地图",
	},
];

const assetPlanning = createSection("assetPlanning", assetPlanningDefinitions);
const modelingDefinitions: FeatureDefinition[] = [
	{
		key: "modeling",
		title: "数据模型管理",
		summary: "构建跨域统一模型中心，支持建模、版本与发布全流程。",
		description:
			"对标 Cloudera SDX 模型治理与星环模型工厂，提供图形建模、模板导入、字段字典、影响分析、版本冻结等功能。",
		owner: "企业建模中心",
		stage: "建设",
		lastUpdated: "2024-06-27",
		relatedProducts: ["Cloudera SDX", "TDS 模型工厂"],
		topic: "模型管理",
		metricValues: ["4,120", "15", "79%"],
		highlights: [
			{
				title: "多源建模模板",
				description: "内置星环行业模型与 Cloudera 参考架构，快速建模。",
				tags: ["模板", "行业库"],
			},
			{ title: "字段血缘分析", description: "借助 Atlas 血缘 + TDS 字段管理，实现全链追踪。" },
			{ title: "模型发布审批", description: "集成审批中心，支持灰度发布与回滚。" },
			{ title: "模型影响评估", description: "结合质量中心评估模型变更对下游的影响。" },
		],
		insightTopic: "模型治理",
	},
	{
		key: "standard-management",
		title: "数据标准管理",
		summary: "集中维护命名、口径、指标等标准，支撑跨部门协同。",
		description: "借鉴 TDS 标准中心与 Cloudera Data Catalog 分类体系，实现标准制定、发布、复核、引用分析一体化。",
		owner: "数据标准委员会",
		stage: "运营",
		lastUpdated: "2024-06-24",
		relatedProducts: ["TDS 标准中心", "Cloudera Data Catalog"],
		topic: "标准管理",
		metricValues: ["1,980", "8", "92%"],
		highlights: [
			{
				title: "标准全景视图",
				description: "展示标准类型、生命周期、引用关系等全景信息。",
				tags: ["标准体系", "引用分析"],
			},
			{ title: "多角色协作", description: "按制定、复核、执行角色划分权限，保障流程透明。" },
			{ title: "标准执行监控", description: "结合质量中心，统计标准执行情况与违规明细。" },
			{ title: "跨域对齐机制", description: "引入对齐议题机制，解决跨部门标准冲突。" },
		],
		insightTopic: "标准管理",
	},
	{
		key: "standard-maintenance",
		title: "标准维护",
		summary: "实现模板导入、批量维护、版本冻结与对比。",
		description: "借助星环标准维护工具，结合 Cloudera 元数据 API，支持标准批量导入、字段变更对比、变更记录追踪。",
		owner: "标准运维组",
		stage: "运营",
		lastUpdated: "2024-06-19",
		relatedProducts: ["TDS 标准维护工具", "Cloudera Atlas API"],
		topic: "标准维护",
		metricValues: ["860", "6", "94%"],
		highlights: [
			{ title: "模板批量导入", description: "支持 Excel/JSON 模板快速导入标准。", tags: ["批量导入", "自动化"] },
			{ title: "多版本对比", description: "自动生成差异报告，支持图表展示。" },
			{ title: "变更影响预估", description: "预估标准调整对模型、数据集的影响范围。" },
			{ title: "运维自动提醒", description: "结合日历与通知，提醒到期复核与审批。" },
		],
		insightTopic: "标准维护",
	},
	{
		key: "standard-alignment",
		title: "标准对齐与评审",
		summary: "跨模型、跨系统标准对齐机制，支持冲突检测与协同决策。",
		description: "结合 Cloudera Atlas 血缘、星环标准冲突检测能力，形成对齐议题、评审决策、落地追踪一体化流程。",
		owner: "标准评审委员会",
		stage: "规划",
		lastUpdated: "2024-06-22",
		relatedProducts: ["Cloudera Atlas", "TDS 标准对齐"],
		topic: "标准对齐",
		metricValues: ["420", "5", "71%"],
		highlights: [
			{
				title: "冲突检测引擎",
				description: "比对字段口径、类型、约束，识别冲突并给出建议。",
				tags: ["冲突检测", "评审"],
			},
			{ title: "对齐议题看板", description: "看板展示对齐议题状态、责任人、决策结论。" },
			{ title: "会议与纪要沉淀", description: "沉淀历史决策与参考案例，支持检索复用。" },
			{ title: "落地追踪", description: "自动关联任务、数据集、流程，跟踪对齐落实情况。" },
		],
		insightTopic: "标准对齐",
	},
];

const modelingStandards = createSection("modelingStandards", modelingDefinitions);
const catalogDefinitions: FeatureDefinition[] = [
	{
		key: "catalog-design",
		title: "目录梳理",
		summary: "支持主题、域、业务场景多入口梳理数据目录。",
		description:
			"对标 Cloudera Data Catalog 与星环目录规划能力，支持批量导入、主题策划、智能分词、交叉引用，形成初版目录蓝图。",
		owner: "目录策划组",
		stage: "建设",
		lastUpdated: "2024-06-17",
		relatedProducts: ["Cloudera Data Catalog", "TDS 目录中心"],
		topic: "目录梳理",
		metricValues: ["6,820", "13", "83%"],
		highlights: [
			{ title: "多源导入", description: "支持 Excel、API、TDS 采集等方式导入目录。", tags: ["多源导入", "自动分级"] },
			{ title: "主题策划向导", description: "按行业场景提供目录策划模板。" },
			{ title: "引用关系梳理", description: "基于血缘自动识别目录间引用。" },
			{ title: "目录健康评分", description: "结合完善度、更新频率打分。" },
		],
	},
	{
		key: "onboarding",
		title: "资源纳管",
		summary: "统一纳管多源数据，支持接入、检验、同步一体化。",
		description:
			"融合 Cloudera Replication Manager 与星环采集调度平台，实现纳管申请、采集配置、质量校验、上线审批闭环。",
		owner: "采集运维中心",
		stage: "运营",
		lastUpdated: "2024-06-25",
		relatedProducts: ["Cloudera Replication Manager", "TDS 采集调度"],
		topic: "资源纳管",
		metricValues: ["9,540", "10", "89%"],
		highlights: [
			{ title: "接入审批联动", description: "从接入申请到上线审批全过程透明化。", tags: ["接入", "审批"] },
			{ title: "采集模式市场", description: "沉淀常用采集模式，快速复用。" },
			{ title: "跨环境同步", description: "支持开发、测试、生产多环境同步策略。" },
			{ title: "纳管质检", description: "对接质量平台，接入即检验。" },
		],
	},
	{
		key: "tagging",
		title: "标签体系",
		summary: "构建多级标签体系，支撑检索、资产洞察与 AI 训练。",
		description: "结合 Cloudera Data Catalog 标签能力与 TDS 标签中心，支持标签建模、规则打标、自动推荐、批量维护。",
		owner: "标签治理组",
		stage: "建设",
		lastUpdated: "2024-06-23",
		relatedProducts: ["Cloudera Data Catalog", "TDS 标签中心"],
		topic: "标签体系",
		metricValues: ["3,560", "12", "78%"],
		highlights: [
			{ title: "标签字典", description: "提供主题、应用、敏感度多维标签字典。", tags: ["标签字典", "智能推荐"] },
			{ title: "规则与 AI 推荐", description: "结合规则引擎与机器学习自动打标。" },
			{ title: "批量维护工具", description: "支持批量新增、合并、废弃流程。" },
			{ title: "标签应用看板", description: "分析标签在目录、服务、模型中的应用频率。" },
		],
	},
	{
		key: "publishing",
		title: "目录发布",
		summary: "目录上线审批、发布与复核管理，支持共享范围控制。",
		description: "结合星环目录发布流程与 Cloudera 权限模型，实现目录审批、上线公告、共享策略、复核提醒。",
		owner: "数据服务运营部",
		stage: "运营",
		lastUpdated: "2024-06-20",
		relatedProducts: ["TDS 目录发布", "Cloudera Ranger"],
		topic: "目录发布",
		metricValues: ["4,420", "9", "91%"],
		highlights: [
			{ title: "共享范围配置", description: "支持租户、部门、地区等多维共享策略。", tags: ["共享策略", "审批"] },
			{ title: "上线公告中心", description: "自动生成上线公告与变更通知。" },
			{ title: "复核提醒", description: "设置复核周期并自动通知责任人。" },
			{ title: "消费反馈", description: "收集使用反馈，驱动目录优化。" },
		],
	},
	{
		key: "search",
		title: "目录查询",
		summary: "提供多条件检索、过滤、订阅与收藏功能。",
		description: "参考 Cloudera Data Catalog 搜索体验与 TDS 门户能力，支持自然语言、标签、指标、地理维度等综合检索。",
		owner: "自助服务体验组",
		stage: "试运行",
		lastUpdated: "2024-06-29",
		relatedProducts: ["Cloudera Data Catalog", "TDS 门户"],
		topic: "目录查询",
		metricValues: ["182,000", "16", "87%"],
		highlights: [
			{ title: "智能检索", description: "支持拼音、模糊、语义检索与搜索提示。", tags: ["智能检索", "语义搜索"] },
			{ title: "个性化订阅", description: "按主题、标签订阅目录更新，推送消息。" },
			{ title: "收藏与评分", description: "用户可收藏目录并反馈评分。" },
			{ title: "跨域聚合视图", description: "同屏展示多域数据，提升决策效率。" },
		],
	},
	{
		key: "analytics",
		title: "目录统计分析",
		summary: "目录规模、使用行为、治理指标可视化分析。",
		description: "融合 Cloudera Workload XM 与星环运营看板能力，对目录覆盖率、活跃度、访问路径进行全方位分析。",
		owner: "运营分析部",
		stage: "运营",
		lastUpdated: "2024-06-30",
		relatedProducts: ["Cloudera Workload XM", "TDS 运营看板"],
		topic: "目录分析",
		metricValues: ["124,000", "20", "89%"],
		highlights: [
			{ title: "活跃度洞察", description: "统计访问、下载、API 调用等指标。", tags: ["活跃度", "洞察"] },
			{ title: "治理指标趋势", description: "跟踪目录完善度、复核完成率、告警处理率。" },
			{ title: "热点资产识别", description: "结合热度排名识别高价值资产。" },
			{ title: "运营任务闭环", description: "生成运营任务并追踪完成情况。" },
		],
	},
];

const catalogCuration = createSection("catalogCuration", catalogDefinitions);
const integrationDefinitions: FeatureDefinition[] = [
	{
		key: "access",
		title: "接入管理",
		summary: "统一接入流程，支持多源数据接入、评估与安全校验。",
		description:
			"借鉴 Cloudera Flow Management 与星环数据接入中心，实现接入申请、源系统评估、网络连通、认证、加密全流程。",
		owner: "数据接入办",
		stage: "建设",
		lastUpdated: "2024-06-28",
		relatedProducts: ["Cloudera Flow Management", "TDS 接入中心"],
		topic: "接入管理",
		metricValues: ["1,240", "18", "76%"],
		highlights: [
			{ title: "接入工单流", description: "自动生成接入工单，跟踪审批与执行。", tags: ["工单", "审批"] },
			{ title: "源系统能力评估", description: "提供评估模板，识别安全与性能风险。" },
			{ title: "接入自动化", description: "预置采集模板，快速完成接入配置。" },
			{ title: "安全校验", description: "集成 DLP、脱敏策略，保障数据安全。" },
		],
		risks: [
			{
				name: "接入配置遗漏",
				severity: "中",
				description: "个别源系统未覆盖全量表，需补齐配置。",
				mitigation: "引入自动对账与提醒。",
				owner: "数据接入办",
			},
		],
	},
	{
		key: "synchronization",
		title: "同步调度",
		summary: "支持批量、实时、增量等同步策略，统一调度监控。",
		description: "融合 Cloudera Replication Manager、NiFi Flow 与 TDS 调度编排，实现跨平台同步、自动扩缩容、链路监控。",
		owner: "调度指挥中心",
		stage: "运营",
		lastUpdated: "2024-06-27",
		relatedProducts: ["Cloudera Replication Manager", "TDS 调度编排"],
		topic: "同步调度",
		metricValues: ["3,460", "22", "88%"],
		highlights: [
			{ title: "混合云同步", description: "支持本地、云端双向同步，按需调度。", tags: ["混合云", "跨平台"] },
			{ title: "动态资源分配", description: "按作业 SLA 自动扩缩容。" },
			{ title: "链路健康监测", description: "监控延迟、吞吐、重试次数。" },
			{ title: "任务工单闭环", description: "异常自动生成工单并分派。" },
		],
	},
	{
		key: "exchange",
		title: "交换通道",
		summary: "跨部门、跨区域数据交换链路管理与传输监控。",
		description: "借鉴 Cloudera Data Hub 共享机制与 TDS 交换总线，提供交换通道编排、带宽监控、报文校验、审计追踪。",
		owner: "交换管理中心",
		stage: "建设",
		lastUpdated: "2024-06-21",
		relatedProducts: ["Cloudera Data Hub", "TDS 数据交换"],
		topic: "交换通道",
		metricValues: ["860", "14", "82%"],
		highlights: [
			{ title: "通道拓扑", description: "绘制跨地区、跨部门通道拓扑。", tags: ["拓扑", "跨区域"] },
			{ title: "带宽与负载监控", description: "实时监控带宽利用率与错误率。" },
			{ title: "审计追踪", description: "记录交换请求、审批、传输明细。" },
			{ title: "安全合规模块", description: "支持密级校验、脱敏、水印等策略。" },
		],
		risks: [
			{
				name: "链路拥塞",
				severity: "中",
				description: "部分跨区域链路在高峰期出现拥塞。",
				mitigation: "扩展带宽并引入限流策略。",
				owner: "交换管理中心",
			},
		],
	},
	{
		key: "etl",
		title: "ETL 工具与开发平台",
		summary: "提供图形化开发、模板复用、质量校验、发布调度一体化体验。",
		description: "结合 Cloudera Data Engineering 与 TDS DataStudio，支持 SQL/可视化开发、版本管理、调试、发布与运维。",
		owner: "数据工程团队",
		stage: "试运行",
		lastUpdated: "2024-06-26",
		relatedProducts: ["Cloudera Data Engineering", "TDS DataStudio"],
		topic: "ETL 平台",
		metricValues: ["2,460", "25", "85%"],
		highlights: [
			{ title: "图形化设计器", description: "拖拽式开发，内置 80+ 组件。", tags: ["拖拽", "组件库"] },
			{ title: "模板市场", description: "沉淀可复用的行业作业模板。" },
			{ title: "质量校验", description: "发布前自动运行质量校验。" },
			{ title: "调试与运维", description: "支持线上调试、资源查看、日志诊断。" },
		],
	},
];

const dataIntegration = createSection("dataIntegration", integrationDefinitions);
const sharingDefinitions: FeatureDefinition[] = [
	{
		key: "catalog",
		title: "共享目录",
		summary: "维护共享数据清单、共享范围与到期提醒。",
		description: "融合 Cloudera Data Catalog 与 TDS 共享门户，提供共享目录编制、服务等级、到期提醒、消费分析。",
		owner: "共享运营部",
		stage: "运营",
		lastUpdated: "2024-06-24",
		relatedProducts: ["Cloudera Data Catalog", "TDS 共享门户"],
		topic: "共享目录",
		metricValues: ["3,240", "12", "90%"],
		highlights: [
			{ title: "共享等级管理", description: "设置公开、授权、受限等等级。", tags: ["共享等级", "目录"] },
			{ title: "目录到期提醒", description: "自动提醒即将到期的共享目录。" },
			{ title: "消费统计", description: "统计调用量、订阅量、满意度。" },
			{ title: "目录对齐", description: "与资产目录联动，保持一致性。" },
		],
	},
	{
		key: "approval",
		title: "共享审批",
		summary: "共享与交换审批流程、记录、追踪与审计。",
		description: "借鉴 Cloudera SDX 审批与星环权限审批能力，实现共享申请、审批链、合规审查、批复留痕。",
		owner: "审批管理中心",
		stage: "运营",
		lastUpdated: "2024-06-29",
		relatedProducts: ["Cloudera SDX", "TDS 权限审批"],
		topic: "共享审批",
		metricValues: ["1,140", "6", "96%"],
		highlights: [
			{ title: "多级审批链", description: "支持业务、法务、安全多级审批。", tags: ["审批", "合规"] },
			{ title: "智能提示", description: "识别历史审批结论，给出建议。" },
			{ title: "外部合作审批", description: "针对外部共享定制审批模板。" },
			{ title: "审计留痕", description: "全程记录审批信息，支持导出。" },
		],
		risks: [
			{
				name: "审批链路超时",
				severity: "中",
				description: "部分共享审批超过 SLA 72 小时。",
				mitigation: "引入提醒与超时升级机制。",
				owner: "审批管理中心",
			},
			{
				name: "合规条款缺失",
				severity: "高",
				description: "跨境共享审批缺少风控条款。",
				mitigation: "补充跨境审批清单与法律评审。",
				owner: "法务合规部",
			},
		],
	},
	{
		key: "collaboration",
		title: "协同交换",
		summary: "管理跨区域、跨租户的数据交换任务与流转监控。",
		description:
			"结合 Cloudera Shared Data Experience 与 TDS 协同交换模块，实现交换任务协同、状态跟踪、消息通知、反馈收集。",
		owner: "协同运营组",
		stage: "建设",
		lastUpdated: "2024-06-22",
		relatedProducts: ["Cloudera SDX", "TDS 协同交换"],
		topic: "协同交换",
		metricValues: ["680", "8", "74%"],
		highlights: [
			{ title: "任务协同看板", description: "展示交换任务的状态、责任人、剩余时间。", tags: ["协同", "看板"] },
			{ title: "消息通知", description: "支持短信、邮件、平台内消息推送。" },
			{ title: "反馈闭环", description: "收集交换反馈并自动生成改善任务。" },
			{ title: "共享 SLA", description: "按 SLA 跟踪任务完成率。" },
		],
		risks: [
			{
				name: "任务逾期",
				severity: "中",
				description: "跨区域交换存在 12% 逾期率。",
				mitigation: "引入预警与资源协调机制。",
				owner: "协同运营组",
			},
		],
	},
	{
		key: "cross-border",
		title: "跨境传输",
		summary: "跨境数据传输申请、备案、监控与审计管理。",
		description:
			"结合 TDS 跨境传输解决方案与 Cloudera SDX 安全审计，提供跨境数据清单、审批、加密、监控、审计报表功能。",
		owner: "跨境合规办",
		stage: "规划",
		lastUpdated: "2024-06-18",
		relatedProducts: ["TDS 跨境传输", "Cloudera Navigator"],
		topic: "跨境传输",
		metricValues: ["120", "5", "68%"],
		highlights: [
			{ title: "跨境目录管理", description: "维护跨境数据目录与敏感度。", tags: ["跨境", "合规"] },
			{ title: "备案流程", description: "自动生成备案材料并联动监管上报。" },
			{ title: "传输加密与水印", description: "按策略自动加密与打水印。" },
			{ title: "跨境审计", description: "记录传输明细、访问日志、审批意见。" },
		],
		risks: [
			{
				name: "备案审批滞后",
				severity: "高",
				description: "跨境传输备案平均耗时 18 天，影响业务上线。",
				mitigation: "引入并行审批与材料自动生成。",
				owner: "跨境合规办",
			},
			{
				name: "传输链路安全",
				severity: "中",
				description: "部分跨境链路未部署全程加密。",
				mitigation: "补齐加密隧道与访问审计。",
				owner: "安全运维部",
			},
		],
	},
];

const dataSharing = createSection("dataSharing", sharingDefinitions);
const securityDefinitions: FeatureDefinition[] = [
	{
		key: "policy",
		title: "安全策略管理",
		summary: "依据策略配置访问权限与控制措施，保障数据安全。",
		description: "融合 Cloudera Ranger 与星环安全策略中心，支持策略制定、审批、执行、回滚、版本管理。",
		owner: "安全策略组",
		stage: "运营",
		lastUpdated: "2024-06-20",
		relatedProducts: ["Cloudera Ranger", "TDS 安全策略中心"],
		topic: "安全策略",
		metricValues: ["2,340", "14", "93%"],
		highlights: [
			{ title: "策略编排", description: "支持资源、角色、操作、条件组合策略。", tags: ["Ranger", "策略"] },
			{ title: "审批与回滚", description: "策略修改需审批，支持快速回滚。" },
			{ title: "策略模拟", description: "上线前模拟策略影响。" },
			{ title: "策略版本库", description: "保留历史版本，支持差异对比。" },
		],
		risks: [
			{
				name: "策略冗余",
				severity: "中",
				description: "存在重复策略导致维护成本增加。",
				mitigation: "引入策略合并与自动检测。",
				owner: "安全策略组",
			},
		],
	},
	{
		key: "assessment",
		title: "安全评估",
		summary: "开展数据安全评估并输出风险与改进建议。",
		description: "结合星环安全评估模板与 Cloudera Navigator 审计数据，构建评估指标、问卷、证据收集与整改跟踪机制。",
		owner: "安全评估组",
		stage: "规划",
		lastUpdated: "2024-06-18",
		relatedProducts: ["TDS 安全评估", "Cloudera Navigator"],
		topic: "安全评估",
		metricValues: ["420", "9", "71%"],
		highlights: [
			{ title: "评估指标体系", description: "覆盖制度、流程、技术、人员四大维度。", tags: ["评估", "合规"] },
			{ title: "证据收集", description: "支持附件、录屏、日志等证据管理。" },
			{ title: "整改任务", description: "生成整改任务并跟踪进度。" },
			{ title: "评分模型", description: "参考等级保护与跨境要求给出评分。" },
		],
		risks: [
			{
				name: "评估覆盖不足",
				severity: "高",
				description: "部分系统未纳入年度评估计划。",
				mitigation: "扩展评估清单并设定预警。",
				owner: "安全评估组",
			},
			{
				name: "整改滞后",
				severity: "中",
				description: "整改任务平均延期 12 天。",
				mitigation: "引入 SLA 管理与督办机制。",
				owner: "安全治理办",
			},
		],
	},
	{
		key: "monitoring",
		title: "安全监测预警",
		summary: "实时监测安全状态，定位隐患并触发预警。",
		description: "借鉴 Cloudera Observability 与星环安全监控平台，监控访问行为、越权、异常流量，提供告警与响应。",
		owner: "安全运营中心",
		stage: "运营",
		lastUpdated: "2024-06-30",
		relatedProducts: ["Cloudera Observability", "TDS 安全监控"],
		topic: "安全监测",
		metricValues: ["1,620", "17", "88%"],
		highlights: [
			{ title: "统一告警中心", description: "整合平台、数据库、网络、应用告警。", tags: ["告警", "监控"] },
			{ title: "行为分析", description: "利用 UEBA 检测异常访问。" },
			{ title: "自动化响应", description: "结合 SOAR 自动隔离、加锁、通知。" },
			{ title: "联动处置", description: "与安全事件流程、运维工单联动。" },
		],
		risks: [
			{
				name: "告警噪音",
				severity: "中",
				description: "低风险告警占比高，影响处理效率。",
				mitigation: "优化规则，提升告警准确度。",
				owner: "安全运营中心",
			},
		],
	},
	{
		key: "incidents",
		title: "安全事件管理",
		summary: "记录安全事件，支持追溯、处理与经验沉淀。",
		description: "融合 Cloudera Navigator 审计与星环安全事件管理，形成事件记录、调查、处置、复盘四步闭环。",
		owner: "安全事件处理组",
		stage: "建设",
		lastUpdated: "2024-06-19",
		relatedProducts: ["Cloudera Navigator", "TDS 安全事件"],
		topic: "安全事件",
		metricValues: ["128", "4", "82%"],
		highlights: [
			{ title: "事件全景", description: "展示事件来源、影响范围、处理进度。", tags: ["事件", "复盘"] },
			{ title: "调查工具", description: "关联日志、血缘、访问记录。" },
			{ title: "处置流程", description: "支持预案、工单、汇报模板。" },
			{ title: "经验库", description: "沉淀处理经验与最佳实践。" },
		],
		risks: [
			{
				name: "复盘滞后",
				severity: "中",
				description: "复盘报告提交延迟，导致经验积累不足。",
				mitigation: "设定复盘提交 SLA 并纳入考核。",
				owner: "安全事件处理组",
			},
		],
	},
];

const dataSecurity = createSection("dataSecurity", securityDefinitions);
const qualityDefinitions: FeatureDefinition[] = [
	{
		key: "standards",
		title: "质量标准",
		summary: "定义质量标准、指标与责任，形成质量管理体系。",
		description: "结合星环质量管理中心与 Cloudera 质量模型，建立质量标准目录、指标库、责任矩阵。",
		owner: "质量治理组",
		stage: "建设",
		lastUpdated: "2024-06-23",
		relatedProducts: ["TDS 质量管理中心", "Cloudera SDX"],
		topic: "质量标准",
		metricValues: ["580", "9", "86%"],
		highlights: [
			{ title: "质量指标库", description: "覆盖准确性、完整性、一致性、及时性。", tags: ["指标库", "质量标准"] },
			{ title: "责任矩阵", description: "明确质量负责人、管控人、执行人。" },
			{ title: "标准套件", description: "按行业场景提供质量标准套件。" },
			{ title: "评估支撑", description: "质量标准直接驱动评估与整改。" },
		],
	},
	{
		key: "assessment",
		title: "质量评估",
		summary: "对重点数据开展质量评估并生成报告。",
		description: "结合星环质量评估引擎与 Cloudera Data Stewardship，开展定期评估、自动取样、指标计算、报告生成。",
		owner: "质量评估办",
		stage: "运营",
		lastUpdated: "2024-06-28",
		relatedProducts: ["TDS 质量评估", "Cloudera Data Stewardship"],
		topic: "质量评估",
		metricValues: ["1,280", "11", "84%"],
		highlights: [
			{ title: "评估计划", description: "按季度制定评估计划并跟踪执行。", tags: ["评估", "计划"] },
			{ title: "自动取样", description: "按指标要求自动抽样。" },
			{ title: "报告生成", description: "自动生成整改建议与结果。" },
			{ title: "对接治理", description: "与治理任务联动，闭环整改。" },
		],
		risks: [
			{
				name: "样本偏差",
				severity: "中",
				description: "部分评估样本未覆盖长尾数据。",
				mitigation: "引入自动扩样机制并复核。",
				owner: "质量评估办",
			},
		],
	},
	{
		key: "monitoring",
		title: "质量监控",
		summary: "持续监控质量指标，支持告警与可视化分析。",
		description: "对接星环质量监控平台与 Cloudera Observability，构建质量指标看板、自动告警、趋势分析。",
		owner: "质量运营中心",
		stage: "运营",
		lastUpdated: "2024-06-27",
		relatedProducts: ["TDS 质量监控", "Cloudera Observability"],
		topic: "质量监控",
		metricValues: ["2,140", "13", "91%"],
		highlights: [
			{ title: "指标预警", description: "支持阈值、环比、同比多种预警。", tags: ["预警", "指标"] },
			{ title: "监控看板", description: "提供实时、日、周多粒度看板。" },
			{ title: "根因定位", description: "结合血缘自动定位质量异常根因。" },
			{ title: "告警闭环", description: "告警自动生成工单并追踪处理。" },
		],
	},
	{
		key: "improvement",
		title: "质量改进",
		summary: "跟踪整改计划，闭环处理质量问题与优化措施。",
		description: "结合星环质量改进模块与 Cloudera Workload XM 任务管理，实现整改计划、责任分配、进度跟踪、成效评估。",
		owner: "质量改进办",
		stage: "试运行",
		lastUpdated: "2024-06-26",
		relatedProducts: ["TDS 质量改进", "Cloudera Workload XM"],
		topic: "质量改进",
		metricValues: ["460", "7", "79%"],
		highlights: [
			{ title: "整改计划池", description: "维护整改任务池与优先级。", tags: ["整改", "计划"] },
			{ title: "责任与协同", description: "明确责任人、协同人、复核人。" },
			{ title: "成效评估", description: "评估整改完成后的质量提升幅度。" },
			{ title: "经验沉淀", description: "沉淀案例库支撑持续优化。" },
		],
	},
];

const dataQuality = createSection("dataQuality", qualityDefinitions);
const serviceDefinitions: FeatureDefinition[] = [
	{
		key: "catalog",
		title: "数据资源目录服务",
		summary: "面向不同角色提供可视化目录服务并按需发布。",
		description:
			"结合 Cloudera Data Catalog 门户与星环服务编排能力，为开发、业务、审计等角色提供定制化目录视图与发布流程。",
		owner: "服务产品部",
		stage: "运营",
		lastUpdated: "2024-06-28",
		relatedProducts: ["Cloudera Data Catalog", "TDS 服务门户"],
		topic: "目录服务",
		metricValues: ["6,540", "18", "88%"],
		highlights: [
			{ title: "角色视图", description: "按角色展示不同维度的目录与服务。", tags: ["角色视图", "自助"] },
			{ title: "自助发布", description: "支持申请、审核、发布一体化。" },
			{ title: "目录订阅", description: "提供订阅、收藏、评价功能。" },
			{ title: "多语言支持", description: "支持中文、英文界面切换。" },
		],
	},
	{
		key: "management",
		title: "数据服务管理",
		summary: "构建统一服务管理体系，规范制定、发布与下发。",
		description: "融合 Cloudera API Catalog 与星环服务管理平台，提供服务注册、版本管理、审批、退役等生命周期治理。",
		owner: "数据服务管理中心",
		stage: "建设",
		lastUpdated: "2024-06-26",
		relatedProducts: ["Cloudera API Catalog", "TDS 服务管理"],
		topic: "服务管理",
		metricValues: ["820", "14", "82%"],
		highlights: [
			{ title: "服务注册", description: "统一注册 API、文件、报表等多类型服务。", tags: ["注册", "多类型"] },
			{ title: "版本治理", description: "支持草稿、灰度、正式多版本管理。" },
			{ title: "服务授权", description: "集成审批流程控制服务开通。" },
			{ title: "退役策略", description: "退役前自动通知订阅方并提供替代方案。" },
		],
	},
	{
		key: "monitoring",
		title: "服务运行监控",
		summary: "可视化展示服务运行状态，支持监控、预警与分析。",
		description: "借鉴 Cloudera Workload XM 与星环服务监控平台，提供服务调用量、性能、错误率、SLA 达成率的实时看板。",
		owner: "服务运营中心",
		stage: "运营",
		lastUpdated: "2024-06-29",
		relatedProducts: ["Cloudera Workload XM", "TDS 服务监控"],
		topic: "服务监控",
		metricValues: ["18.6 万", "22", "92%"],
		highlights: [
			{ title: "性能趋势", description: "监控延迟、吞吐等关键指标。", tags: ["性能", "趋势"] },
			{ title: "异常预警", description: "异常自动告警并生成运维工单。" },
			{ title: "SLA 追踪", description: "按服务等级统计 SLA 达成率。" },
			{ title: "资源利用率", description: "关联集群、容器资源使用情况。" },
		],
	},
	{
		key: "analytics",
		title: "调用分析",
		summary: "统计 API 调用与订阅情况，提供多维分析。",
		description: "结合 Cloudera Observability 与星环运营分析能力，分析调用量、失败率、订阅趋势、业务收益贡献。",
		owner: "服务分析组",
		stage: "运营",
		lastUpdated: "2024-06-27",
		relatedProducts: ["Cloudera Observability", "TDS 运营分析"],
		topic: "服务分析",
		metricValues: ["4.3 亿", "26", "85%"],
		highlights: [
			{ title: "渠道分析", description: "按渠道、终端统计调用与订阅。", tags: ["渠道", "订阅"] },
			{ title: "收益评估", description: "结合成本收益模型分析服务价值。" },
			{ title: "容量预测", description: "预测未来资源需求与扩容计划。" },
			{ title: "客户画像", description: "识别高价值订阅客户群体。" },
		],
	},
	{
		key: "operations",
		title: "服务运维",
		summary: "支持 API 监控、版本管理、上下线与运维调度。",
		description: "融合星环运维调度中心与 Cloudera 管控能力，提供服务上线 Checklist、灰度策略、变更窗口、回滚预案。",
		owner: "服务运维部",
		stage: "建设",
		lastUpdated: "2024-06-25",
		relatedProducts: ["TDS 运维调度", "Cloudera Manager"],
		topic: "服务运维",
		metricValues: ["1,120", "19", "81%"],
		highlights: [
			{ title: "运维流程", description: "运维流程模板化，保障操作一致性。", tags: ["流程", "模板"] },
			{ title: "灰度策略", description: "支持按租户、区域灰度发布。" },
			{ title: "变更窗口", description: "自动规划变更窗口并通知订阅方。" },
			{ title: "应急预案", description: "沉淀回滚与应急方案，确保稳定。" },
		],
	},
	{
		key: "api-formats",
		title: "标准化输出",
		summary: "按 JSON、XML、CSV 等标准格式对外提供数据服务。",
		description: "参考 Cloudera Data APIs 与星环数据服务工厂，支持多格式、版本化、字段映射、脱敏等标准输出能力。",
		owner: "标准输出组",
		stage: "运营",
		lastUpdated: "2024-06-23",
		relatedProducts: ["Cloudera Data API", "TDS 数据服务工厂"],
		topic: "标准输出",
		metricValues: ["2,840", "21", "93%"],
		highlights: [
			{ title: "格式模板", description: "提供 JSON、XML、CSV 等模板。", tags: ["标准格式", "模板"] },
			{ title: "字段映射", description: "配置跨系统字段映射关系。" },
			{ title: "脱敏策略", description: "按敏感度配置脱敏、加密、水印。" },
			{ title: "接口仿真", description: "支持沙箱环境进行接口仿真。" },
		],
	},
	{
		key: "export",
		title: "服务导出",
		summary: "支持 Excel、PDF、Word 等多格式导出与自助组合输出。",
		description: "结合星环导出工具与 Cloudera 可视化能力，实现服务结果导出、批量调度、订阅推送、自助组合。",
		owner: "自助服务运营部",
		stage: "试运行",
		lastUpdated: "2024-06-24",
		relatedProducts: ["TDS 导出工具", "Cloudera Viz"],
		topic: "服务导出",
		metricValues: ["720", "9", "87%"],
		highlights: [
			{ title: "多格式导出", description: "支持 Excel、PDF、Word、CSV。", tags: ["多格式", "导出"] },
			{ title: "调度推送", description: "按频率自动导出并推送订阅方。" },
			{ title: "自助组合", description: "用户可选字段、排序、过滤生成结果。" },
			{ title: "留痕审计", description: "导出记录留痕，满足审计要求。" },
		],
	},
];

const serviceOperations = createSection("serviceOperations", serviceDefinitions);
export const PORTAL_FEATURES: PortalFeatureMap = {
	assetPlanning,
	modelingStandards,
	catalogCuration,
	dataIntegration,
	dataSharing,
	dataSecurity,
	dataQuality,
	serviceOperations,
};
