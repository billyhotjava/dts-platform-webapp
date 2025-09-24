import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import { PORTAL_NAV_SECTIONS } from "@/constants/portal-navigation";
import FeaturePlaceholder from "@/pages/common/FeaturePlaceholder";

export function getFrontendDashboardRoutes(): RouteObject[] {
	return PORTAL_NAV_SECTIONS.map((section) => {
		const childRoutes = section.children.map<RouteObject>((child) => ({
			path: child.path,
			element: <FeaturePlaceholder titleKey={child.titleKey} descriptionKey={child.descriptionKey} />,
		}));

		if (!childRoutes.length) {
			return { path: section.path };
		}

		return {
			path: section.path,
			children: [{ index: true, element: <Navigate to={section.children[0].path} replace /> }, ...childRoutes],
		};
	});
}
