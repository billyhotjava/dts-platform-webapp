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
				descriptionKey: "sys.nav.portal.overviewPlatformCaption",
			},
			{
				key: "tasks",
				path: "tasks",
				titleKey: "sys.nav.portal.overviewTasks",
				descriptionKey: "sys.nav.portal.overviewTasksCaption",
			},
			{
				key: "shortcuts",
				path: "shortcuts",
				titleKey: "sys.nav.portal.overviewShortcuts",
				descriptionKey: "sys.nav.portal.overviewShortcutsCaption",
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
				descriptionKey: "sys.nav.portal.catalogDomainsCaption",
			},
			{
				key: "datasets",
				path: "datasets",
				titleKey: "sys.nav.portal.catalogDatasets",
				descriptionKey: "sys.nav.portal.catalogDatasetsCaption",
			},
			{
				key: "dictionary",
				path: "dictionary",
				titleKey: "sys.nav.portal.catalogDictionary",
				descriptionKey: "sys.nav.portal.catalogDictionaryCaption",
			},
			{
				key: "tags",
				path: "tags",
				titleKey: "sys.nav.portal.catalogTags",
				descriptionKey: "sys.nav.portal.catalogTagsCaption",
			},
			{
				key: "classification",
				path: "classification",
				titleKey: "sys.nav.portal.catalogClassification",
				descriptionKey: "sys.nav.portal.catalogClassificationCaption",
			},
			{
				key: "lineage",
				path: "lineage",
				titleKey: "sys.nav.portal.catalogLineage",
				descriptionKey: "sys.nav.portal.catalogLineageCaption",
			},
			{
				key: "quality",
				path: "quality",
				titleKey: "sys.nav.portal.catalogQuality",
				descriptionKey: "sys.nav.portal.catalogQualityCaption",
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
				descriptionKey: "sys.nav.portal.exploreWorkbenchCaption",
			},
			{
				key: "preview",
				path: "preview",
				titleKey: "sys.nav.portal.explorePreview",
				descriptionKey: "sys.nav.portal.explorePreviewCaption",
			},
			{
				key: "savedQueries",
				path: "saved-queries",
				titleKey: "sys.nav.portal.exploreSavedQueries",
				descriptionKey: "sys.nav.portal.exploreSavedQueriesCaption",
			},
			{
				key: "sharing",
				path: "sharing",
				titleKey: "sys.nav.portal.exploreSharing",
				descriptionKey: "sys.nav.portal.exploreSharingCaption",
			},
			{
				key: "export",
				path: "export",
				titleKey: "sys.nav.portal.exploreExport",
				descriptionKey: "sys.nav.portal.exploreExportCaption",
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
				descriptionKey: "sys.nav.portal.servicesApiCaption",
			},
			{
				key: "proxy",
				path: "proxy",
				titleKey: "sys.nav.portal.servicesProxy",
				descriptionKey: "sys.nav.portal.servicesProxyCaption",
			},
			{
				key: "products",
				path: "products",
				titleKey: "sys.nav.portal.servicesProducts",
				descriptionKey: "sys.nav.portal.servicesProductsCaption",
			},
			{
				key: "tokens",
				path: "tokens",
				titleKey: "sys.nav.portal.servicesTokens",
				descriptionKey: "sys.nav.portal.servicesTokensCaption",
			},
			{
				key: "quotas",
				path: "quotas",
				titleKey: "sys.nav.portal.servicesQuotas",
				descriptionKey: "sys.nav.portal.servicesQuotasCaption",
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
				descriptionKey: "sys.nav.portal.governanceRulesCaption",
			},
			{
				key: "tasks",
				path: "tasks",
				titleKey: "sys.nav.portal.governanceTasks",
				descriptionKey: "sys.nav.portal.governanceTasksCaption",
			},
			{
				key: "masking",
				path: "masking",
				titleKey: "sys.nav.portal.governanceMasking",
				descriptionKey: "sys.nav.portal.governanceMaskingCaption",
			},
			{
				key: "compliance",
				path: "compliance",
				titleKey: "sys.nav.portal.governanceCompliance",
				descriptionKey: "sys.nav.portal.governanceComplianceCaption",
			},
			{
				key: "impact",
				path: "impact",
				titleKey: "sys.nav.portal.governanceImpact",
				descriptionKey: "sys.nav.portal.governanceImpactCaption",
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
				descriptionKey: "sys.nav.portal.iamClassificationCaption",
			},
			{
				key: "authorization",
				path: "authorization",
				titleKey: "sys.nav.portal.iamAuthorization",
				descriptionKey: "sys.nav.portal.iamAuthorizationCaption",
			},
			{
				key: "simulation",
				path: "simulation",
				titleKey: "sys.nav.portal.iamSimulation",
				descriptionKey: "sys.nav.portal.iamSimulationCaption",
			},
			{
				key: "requests",
				path: "requests",
				titleKey: "sys.nav.portal.iamRequests",
				descriptionKey: "sys.nav.portal.iamRequestsCaption",
			},
		],
	},
	{
		key: "audit",
		path: "audit",
		icon: "solar:document-text-bold-duotone",
		titleKey: "sys.nav.portal.audit",
		children: [
			{
				key: "access",
				path: "access",
				titleKey: "sys.nav.portal.auditAccess",
				descriptionKey: "sys.nav.portal.auditAccessCaption",
			},
			{
				key: "exports",
				path: "exports",
				titleKey: "sys.nav.portal.auditExports",
				descriptionKey: "sys.nav.portal.auditExportsCaption",
			},
			{
				key: "reports",
				path: "reports",
				titleKey: "sys.nav.portal.auditReports",
				descriptionKey: "sys.nav.portal.auditReportsCaption",
			},
			{
				key: "rules",
				path: "rules",
				titleKey: "sys.nav.portal.auditRules",
				descriptionKey: "sys.nav.portal.auditRulesCaption",
			},
		],
	},
	{
		key: "observability",
		path: "observability",
		icon: "solar:monitoring-bold-duotone",
		titleKey: "sys.nav.portal.observability",
		children: [
			{
				key: "performance",
				path: "performance",
				titleKey: "sys.nav.portal.observabilityPerformance",
				descriptionKey: "sys.nav.portal.observabilityPerformanceCaption",
			},
			{
				key: "health",
				path: "health",
				titleKey: "sys.nav.portal.observabilityHealth",
				descriptionKey: "sys.nav.portal.observabilityHealthCaption",
			},
			{
				key: "usage",
				path: "usage",
				titleKey: "sys.nav.portal.observabilityUsage",
				descriptionKey: "sys.nav.portal.observabilityUsageCaption",
			},
		],
	},
	{
		key: "integrations",
		path: "integrations",
		icon: "solar:plug-circle-bold-duotone",
		titleKey: "sys.nav.portal.integrations",
		children: [
			{
				key: "tds",
				path: "tds",
				titleKey: "sys.nav.portal.integrationsTds",
				descriptionKey: "sys.nav.portal.integrationsTdsCaption",
			},
			{
				key: "rds",
				path: "rds",
				titleKey: "sys.nav.portal.integrationsRds",
				descriptionKey: "sys.nav.portal.integrationsRdsCaption",
			},
			{
				key: "bi",
				path: "bi",
				titleKey: "sys.nav.portal.integrationsBi",
				descriptionKey: "sys.nav.portal.integrationsBiCaption",
			},
			{
				key: "connections",
				path: "connections",
				titleKey: "sys.nav.portal.integrationsConnections",
				descriptionKey: "sys.nav.portal.integrationsConnectionsCaption",
			},
			{
				key: "identity",
				path: "identity",
				titleKey: "sys.nav.portal.integrationsIdentity",
				descriptionKey: "sys.nav.portal.integrationsIdentityCaption",
			},
			{
				key: "catalog",
				path: "catalog",
				titleKey: "sys.nav.portal.integrationsCatalog",
				descriptionKey: "sys.nav.portal.integrationsCatalogCaption",
			},
			{
				key: "audit",
				path: "audit",
				titleKey: "sys.nav.portal.integrationsAudit",
				descriptionKey: "sys.nav.portal.integrationsAuditCaption",
			},
		],
	},
	{
		key: "toolkit",
		path: "toolkit",
		icon: "solar:tools-bold-duotone",
		titleKey: "sys.nav.portal.toolkit",
		children: [
			{
				key: "sdk",
				path: "sdk",
				titleKey: "sys.nav.portal.toolkitSdk",
				descriptionKey: "sys.nav.portal.toolkitSdkCaption",
			},
			{
				key: "docs",
				path: "docs",
				titleKey: "sys.nav.portal.toolkitDocs",
				descriptionKey: "sys.nav.portal.toolkitDocsCaption",
			},
			{
				key: "announcements",
				path: "announcements",
				titleKey: "sys.nav.portal.toolkitAnnouncements",
				descriptionKey: "sys.nav.portal.toolkitAnnouncementsCaption",
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
				descriptionKey: "sys.nav.portal.settingsPreferencesCaption",
			},
			{
				key: "notifications",
				path: "notifications",
				titleKey: "sys.nav.portal.settingsNotifications",
				descriptionKey: "sys.nav.portal.settingsNotificationsCaption",
			},
			{
				key: "gateway",
				path: "gateway",
				titleKey: "sys.nav.portal.settingsGateway",
				descriptionKey: "sys.nav.portal.settingsGatewayCaption",
			},
		],
	},
];

const firstSection = PORTAL_NAV_SECTIONS[0];
const firstChild = firstSection.children[0];

export const DEFAULT_PORTAL_ROUTE = `/${firstSection.path}/${firstChild.path}`;
