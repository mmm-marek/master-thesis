import type { AxiosRequestConfig, OpenAPIClient, OperationResponse, Parameters, UnknownParamsObject } from 'openapi-client-axios'

declare namespace Paths {
	namespace DeleteApiV1UsersUserId {
		namespace Parameters {
			export type UserID = string // uuid
		}
		export interface PathParameters {
			userID: Parameters.UserID /* uuid */
		}
		namespace Responses {
			export interface $200 {
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
			}
		}
	}
	namespace GetApiMaintenanceHealth {
		namespace Parameters {
			export type Database = boolean
		}
		export interface QueryParameters {
			database?: Parameters.Database
		}
		namespace Responses {
			export interface $200 {
				status: 200 | 425
				details: {
					database?: 200 | 425
				}
			}
		}
	}
	namespace GetApiMaintenanceVersion {
		namespace Responses {
			export interface $200 {
				name?: string
				version?: string
				env?: string
				envConfig?: string
				envSentry?: string
			}
		}
	}
	namespace GetApiV1Users {
		namespace Parameters {
			export type Limit = number
			export type Page = number
			export type Permission = 'ADMINISTRATOR' | 'USER'
			export type Search = string
			export type State = 'ACTIVE' | 'PENDING_INVITATION'
		}
		export interface QueryParameters {
			search?: Parameters.Search
			permission?: Parameters.Permission
			state?: Parameters.State
			limit?: Parameters.Limit
			page?: Parameters.Page
		}
		namespace Responses {
			export interface $200 {
				users: {
					id: string // uuid
					name?: string
					surname?: string
					email: string // email
					permission: 'ADMINISTRATOR' | 'USER'
					state: 'ACTIVE' | 'PENDING_INVITATION'
				}[]
				pagination: {
					limit: number
					page: number
					totalPages: number
					totalCount: number
				}
			}
		}
	}
	namespace GetApiV1UsersUserId {
		namespace Parameters {
			export type UserID = string // uuid
		}
		export interface PathParameters {
			userID: Parameters.UserID /* uuid */
		}
		namespace Responses {
			export interface $200 {
				user: {
					id: string // uuid
					name?: string
					surname?: string
					email: string // email
					permission: 'ADMINISTRATOR' | 'USER'
					state: 'ACTIVE' | 'PENDING_INVITATION'
				}
			}
		}
	}
	namespace PatchApiV1UsersPassword {
		export interface RequestBody {
			oldPassword: string
			newPassword: string // (?=.{8,})^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)
		}
		namespace Responses {
			export interface $200 {
				accessToken: string
				refreshToken: string
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
			}
		}
	}
	namespace PatchApiV1UsersSelf {
		export interface RequestBody {
			name?: string
			surname?: string
			permission?: 'ADMINISTRATOR' | 'USER'
			phone?: string | null
		}
		namespace Responses {
			export interface $200 {
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
			}
		}
	}
	namespace PatchApiV1UsersUserId {
		namespace Parameters {
			export type UserID = string // uuid
		}
		export interface PathParameters {
			userID: Parameters.UserID /* uuid */
		}
		export interface RequestBody {
			name?: string
			surname?: string
			permission?: 'ADMINISTRATOR' | 'USER'
			phone?: string | null
		}
		namespace Responses {
			export interface $200 {
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
			}
		}
	}
	namespace PostApiV1AuthLogin {
		export interface RequestBody {
			email: string // ^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
			password: string
			/**
			 * reCAPTCHA Enterprise token for given action
			 */
			token: string
		}
		namespace Responses {
			export interface $200 {
				accessToken: string
				refreshToken: string
				user: {
					id: string
				}
			}
		}
	}
	namespace PostApiV1AuthLogout {
		export interface RequestBody {}
	}
	namespace PostApiV1AuthRefreshToken {
		export interface RequestBody {}
	}
	namespace PostApiV1AuthResetPassword {
		export interface RequestBody {}
	}
	namespace PostApiV1AuthResetPasswordRequest {
		export interface RequestBody {
			email: string // ^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
			/**
			 * reCAPTCHA Enterprise token for given action
			 */
			token: string
		}
		namespace Responses {
			export interface $200 {
				passwordResetToken?: string
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
			}
		}
	}
	namespace PostApiV1Users {
		export interface RequestBody {
			emails: string /* ^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$ */[]
			permission: 'ADMINISTRATOR' | 'USER'
		}
		namespace Responses {
			export interface $200 {
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
				users: {
					id: string
					invitationToken?: string
				}[]
			}
		}
	}
	namespace PostApiV1UsersConfirm {
		export interface RequestBody {
			name: string
			surname: string
			phone?: string | null
			note?: string | null
			password: string // (?=.{8,})^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)
		}
		namespace Responses {
			export interface $200 {
				accessToken: string
				refreshToken: string
				user: {
					id: string // uuid
				}
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
			}
		}
	}
	namespace PostApiV1UsersFirst {
		export interface RequestBody {
			email: string // ^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
		}
		namespace Responses {
			export interface $200 {
				messages: {
					message: string
					type: 'SUCCESS'
				}[]
				user?: {
					id: string // uuid
					invitationToken?: string
				}
			}
		}
	}
}

