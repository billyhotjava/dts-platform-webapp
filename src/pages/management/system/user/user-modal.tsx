import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { CreateUserRequest, KeycloakRole, KeycloakUser, UpdateUserRequest, UserProfileConfig } from "#/keycloak";
import { KeycloakRoleService, KeycloakUserProfileService, KeycloakUserService } from "@/api/services/keycloakService";
import { Icon } from "@/components/icon";
import { Alert, AlertDescription } from "@/ui/alert";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import { UserProfileField } from "./user-profile-field";
import { t } from "@/locales/i18n";

interface UserModalProps {
	open: boolean;
	mode: "create" | "edit";
	user?: KeycloakUser;
	onCancel: () => void;
	onSuccess: () => void;
}

interface FormData {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	enabled: boolean;
	emailVerified: boolean;
	attributes: Record<string, string[]>;
}

interface RoleChange {
	role: KeycloakRole;
	action: "add" | "remove";
}

interface FormState {
	originalData: FormData;
	originalRoles: KeycloakRole[];
	roleChanges: RoleChange[];
}

export default function UserModal({ open, mode, user, onCancel, onSuccess }: UserModalProps) {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		enabled: true,
		emailVerified: false,
		attributes: {},
	});

	const [formState, setFormState] = useState<FormState>({
		originalData: {
			username: "",
			email: "",
			firstName: "",
			lastName: "",
			enabled: true,
			emailVerified: false,
			attributes: {},
		},
		originalRoles: [],
		roleChanges: [],
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [roles, setRoles] = useState<KeycloakRole[]>([]);
	const [userRoles, setUserRoles] = useState<KeycloakRole[]>([]);
	const [roleError, setRoleError] = useState<string>("");

	// UserProfile相关状态
	const [userProfileConfig, setUserProfileConfig] = useState<UserProfileConfig | null>(null);
	const [profileLoading, setProfileLoading] = useState(false);
	//const [setProfileError] = useState<string>("");

	// 加载UserProfile配置
	const loadUserProfileConfig = useCallback(async () => {
		setProfileLoading(true);
		//setProfileError("");
		try {
			const config = await KeycloakUserProfileService.getUserProfileConfig();
			setUserProfileConfig(config);
		} catch (err) {
			console.error("Error loading user profile config:", err);
			//setProfileError("加载用户配置文件失败");
		} finally {
			setProfileLoading(false);
		}
	}, []);

	// 加载所有角色
	const loadRoles = useCallback(async () => {
		try {
			const rolesData = await KeycloakRoleService.getAllRealmRoles();
			setRoles(rolesData);
		} catch (err) {
			setRoleError("加载角色列表失败");
			console.error("Error loading roles:", err);
		}
	}, []);

	const loadUserRoles = useCallback(async (userId: string) => {
		try {
			const userRolesData = await KeycloakUserService.getUserRoles(userId);
			setUserRoles(userRolesData);
			return userRolesData;
		} catch (err) {
			setRoleError("加载用户角色失败");
			console.error("Error loading user roles:", err);
			return [];
		}
	}, []);

	// 初始化表单数据
	useEffect(() => {
		if (mode === "edit" && user) {
			const initialFormData = {
				username: user.username || "",
				email: user.email || "",
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				enabled: user.enabled ?? true,
				emailVerified: user.emailVerified ?? false,
				attributes: user.attributes || {},
			};

			setFormData(initialFormData);
			setFormState({
				originalData: initialFormData,
				originalRoles: [],
				roleChanges: [],
			});

			// 加载用户角色
			if (user.id) {
				loadUserRoles(user.id).then((roles) => {
					setFormState((prev) => ({
						...prev,
						originalRoles: roles,
					}));
				});
			}
		} else {
			setFormData({
				username: "",
				email: "",
				firstName: "",
				lastName: "",
				enabled: true,
				emailVerified: false,
				attributes: {},
			});
			setFormState({
				originalData: {
					username: "",
					email: "",
					firstName: "",
					lastName: "",
					enabled: true,
					emailVerified: false,
					attributes: {},
				},
				originalRoles: [],
				roleChanges: [],
			});
			setUserRoles([]);
		}
		setError("");
		setRoleError("");
	}, [mode, user, loadUserRoles]);

	// 加载所有角色
	useEffect(() => {
		if (open) {
			loadRoles();
			loadUserProfileConfig(); // 加载UserProfile配置
		}
	}, [open, loadRoles, loadUserProfileConfig]);

	const handleSubmit = async () => {
		if (!formData.username.trim()) {
			setError("用户名不能为空");
			return;
		}

		if (!formData.email.trim()) {
			setError("邮箱不能为空");
			return;
		}

		// 检查UserProfile中的必填字段
		if (userProfileConfig?.attributes) {
			for (const attribute of userProfileConfig.attributes) {
				// 跳过基础字段，因为它们已经在上面检查过了
				if (["username", "email", "firstName", "lastName"].includes(attribute.name)) {
					continue;
				}

				// 检查是否为必填字段
				if (attribute.required) {
					const value = formData.attributes[attribute.name];
					// 检查值是否为空
					if (
						!value ||
						(Array.isArray(value) && (value.length === 0 || value.every((v) => v === ""))) ||
						(typeof value === "string" && (!(value as string).trim() || (value as string) === ""))
					) {
						console.log(attribute.displayName);
						setError(`"${t(attribute.displayName.replace(/\$\{([^}]*)\}/g, "$1")) || attribute.name}" 是必填字段`);
						return;
					}
				}
			}
		}

		// 检查是否有任何变更
		const hasUserInfoChanges = hasUserInfoChanged();
		const hasRoleChanges = formState.roleChanges.length > 0;

		// 如果没有任何变更，显示提示信息
		if (!hasUserInfoChanges && !hasRoleChanges) {
			toast.info("没有检测到任何变更");
			return;
		}

		setLoading(true);
		setError("");

		try {
			if (mode === "create") {
				const createData: CreateUserRequest = {
					username: formData.username,
					email: formData.email,
					firstName: formData.firstName,
					lastName: formData.lastName,
					enabled: formData.enabled,
					emailVerified: formData.emailVerified,
					attributes: formData.attributes,
				};

				const response = await KeycloakUserService.createUser(createData);
				if (response.userId) {
					toast.success("用户创建请求已提交，等待审批");
				} else {
					toast.success("用户创建请求提交成功");
				}
			} else if (mode === "edit" && user?.id) {
				// 分别处理用户信息变更和角色变更
				const hasUserInfoChanges = hasUserInfoChanged();
				const hasRoleChanges = formState.roleChanges.length > 0;

				// 如果有用户信息变更，提交用户信息更新请求
				if (hasUserInfoChanges) {
					const updateData: UpdateUserRequest = {
						id: user.id,
						username: formData.username,
						email: formData.email,
						firstName: formData.firstName,
						lastName: formData.lastName,
						enabled: formData.enabled,
						emailVerified: formData.emailVerified,
						attributes: formData.attributes,
					};

					const response = await KeycloakUserService.updateUser(user.id, updateData);
					if (response.message) {
						toast.success(`用户信息更新请求提交成功: ${response.message}`);
					} else {
						toast.success("用户信息更新请求提交成功");
					}
				}

				// 如果有角色变更，提交角色变更请求
				if (hasRoleChanges) {
					// 处理添加的角色
					const rolesToAdd = formState.roleChanges.filter((rc) => rc.action === "add").map((rc) => rc.role);

					if (rolesToAdd.length > 0) {
						const response = await KeycloakUserService.assignRolesToUser(user.id, rolesToAdd);
						if (response.message) {
							toast.success(`角色分配请求提交成功: ${response.message}`);
						} else {
							toast.success("角色分配请求提交成功");
						}
					}

					// 处理移除的角色
					const rolesToRemove = formState.roleChanges.filter((rc) => rc.action === "remove").map((rc) => rc.role);

					if (rolesToRemove.length > 0) {
						const response = await KeycloakUserService.removeRolesFromUser(user.id, rolesToRemove);
						if (response.message) {
							toast.success(`角色移除请求提交成功: ${response.message}`);
						} else {
							toast.success("角色移除请求提交成功");
						}
					}
				}
			}

			onSuccess();
		} catch (err: any) {
			setError(err.message || "操作失败");
			console.error("Error saving user:", err);
		} finally {
			setLoading(false);
		}
	};

	// 检查用户信息是否有变更
	const hasUserInfoChanged = (): boolean => {
		const { originalData } = formState;
		return (
			formData.username !== originalData.username ||
			formData.email !== originalData.email ||
			formData.firstName !== originalData.firstName ||
			formData.lastName !== originalData.lastName ||
			formData.enabled !== originalData.enabled ||
			formData.emailVerified !== originalData.emailVerified ||
			JSON.stringify(formData.attributes) !== JSON.stringify(originalData.attributes)
		);
	};

	const handleRoleToggle = (role: KeycloakRole) => {
		const hasRole = userRoles.some((r) => r.id === role.id);

		if (hasRole) {
			// 移除角色
			setUserRoles((prev) => prev.filter((r) => r.id !== role.id));
			setFormState((prev) => ({
				...prev,
				roleChanges: [
					...prev.roleChanges.filter((rc) => rc.role.id !== role.id || rc.action !== "add"),
					{ role, action: "remove" },
				],
			}));
		} else {
			// 添加角色
			setUserRoles((prev) => [...prev, role]);
			setFormState((prev) => ({
				...prev,
				roleChanges: [
					...prev.roleChanges.filter((rc) => rc.role.id !== role.id || rc.action !== "remove"),
					{ role, action: "add" },
				],
			}));
		}
	};

	const title = mode === "create" ? "创建用户" : "编辑用户";

	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{/* 基本信息 */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">基本信息</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="username">用户名 *</Label>
									<Input
										id="username"
										value={formData.username}
										onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
										placeholder="请输入用户名"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">邮箱 *</Label>
									<Input
										id="email"
										type="email"
										value={formData.email}
										onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
										placeholder="请输入邮箱"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 hidden">
								<div className="space-y-2">
									<Label htmlFor="firstName">名</Label>
									<Input
										id="firstName"
										value={formData.firstName}
										onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
										placeholder="请输入名"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">姓</Label>
									<Input
										id="lastName"
										value={formData.lastName}
										onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
										placeholder="请输入姓"
									/>
								</div>
							</div>

							{/* UserProfile字段 (基于realm配置) */}
							{userProfileConfig?.attributes && userProfileConfig.attributes.length > 0 && (
								<div className="">
									{profileLoading ? (
										<div className="flex items-center justify-center py-4">
											<Icon icon="mdi:loading" className="animate-spin mr-2" />
											<span>加载配置中...</span>
										</div>
									) : (
										<div className="grid grid-cols-2 gap-4">
											{userProfileConfig.attributes
												.filter((attr) => !["username", "email", "firstName", "lastName", "locale"].includes(attr.name))
												.map((attribute) => (
													<UserProfileField
														key={attribute.name}
														attribute={attribute}
														value={formData.attributes[attribute.name]}
														onChange={(value) => {
															setFormData((prev) => ({
																...prev,
																attributes: {
																	...prev.attributes,
																	[attribute.name]: Array.isArray(value) ? value : [value],
																},
															}));
														}}
													/>
												))}
										</div>
									)}
								</div>
							)}

							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="enabled"
										checked={formData.enabled}
										onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enabled: checked }))}
									/>
									<Label htmlFor="enabled">启用用户</Label>
								</div>
								<div className="flex items-center space-x-2 hidden">
									<Switch
										id="emailVerified"
										checked={formData.emailVerified}
										onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, emailVerified: checked }))}
									/>
									<Label htmlFor="emailVerified">邮箱已验证</Label>
								</div>
							</div>
						</CardContent>
					</Card>
					{/* 角色分配 (仅编辑模式) */}
					{mode === "edit" && user?.id && (
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">角色分配</CardTitle>
							</CardHeader>
							<CardContent>
								{roleError && (
									<Alert variant="destructive" className="mb-4">
										<AlertDescription>{roleError}</AlertDescription>
									</Alert>
								)}

								<div className="space-y-2">
									<Label>用户角色</Label>
									<div className="flex flex-wrap gap-2 mb-4">
										{userRoles.map((role) => (
											<Badge key={role.id} variant="default">
												{role.name}
												<Button
													variant="ghost"
													size="sm"
													className="ml-1 h-4 w-4 p-0"
													onClick={() => handleRoleToggle(role)}
												>
													<Icon icon="mdi:close" size={12} />
												</Button>
											</Badge>
										))}
										{userRoles.length === 0 && <span className="text-muted-foreground">暂无分配角色</span>}
									</div>

									<Label>可用角色</Label>
									<div className="flex flex-wrap gap-2">
										{roles
											.filter((role) => !userRoles.some((ur) => ur.id === role.id))
											.map((role) => (
												<Badge
													key={role.id}
													variant="outline"
													className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
													onClick={() => handleRoleToggle(role)}
												>
													{role.name}
													<Icon icon="mdi:plus" size={12} className="ml-1" />
												</Badge>
											))}
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onCancel}>
						取消
					</Button>
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? "处理中..." : "确定"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
