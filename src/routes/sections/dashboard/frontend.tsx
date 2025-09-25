import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import type { ReactElement } from "react";
import { PORTAL_NAV_SECTIONS } from "@/constants/portal-navigation";
import DataDomainManagementPage from "@/pages/catalog/DataDomainManagementPage";
import QueryWorkbenchPage from "@/pages/explore/QueryWorkbenchPage";
import DataPreviewPage from "@/pages/explore/DataPreviewPage";
import DataStandardsPage from "@/pages/modeling/DataStandardsPage";
import QualityRulesPage from "@/pages/governance/QualityRulesPage";
import MaskingPoliciesPage from "@/pages/governance/MaskingPoliciesPage";
import DataProductsPage from "@/pages/services/DataProductsPage";
import ApiServicesPage from "@/pages/services/ApiServicesPage";
import ApiServiceDetailPage from "@/pages/services/ApiServiceDetailPage";
import ClassificationMappingPage from "@/pages/iam/ClassificationMappingPage";
import AuthorizationPage from "@/pages/iam/AuthorizationPage";
import ReportsPage from "@/pages/visualization/ReportsPage";
import FeaturePlaceholder from "@/pages/common/FeaturePlaceholder";

const FEATURE_COMPONENTS: Record<string, Record<string, () => ReactElement>> = {
	catalog: {
		domains: () => <DataDomainManagementPage />,
	},
	modeling: {
		standards: () => <DataStandardsPage />,
	},
	governance: {
		rules: () => <QualityRulesPage />,
		masking: () => <MaskingPoliciesPage />,
	},
	explore: {
		workbench: () => <QueryWorkbenchPage />,
		preview: () => <DataPreviewPage />,
	},
	services: {
		api: () => <ApiServicesPage />,
		products: () => <DataProductsPage />,
	},
	visualization: {
		reports: () => <ReportsPage />,
	},
	iam: {
		classification: () => <ClassificationMappingPage />,
		authorization: () => <AuthorizationPage />,
	},
};

export function getFrontendDashboardRoutes(): RouteObject[] {
	return PORTAL_NAV_SECTIONS.map((section) => {
		const childRoutes = section.children.map<RouteObject>((child) => {
			const renderFeature = FEATURE_COMPONENTS[section.key]?.[child.key];
			const element = renderFeature ? (
				renderFeature()
			) : (
				<FeaturePlaceholder titleKey={child.titleKey} descriptionKey={child.descriptionKey} />
			);
			return {
				path: child.path,
				element,
			};
		});

		if (!childRoutes.length) {
			return { path: section.path };
		}

		// Extra non-menu routes
		const extraChildren: RouteObject[] = [];
		if (section.key === "services") {
			extraChildren.push({ path: "apis/:id", element: <ApiServiceDetailPage /> });
		}

		return {
			path: section.path,
			children: [
				{ index: true, element: <Navigate to={section.children[0].path} replace /> },
				...childRoutes,
				...extraChildren,
			],
		};
	});
}
