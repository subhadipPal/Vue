import { useMemo } from 'react'
import { css, CSSInterpolation } from '@emotion/css'
import { useTheme } from '@emotion/react'
import { Theme as MuiTheme } from '@mui/material/styles'

type ReturnType<Z> = {
  [K in keyof Z]: string
}

function useEmotionStyles<P extends Record<string, CSSInterpolation>>(
  styles: () => P
): ReturnType<P>

function useEmotionStyles<P extends Record<string, CSSInterpolation>>(
  styles: (theme: MuiTheme) => P
): ReturnType<P>

function useEmotionStyles<P extends Record<string, CSSInterpolation>, T>(
  styles: (theme: MuiTheme, props: T) => P,
  props: T
): ReturnType<P>

function useEmotionStyles<P extends Record<string, CSSInterpolation>, T>(
  styles: (theme: MuiTheme, props?: T) => P,
  props?: T
): ReturnType<P> {
  const theme = useTheme()
  const classes = styles(theme, props)

  return useMemo(() => {
    const classNameMap = Object.fromEntries(
      Object.entries(classes).map(([key, value]) => [key, css(value)])
    )

    return classNameMap as ReturnType<P>
  }, [classes])
}

export default useEmotionStyles