export interface OperationMethods {
	/**
	 * postApiV1AuthLogout - permissions: NO
	 */
	'postApiV1AuthLogout'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1AuthLogout.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<any>
	/**
	 * postApiV1AuthRefreshToken - permissions: NO
	 */
	'postApiV1AuthRefreshToken'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1AuthRefreshToken.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<any>
	/**
	 * postApiV1AuthResetPassword - permissions: NO
	 */
	'postApiV1AuthResetPassword'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1AuthResetPassword.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<any>
	/**
	 * getApiMaintenanceSentry - permissions: NO
	 */
	'getApiMaintenanceSentry'(parameters?: Parameters<UnknownParamsObject> | null, data?: any, config?: AxiosRequestConfig): OperationResponse<any>
	/**
	 * getApiMaintenanceVersion - permissions: NO
	 */
	'getApiMaintenanceVersion'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.GetApiMaintenanceVersion.Responses.$200>
	/**
	 * postApiV1AuthLogin - permissions: NO
	 */
	'postApiV1AuthLogin'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1AuthLogin.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PostApiV1AuthLogin.Responses.$200>
	/**
	 * postApiV1AuthResetPasswordRequest - permissions: NO
	 */
	'postApiV1AuthResetPasswordRequest'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1AuthResetPasswordRequest.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PostApiV1AuthResetPasswordRequest.Responses.$200>
	/**
	 * getApiV1Users - permissions: NO
	 */
	'getApiV1Users'(
		parameters?: Parameters<Paths.GetApiV1Users.QueryParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.GetApiV1Users.Responses.$200>
	/**
	 * postApiV1Users - Endpoint for inviting users, permissions: [ADMINISTRATOR]
	 */
	'postApiV1Users'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1Users.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PostApiV1Users.Responses.$200>
	/**
	 * getApiV1UsersUserId - User detail. Basic user can only see his detail, Administrators can see detail of all users., permissions: NO
	 */
	'getApiV1UsersUserId'(
		parameters?: Parameters<Paths.GetApiV1UsersUserId.PathParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.GetApiV1UsersUserId.Responses.$200>
	/**
	 * patchApiV1UsersUserId - permissions: [ADMINISTRATOR]
	 */
	'patchApiV1UsersUserId'(
		parameters?: Parameters<Paths.PatchApiV1UsersUserId.PathParameters> | null,
		data?: Paths.PatchApiV1UsersUserId.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PatchApiV1UsersUserId.Responses.$200>
	/**
	 * deleteApiV1UsersUserId - permissions: NO
	 */
	'deleteApiV1UsersUserId'(
		parameters?: Parameters<Paths.DeleteApiV1UsersUserId.PathParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.DeleteApiV1UsersUserId.Responses.$200>
	/**
	 * postApiV1UsersFirst - Endpoint for inviting first admin. No access token is required, but work only when no other users are in the DB., permissions: NO
	 */
	'postApiV1UsersFirst'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1UsersFirst.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PostApiV1UsersFirst.Responses.$200>
	/**
	 * postApiV1UsersConfirm - permissions: NO
	 */
	'postApiV1UsersConfirm'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PostApiV1UsersConfirm.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PostApiV1UsersConfirm.Responses.$200>
	/**
	 * patchApiV1UsersSelf - permissions: NO
	 */
	'patchApiV1UsersSelf'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PatchApiV1UsersSelf.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PatchApiV1UsersSelf.Responses.$200>
	/**
	 * patchApiV1UsersPassword - permissions: NO
	 */
	'patchApiV1UsersPassword'(
		parameters?: Parameters<UnknownParamsObject> | null,
		data?: Paths.PatchApiV1UsersPassword.RequestBody,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.PatchApiV1UsersPassword.Responses.$200>
	/**
	 * getApiMaintenanceHealth - permissions: NO
	 */
	'getApiMaintenanceHealth'(
		parameters?: Parameters<Paths.GetApiMaintenanceHealth.QueryParameters> | null,
		data?: any,
		config?: AxiosRequestConfig
	): OperationResponse<Paths.GetApiMaintenanceHealth.Responses.$200>
}

export interface PathsDictionary {
	['/api/v1/auth/logout']: {
		/**
		 * postApiV1AuthLogout - permissions: NO
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1AuthLogout.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<any>
	}
	['/api/v1/auth/refresh-token']: {
		/**
		 * postApiV1AuthRefreshToken - permissions: NO
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1AuthRefreshToken.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<any>
	}
	['/api/v1/auth/reset-password']: {
		/**
		 * postApiV1AuthResetPassword - permissions: NO
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1AuthResetPassword.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<any>
	}
	['/api/maintenance/sentry/']: {
		/**
		 * getApiMaintenanceSentry - permissions: NO
		 */
		'get'(parameters?: Parameters<UnknownParamsObject> | null, data?: any, config?: AxiosRequestConfig): OperationResponse<any>
	}
	['/api/maintenance/version/']: {
		/**
		 * getApiMaintenanceVersion - permissions: NO
		 */
		'get'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.GetApiMaintenanceVersion.Responses.$200>
	}
	['/api/v1/auth/login']: {
		/**
		 * postApiV1AuthLogin - permissions: NO
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1AuthLogin.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PostApiV1AuthLogin.Responses.$200>
	}
	['/api/v1/auth/reset-password-request']: {
		/**
		 * postApiV1AuthResetPasswordRequest - permissions: NO
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1AuthResetPasswordRequest.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PostApiV1AuthResetPasswordRequest.Responses.$200>
	}
	['/api/v1/users/']: {
		/**
		 * getApiV1Users - permissions: NO
		 */
		'get'(
			parameters?: Parameters<Paths.GetApiV1Users.QueryParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.GetApiV1Users.Responses.$200>
		/**
		 * postApiV1Users - Endpoint for inviting users, permissions: [ADMINISTRATOR]
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1Users.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PostApiV1Users.Responses.$200>
	}
	['/api/v1/users/{userID}']: {
		/**
		 * getApiV1UsersUserId - User detail. Basic user can only see his detail, Administrators can see detail of all users., permissions: NO
		 */
		'get'(
			parameters?: Parameters<Paths.GetApiV1UsersUserId.PathParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.GetApiV1UsersUserId.Responses.$200>
		/**
		 * deleteApiV1UsersUserId - permissions: NO
		 */
		'delete'(
			parameters?: Parameters<Paths.DeleteApiV1UsersUserId.PathParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.DeleteApiV1UsersUserId.Responses.$200>
		/**
		 * patchApiV1UsersUserId - permissions: [ADMINISTRATOR]
		 */
		'patch'(
			parameters?: Parameters<Paths.PatchApiV1UsersUserId.PathParameters> | null,
			data?: Paths.PatchApiV1UsersUserId.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PatchApiV1UsersUserId.Responses.$200>
	}
	['/api/v1/users/first']: {
		/**
		 * postApiV1UsersFirst - Endpoint for inviting first admin. No access token is required, but work only when no other users are in the DB., permissions: NO
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1UsersFirst.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PostApiV1UsersFirst.Responses.$200>
	}
	['/api/v1/users/confirm']: {
		/**
		 * postApiV1UsersConfirm - permissions: NO
		 */
		'post'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PostApiV1UsersConfirm.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PostApiV1UsersConfirm.Responses.$200>
	}
	['/api/v1/users/self']: {
		/**
		 * patchApiV1UsersSelf - permissions: NO
		 */
		'patch'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PatchApiV1UsersSelf.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PatchApiV1UsersSelf.Responses.$200>
	}
	['/api/v1/users/password']: {
		/**
		 * patchApiV1UsersPassword - permissions: NO
		 */
		'patch'(
			parameters?: Parameters<UnknownParamsObject> | null,
			data?: Paths.PatchApiV1UsersPassword.RequestBody,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.PatchApiV1UsersPassword.Responses.$200>
	}
	['/api/maintenance/health/']: {
		/**
		 * getApiMaintenanceHealth - permissions: NO
		 */
		'get'(
			parameters?: Parameters<Paths.GetApiMaintenanceHealth.QueryParameters> | null,
			data?: any,
			config?: AxiosRequestConfig
		): OperationResponse<Paths.GetApiMaintenanceHealth.Responses.$200>
	}
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
