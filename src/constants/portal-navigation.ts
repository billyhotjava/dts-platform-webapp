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
		key: "assetPlanning",
		path: "asset-planning",
		icon: "solar:target-bold-duotone",
		titleKey: "sys.nav.portal.assetPlanning",
		children: [
			{
				key: "segmentation",
				path: "segmentation",
				titleKey: "sys.nav.portal.assetPlanningSegmentation",
				descriptionKey: "sys.nav.portal.assetPlanningSegmentationCaption",
			},
			{
				key: "lifecycle",
				path: "lifecycle",
				titleKey: "sys.nav.portal.assetPlanningLifecycle",
				descriptionKey: "sys.nav.portal.assetPlanningLifecycleCaption",
			},
			{
				key: "assessment",
				path: "assessment",
				titleKey: "sys.nav.portal.assetPlanningAssessment",
				descriptionKey: "sys.nav.portal.assetPlanningAssessmentCaption",
			},
			{
				key: "map",
				path: "map",
				titleKey: "sys.nav.portal.assetPlanningMap",
				descriptionKey: "sys.nav.portal.assetPlanningMapCaption",
			},
		],
	},
	{
		key: "modelingStandards",
		path: "modeling-standards",
		icon: "solar:widget-5-bold-duotone",
		titleKey: "sys.nav.portal.modelingStandards",
		children: [
			{
				key: "modeling",
				path: "modeling",
				titleKey: "sys.nav.portal.modelingStandardsModeling",
				descriptionKey: "sys.nav.portal.modelingStandardsModelingCaption",
			},
			{
				key: "standardManagement",
				path: "standard-management",
				titleKey: "sys.nav.portal.modelingStandardsManagement",
				descriptionKey: "sys.nav.portal.modelingStandardsManagementCaption",
			},
			{
				key: "standardMaintenance",
				path: "standard-maintenance",
				titleKey: "sys.nav.portal.modelingStandardsMaintenance",
				descriptionKey: "sys.nav.portal.modelingStandardsMaintenanceCaption",
			},
			{
				key: "standardAlignment",
				path: "standard-alignment",
				titleKey: "sys.nav.portal.modelingStandardsAlignment",
				descriptionKey: "sys.nav.portal.modelingStandardsAlignmentCaption",
			},
		],
	},
	{
		key: "catalogCuration",
		path: "catalog-curation",
		icon: "solar:book-bold-duotone",
		titleKey: "sys.nav.portal.catalogCuration",
		children: [
			{
				key: "catalogDesign",
				path: "catalog-design",
				titleKey: "sys.nav.portal.catalogCurationDesign",
				descriptionKey: "sys.nav.portal.catalogCurationDesignCaption",
			},
			{
				key: "onboarding",
				path: "onboarding",
				titleKey: "sys.nav.portal.catalogCurationOnboarding",
				descriptionKey: "sys.nav.portal.catalogCurationOnboardingCaption",
			},
			{
				key: "tagging",
				path: "tagging",
				titleKey: "sys.nav.portal.catalogCurationTagging",
				descriptionKey: "sys.nav.portal.catalogCurationTaggingCaption",
			},
			{
				key: "publishing",
				path: "publishing",
				titleKey: "sys.nav.portal.catalogCurationPublishing",
				descriptionKey: "sys.nav.portal.catalogCurationPublishingCaption",
			},
			{
				key: "search",
				path: "search",
				titleKey: "sys.nav.portal.catalogCurationSearch",
				descriptionKey: "sys.nav.portal.catalogCurationSearchCaption",
			},
			{
				key: "analytics",
				path: "analytics",
				titleKey: "sys.nav.portal.catalogCurationAnalytics",
				descriptionKey: "sys.nav.portal.catalogCurationAnalyticsCaption",
			},
		],
	},
	{
		key: "dataIntegration",
		path: "data-integration",
		icon: "solar:transfer-horizontal-bold-duotone",
		titleKey: "sys.nav.portal.dataIntegration",
		children: [
			{
				key: "access",
				path: "access",
				titleKey: "sys.nav.portal.dataIntegrationAccess",
				descriptionKey: "sys.nav.portal.dataIntegrationAccessCaption",
			},
			{
				key: "synchronization",
				path: "synchronization",
				titleKey: "sys.nav.portal.dataIntegrationSynchronization",
				descriptionKey: "sys.nav.portal.dataIntegrationSynchronizationCaption",
			},
			{
				key: "exchange",
				path: "exchange",
				titleKey: "sys.nav.portal.dataIntegrationExchange",
				descriptionKey: "sys.nav.portal.dataIntegrationExchangeCaption",
			},
			{
				key: "etl",
				path: "etl",
				titleKey: "sys.nav.portal.dataIntegrationEtl",
				descriptionKey: "sys.nav.portal.dataIntegrationEtlCaption",
			},
		],
	},
	{
		key: "dataSharing",
		path: "data-sharing",
		icon: "solar:share-circle-bold-duotone",
		titleKey: "sys.nav.portal.dataSharing",
		children: [
			{
				key: "catalog",
				path: "catalog",
				titleKey: "sys.nav.portal.dataSharingCatalog",
				descriptionKey: "sys.nav.portal.dataSharingCatalogCaption",
			},
			{
				key: "approval",
				path: "approval",
				titleKey: "sys.nav.portal.dataSharingApproval",
				descriptionKey: "sys.nav.portal.dataSharingApprovalCaption",
			},
			{
				key: "collaboration",
				path: "collaboration",
				titleKey: "sys.nav.portal.dataSharingCollaboration",
				descriptionKey: "sys.nav.portal.dataSharingCollaborationCaption",
			},
			{
				key: "crossBorder",
				path: "cross-border",
				titleKey: "sys.nav.portal.dataSharingCrossBorder",
				descriptionKey: "sys.nav.portal.dataSharingCrossBorderCaption",
			},
		],
	},
	{
		key: "dataSecurity",
		path: "data-security",
		icon: "solar:shield-keyhole-bold-duotone",
		titleKey: "sys.nav.portal.dataSecurity",
		children: [
			{
				key: "policy",
				path: "policy",
				titleKey: "sys.nav.portal.dataSecurityPolicy",
				descriptionKey: "sys.nav.portal.dataSecurityPolicyCaption",
			},
			{
				key: "assessment",
				path: "assessment",
				titleKey: "sys.nav.portal.dataSecurityAssessment",
				descriptionKey: "sys.nav.portal.dataSecurityAssessmentCaption",
			},
			{
				key: "monitoring",
				path: "monitoring",
				titleKey: "sys.nav.portal.dataSecurityMonitoring",
				descriptionKey: "sys.nav.portal.dataSecurityMonitoringCaption",
			},
			{
				key: "incidents",
				path: "incidents",
				titleKey: "sys.nav.portal.dataSecurityIncidents",
				descriptionKey: "sys.nav.portal.dataSecurityIncidentsCaption",
			},
		],
	},
	{
		key: "dataQuality",
		path: "data-quality",
		icon: "solar:medal-star-bold-duotone",
		titleKey: "sys.nav.portal.dataQuality",
		children: [
			{
				key: "standards",
				path: "standards",
				titleKey: "sys.nav.portal.dataQualityStandards",
				descriptionKey: "sys.nav.portal.dataQualityStandardsCaption",
			},
			{
				key: "assessment",
				path: "assessment",
				titleKey: "sys.nav.portal.dataQualityAssessment",
				descriptionKey: "sys.nav.portal.dataQualityAssessmentCaption",
			},
			{
				key: "monitoring",
				path: "monitoring",
				titleKey: "sys.nav.portal.dataQualityMonitoring",
				descriptionKey: "sys.nav.portal.dataQualityMonitoringCaption",
			},
			{
				key: "improvement",
				path: "improvement",
				titleKey: "sys.nav.portal.dataQualityImprovement",
				descriptionKey: "sys.nav.portal.dataQualityImprovementCaption",
			},
		],
	},
	{
		key: "serviceOperations",
		path: "service-operations",
		icon: "solar:server-path-bold-duotone",
		titleKey: "sys.nav.portal.serviceOperations",
		children: [
			{
				key: "catalog",
				path: "catalog",
				titleKey: "sys.nav.portal.serviceOperationsCatalog",
				descriptionKey: "sys.nav.portal.serviceOperationsCatalogCaption",
			},
			{
				key: "management",
				path: "management",
				titleKey: "sys.nav.portal.serviceOperationsManagement",
				descriptionKey: "sys.nav.portal.serviceOperationsManagementCaption",
			},
			{
				key: "monitoring",
				path: "monitoring",
				titleKey: "sys.nav.portal.serviceOperationsMonitoring",
				descriptionKey: "sys.nav.portal.serviceOperationsMonitoringCaption",
			},
			{
				key: "analytics",
				path: "analytics",
				titleKey: "sys.nav.portal.serviceOperationsAnalytics",
				descriptionKey: "sys.nav.portal.serviceOperationsAnalyticsCaption",
			},
			{
				key: "operations",
				path: "operations",
				titleKey: "sys.nav.portal.serviceOperationsOperations",
				descriptionKey: "sys.nav.portal.serviceOperationsOperationsCaption",
			},
			{
				key: "apiFormats",
				path: "api-formats",
				titleKey: "sys.nav.portal.serviceOperationsApiFormats",
				descriptionKey: "sys.nav.portal.serviceOperationsApiFormatsCaption",
			},
			{
				key: "export",
				path: "export",
				titleKey: "sys.nav.portal.serviceOperationsExport",
				descriptionKey: "sys.nav.portal.serviceOperationsExportCaption",
			},
		],
	},
];

const firstSection = PORTAL_NAV_SECTIONS[0];
const firstChild = firstSection.children[0];

export const DEFAULT_PORTAL_ROUTE = `/${firstSection.path}/${firstChild.path}`;
