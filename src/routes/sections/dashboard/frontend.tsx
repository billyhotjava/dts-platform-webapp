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
		products: () => <DataProductsPage />,
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

		return {
			path: section.path,
			children: [{ index: true, element: <Navigate to={section.children[0].path} replace /> }, ...childRoutes],
		};
	});
}
