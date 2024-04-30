import { Select } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

import Button from '../atoms/Button/Button'
import Avatar from '@/atoms/Avatar/Avatar'
import { useTheme } from '@/providers/ThemeProvider'
import { THEME_OPTION } from '@/utils/enums'

const BookmarkIcon = () => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'>
			<path
				d='M4.16666 6.5C4.16666 5.09987 4.16666 4.3998 4.43914 3.86502C4.67882 3.39462 5.06128 3.01217 5.53168 2.77248C6.06646 2.5 6.76653 2.5 8.16666 2.5H11.8333C13.2335 2.5 13.9335 2.5 14.4683 2.77248C14.9387 3.01217 15.3212 3.39462 15.5608 3.86502C15.8333 4.3998 15.8333 5.09987 15.8333 6.5V17.5L9.99999 14.1667L4.16666 17.5V6.5Z'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

const ArrowRightIcon = () => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M4.16667 9.99984H15.8333M15.8333 9.99984L10 4.1665M15.8333 9.99984L10 15.8332'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

const PlusIcon = () => {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M12 5V19M5 12H19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	)
}

const Main = styled.main`
	margin: 0 auto;
	background-color: ${({ theme }) => theme.tokens['color-base-action-primary-active']};
	padding: 0 20px;
	padding-top: 40px;
	max-width: 1200px;
`

const H2 = styled.h2`
	font-size: 48px;
	font-weight: bold;
`

const H3 = styled.h3`
	font-size: 32px;
	font-weight: bold;
`

const Hr = styled.hr`
	margin: 12px 0;
`

const ColorTest = styled.div`
	margin-top: ${({ theme }) => theme.spacing['32']};
	background-color: ${({ theme }) => theme.tokens['drop-shadow-xs']};
`

const ControlButtonsContainer = styled.div`
	display: flex;
	gap: 8px;
	margin-bottom: 40px;
`

const Row = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
	margin-bottom: 64px;
`

const Playground = () => {
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)

	const { themeOption, currentSystemTheme, setTheme } = useTheme()

	return (
		<Main>
			<H2>Theme</H2>
			<Select
				value={themeOption}
				onChange={(newTheme) => setTheme(newTheme)}
				options={[
					{ key: THEME_OPTION.DARK, label: THEME_OPTION.DARK, value: THEME_OPTION.DARK },
					{ key: THEME_OPTION.LIGHT, label: THEME_OPTION.LIGHT, value: THEME_OPTION.LIGHT },
					{ key: THEME_OPTION.SYSTEM, label: `${THEME_OPTION.SYSTEM} (${currentSystemTheme})`, value: THEME_OPTION.SYSTEM }
				]}
			/>

			<Hr />
			<H2>Avatar</H2>

			<ColorTest>Color test</ColorTest>

			<Avatar src={null} isCircle />

			<Hr />
			<H2>Buttons</H2>

			<ControlButtonsContainer>
				<button type='button' onClick={() => setLoading(!loading)}>
					toggle loading
				</button>
				<button type='button' onClick={() => setDisabled(!disabled)}>
					toggle disabled
				</button>
			</ControlButtonsContainer>

			<H3>Button</H3>

			{/* primary */}
			<Row>
				<Button type='primary' size='extra-large' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button type='primary' size='large' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button type='primary' size='middle' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button type='primary' size='small' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
			</Row>

			{/* default */}
			<Row>
				<Button size='extra-large' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button size='large' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button size='middle' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button size='small' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
			</Row>

			{/* danger */}
			<Row>
				<Button danger size='extra-large' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button danger size='large' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button danger size='middle' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
				<Button danger size='small' icon={<BookmarkIcon />} endIcon={<ArrowRightIcon />} loading={loading} disabled={disabled}>
					Button
				</Button>
			</Row>

			<H3>Button Icon</H3>

			{/* primary */}
			<Row>
				<Button danger shape='round' size='extra-large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger shape='round' size='large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger shape='round' size='middle' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger shape='round' size='small' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground shape='round' size='extra-large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground shape='round' size='large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground shape='round' size='middle' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground shape='round' size='small' icon={<PlusIcon />} loading={loading} disabled={disabled} />
			</Row>
			<Row>
				<Button danger size='extra-large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger size='large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger size='middle' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger size='small' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground size='extra-large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground size='large' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground size='middle' icon={<PlusIcon />} loading={loading} disabled={disabled} />
				<Button danger noBackground size='small' icon={<PlusIcon />} loading={loading} disabled={disabled} />
			</Row>
		</Main>
	)
}

export default Playground
