export interface PortalNavEntryDefinition {
	key: string;
	/** Route path segment relative to its parent section */
	path: string;
	/** i18n key for displaying the menu label */
	titleKey: string;
	/** Optional i18n key describing the entry */
	descriptionKey?: string;
}

export interface PortalNavSectionDefinition {
	key: string;
	/** Route path segment for the top-level section */
	path: string;
	/** Icon name understood by the <Icon /> component */
	icon: string;
	/** i18n key for the section label */
	titleKey: string;
	/** Nested menu entries rendered in the sidebar */
	children: PortalNavEntryDefinition[];
}

export const PORTAL_NAV_SECTIONS: PortalNavSectionDefinition[] = [
	{
		key: "overview",
		path: "overview",
		icon: "solar:chart-square-bold-duotone",
		titleKey: "sys.nav.portal.overview",
		children: [
			{
				key: "platform",
				path: "platform",
				titleKey: "sys.nav.portal.overviewPlatform",
			},
			{
				key: "tasks",
				path: "tasks",
				titleKey: "sys.nav.portal.overviewTasks",
			},
			{
				key: "shortcuts",
				path: "shortcuts",
				titleKey: "sys.nav.portal.overviewShortcuts",
			},
		],
	},
	{
		key: "catalog",
		path: "catalog",
		icon: "solar:book-bold-duotone",
		titleKey: "sys.nav.portal.catalog",
		children: [
			{
				key: "domains",
				path: "domains",
				titleKey: "sys.nav.portal.catalogDomains",
			},
			{
				key: "datasets",
				path: "datasets",
				titleKey: "sys.nav.portal.catalogDatasets",
			},
			{
				key: "dictionary",
				path: "dictionary",
				titleKey: "sys.nav.portal.catalogDictionary",
			},
			{
				key: "tags",
				path: "tags",
				titleKey: "sys.nav.portal.catalogTags",
			},
			{
				key: "classification",
				path: "classification",
				titleKey: "sys.nav.portal.catalogClassification",
			},
			{
				key: "lineage",
				path: "lineage",
				titleKey: "sys.nav.portal.catalogLineage",
			},
			{
				key: "quality",
				path: "quality",
				titleKey: "sys.nav.portal.catalogQuality",
			},
		],
	},
	{
		key: "modeling",
		path: "modeling",
		icon: "solar:documents-bold-duotone",
		titleKey: "sys.nav.portal.modeling",
		children: [
			{
				key: "standards",
				path: "standards",
				titleKey: "sys.nav.portal.modelingStandards",
			},
		],
	},
	{
		key: "governance",
		path: "governance",
		icon: "solar:shield-check-bold-duotone",
		titleKey: "sys.nav.portal.governance",
		children: [
			{
				key: "rules",
				path: "rules",
				titleKey: "sys.nav.portal.governanceRules",
			},
			{
				key: "tasks",
				path: "tasks",
				titleKey: "sys.nav.portal.governanceTasks",
			},
			{
				key: "masking",
				path: "masking",
				titleKey: "sys.nav.portal.governanceMasking",
			},
			{
				key: "compliance",
				path: "compliance",
				titleKey: "sys.nav.portal.governanceCompliance",
			},
			{
				key: "impact",
				path: "impact",
				titleKey: "sys.nav.portal.governanceImpact",
			},
		],
	},
	{
		key: "explore",
		path: "explore",
		icon: "solar:compass-bold-duotone",
		titleKey: "sys.nav.portal.explore",
		children: [
			{
				key: "workbench",
				path: "workbench",
				titleKey: "sys.nav.portal.exploreWorkbench",
			},
			{
				key: "preview",
				path: "preview",
				titleKey: "sys.nav.portal.explorePreview",
			},
			{
				key: "savedQueries",
				path: "saved-queries",
				titleKey: "sys.nav.portal.exploreSavedQueries",
			},
			{
				key: "sharing",
				path: "sharing",
				titleKey: "sys.nav.portal.exploreSharing",
			},
			{
				key: "export",
				path: "export",
				titleKey: "sys.nav.portal.exploreExport",
			},
		],
	},
	{
		key: "visualization",
		path: "visualization",
		icon: "solar:pie-chart-bold-duotone",
		titleKey: "sys.nav.portal.visualization",
		children: [
			{
				key: "reports",
				path: "reports",
				titleKey: "sys.nav.portal.visualizationReports",
			},
		],
	},
	{
		key: "services",
		path: "services",
		icon: "solar:server-bold-duotone",
		titleKey: "sys.nav.portal.services",
		children: [
			{
				key: "api",
				path: "api",
				titleKey: "sys.nav.portal.servicesApi",
			},
			{
				key: "proxy",
				path: "proxy",
				titleKey: "sys.nav.portal.servicesProxy",
			},
			{
				key: "products",
				path: "products",
				titleKey: "sys.nav.portal.servicesProducts",
			},
			{
				key: "tokens",
				path: "tokens",
				titleKey: "sys.nav.portal.servicesTokens",
			},
			{
				key: "quotas",
				path: "quotas",
				titleKey: "sys.nav.portal.servicesQuotas",
			},
		],
	},
	{
		key: "iam",
		path: "iam",
		icon: "solar:key-minimalistic-bold-duotone",
		titleKey: "sys.nav.portal.iam",
		children: [
			{
				key: "classification",
				path: "classification",
				titleKey: "sys.nav.portal.iamClassification",
			},
			{
				key: "authorization",
				path: "authorization",
				titleKey: "sys.nav.portal.iamAuthorization",
			},
			{
				key: "simulation",
				path: "simulation",
				titleKey: "sys.nav.portal.iamSimulation",
			},
			{
				key: "requests",
				path: "requests",
				titleKey: "sys.nav.portal.iamRequests",
			},
		],
	},
	{
		key: "settings",
		path: "settings",
		icon: "solar:settings-bold-duotone",
		titleKey: "sys.nav.portal.settings",
		children: [
			{
				key: "preferences",
				path: "preferences",
				titleKey: "sys.nav.portal.settingsPreferences",
			},
			{
				key: "notifications",
				path: "notifications",
				titleKey: "sys.nav.portal.settingsNotifications",
			},
			{
				key: "gateway",
				path: "gateway",
				titleKey: "sys.nav.portal.settingsGateway",
			},
		],
	},
];

const firstSection = PORTAL_NAV_SECTIONS[0];
const firstChild = firstSection.children[0];

export const DEFAULT_PORTAL_ROUTE = `/${firstSection.path}/${firstChild.path}`;
