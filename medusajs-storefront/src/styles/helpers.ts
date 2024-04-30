import { css, keyframes } from 'styled-components'

/* Keyframes */

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
export const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

export const pulse = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

/* Constants */

export const OPEN_SANS_FONT_VARIABLE = 'var(--open-sans-font)'

export const WRAPPER_PADDING_DESKTOP = 32
export const WRAPPER_PADDING_MOBILE = 16
export const WRAPPER_MAX_WIDTH = 1280

export const Z_INDEX = {
	CONTENT: 1,
	HEADER: 2,
	LANGUAGE_SELECT: 3,
	MODAL: 4,
	COOKIE: 5
}

export const ANIMATION_DURATION = {
	SECOND: 1000
}

/* Breakpoints */

export const breakpoints = {
	xs: 375,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400
}

/* Fonts */
/* Xs Fonts */
export const textXsRegular = css`
	line-height: 1rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.75rem;
	font-weight: 400;
	font-style: normal;
`

export const textXsMedium = css`
	line-height: 1rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.75rem;
	font-weight: 500;
	font-style: normal;
`

export const textXsSemibold = css`
	line-height: 1rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.75rem;
	font-weight: 600;
	font-style: normal;
`

export const textXsBold = css`
	line-height: 1rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.75rem;
	font-weight: 700;
	font-style: normal;
`

/* Sm Fonts */
export const textSmRegular = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.875rem;
	font-weight: 400;
	font-style: normal;
`

export const textSmMedium = css`
	line-height: 1.25rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.875rem;
	font-weight: 500;
	font-style: normal;
`

export const textSmSemibold = css`
	line-height: 1.25rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.875rem;
	font-weight: 600;
	font-style: normal;
`

export const textSmBold = css`
	line-height: 1.25rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 0.875rem;
	font-weight: 700;
	font-style: normal;
`

/* Md Fonts */
export const textMdRegular = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1rem;
	font-weight: 400;
	font-style: normal;
`

export const textMdMedium = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1rem;
	font-weight: 500;
	font-style: normal;
`

export const textMdSemibold = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1rem;
	font-weight: 600;
	font-style: normal;
`

export const textMdBold = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1rem;
	font-weight: 700;
	font-style: normal;
`

/* Lg Fonts */
export const textLgRegular = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.125rem;
	font-weight: 400;
	font-style: normal;
`

export const textLgMedium = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.125rem;
	font-weight: 500;
	font-style: normal;
`

export const textLgSemibold = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.125rem;
	font-weight: 600;
	font-style: normal;
`

export const textLgBold = css`
	line-height: 1.5rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.125rem;
	font-weight: 700;
	font-style: normal;
`

/* Xl Fonts */
export const textXlRegular = css`
	line-height: 2rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.25rem;
	font-weight: 400;
	font-style: normal;
`

export const textXlMedium = css`
	line-height: 2rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.25rem;
	font-weight: 500;
	font-style: normal;
`

export const textXlSemiBold = css`
	line-height: 2rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.25rem;
	font-weight: 600;
	font-style: normal;
`

export const textXlBold = css`
	line-height: 2rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.25rem;
	font-weight: 700;
	font-style: normal;
`

/* Heading fonts */
export const headingXsSemibold = css`
	line-height: 2rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.5rem;
	font-weight: 600;
	font-style: normal;
`

export const headingSmSemibold = css`
	line-height: 2.5rem;
	letter-spacing: -0.3px;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 2rem;
	font-weight: 600;
	font-style: normal;
`

export const textXlSemibold = css`
	line-height: 2rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 1.25rem;
	font-weight: 600;
	font-style: normal;
`

export const headingXxlBold = css`
	line-height: 5.5rem;
	letter-spacing: -0.02rem;
	font-family: ${OPEN_SANS_FONT_VARIABLE};
	font-size: 4.5rem;
	font-weight: 700;
	font-style: normal;
`

/* Shared styles */

export const screenReaderOnly = css`
	position: absolute;
	margin: -1px;
	border: 0;
	padding: 0;
	width: 1px;
	height: 1px;
	overflow: hidden;
	clip: rect(0 0 0 0);
`

export const resetButtonStyles = css`
	border: none;
	background: none;
	cursor: pointer;
	padding: 0;
`

export const resetListStyles = css`
	padding: 0;
	list-style: none;
`

export const resetLinkStyles = css`
	text-decoration: none;
	color: inherit;
`

export const truncate = css`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

export const multipleLineTruncate = (lines: 2) => css`
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
	word-break: break-word;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${lines};
`

export const transition = css`
	transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
`

/* Theme */

export const theme = {
	spacing: {
		2: '2px',
		4: '4px',
		6: '6px',
		8: '8px',
		12: '12px',
		16: '16px',
		20: '20px',
		24: '24px',
		32: '32px',
		40: '40px',
		48: '48px',
		64: '64px',
		80: '80px',
		96: '96px',
		128: '128px',
		160: '160px',
		192: '192px',
		224: '224px',
		256: '256px'
	},
	spacingRem: {
		2: '0.125rem',
		4: '0.25rem',
		6: '0.375rem',
		8: '0.5rem',
		12: '0.75rem',
		16: '1rem',
		20: '1.25rem',
		24: '1.5rem',
		32: '2rem',
		40: '2.5rem',
		48: '3rem',
		64: '4rem',
		80: '5rem',
		96: '6rem',
		128: '8rem',
		160: '10rem',
		192: '12rem',
		224: '14rem',
		256: '16rem'
	},
	borderRadius: {
		2: '2px',
		4: '4px',
		6: '6px',
		8: '8px',
		12: '12px',
		16: '16px',
		20: '20px',
		24: '24px',
		32: '32px',
		40: '40px',
		48: '48px',
		80: '80px',
		circle: '50%'
	},
	borderWidth: {
		xs: '1px',
		sm: '1.5px',
		md: '2px',
		lg: '4px'
	}
}
