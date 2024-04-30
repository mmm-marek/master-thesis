import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import SelectField from '@/atoms/SelectField/SelectField'
import HookFormField from '@/components/HookFormField'
import { useTheme } from '@/providers/ThemeProvider'
import { THEME_OPTION, THEME_SETTINGS } from '@/utils/enums'
import { THEME_OPTION_OPTIONS } from '@/utils/helpers'

import * as SC from './AppearanceFormStyles'

const DEFAULT_VALUES = { themeOption: THEME_SETTINGS.DEFAULT_THEME_OPTION }

type AppearanceFormFields = {
	themeOption: THEME_OPTION
}

const AppearanceForm = () => {
	const t = useTranslations('containers.profile.appearanceForm')

	const { themeOption, currentSystemTheme, setTheme } = useTheme()

	const { control, watch, reset } = useForm<AppearanceFormFields>({
		mode: 'onChange',
		defaultValues: DEFAULT_VALUES
	})

	useEffect(() => {
		reset({ themeOption })
	}, [reset, themeOption])

	watch((data) => {
		if (data.themeOption) {
			setTheme(data.themeOption)
		}
	})

	return (
		<SC.Form layout='vertical'>
			<HookFormField control={control} name='themeOption' component={SelectField} label={t('theme')} options={THEME_OPTION_OPTIONS(currentSystemTheme)} />
		</SC.Form>
	)
}

export default AppearanceForm
