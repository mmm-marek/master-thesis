import { ReactNode, createContext, useContext, useReducer } from 'react'

import { APP_STATE_ACTIONS } from '../utils/enums'
import { Paths } from '@/types/api'

type AppStateProviderProps = {
	children: ReactNode
}

// example with BE version
export type AppState = {
	version: Paths.GetApiMaintenanceVersion.Responses.$200['version'] | null
}

export type AppStateAction = {
	type: APP_STATE_ACTIONS
	value: AppState
}

const initialAppState: AppState = {
	version: null
}

// eslint-disable-next-line @typescript-eslint/default-param-last
const appStateReducer = (appState: AppState, action: AppStateAction) => {
	switch (action.type) {
		case APP_STATE_ACTIONS.CHANGE_BE_VERSION: {
			return { ...appState, version: action.value.version }
		}
		default: {
			throw Error(`Unknown action: ${action}`)
		}
	}
}

const AppStateContext = createContext<AppState>({} as AppState)
const AppStateDispatchContext = createContext<(action: AppStateAction) => void>(() => {
	throw Error('Initial function used')
})

export const useAppState = () => {
	return useContext(AppStateContext)
}

export const useAppStateDispatch = () => {
	return useContext(AppStateDispatchContext)
}

const AppStateProvider = ({ children }: AppStateProviderProps) => {
	const [appState, dispatch] = useReducer(appStateReducer, initialAppState as any)

	return (
		<AppStateContext.Provider value={appState}>
			<AppStateDispatchContext.Provider value={dispatch}>{children}</AppStateDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

export default AppStateProvider
