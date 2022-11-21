import React, { useMemo } from 'react'
import { Theme, useTheme } from '@emotion/react'
import { Theme as MuiTheme } from '@mui/material/styles'
import styled, { StyledComponent } from '@emotion/styled/macro'
import { CSSInterpolation } from '@emotion/css'
import {
  OverridableComponent,
  OverridableTypeMap
} from '@mui/material/OverridableComponent'

type ReturnedType<T extends ComponentType> = StyledComponent<
  JSX.LibraryManagedAttributes<T, React.ComponentProps<T>> & {
    theme?: Theme
  }
>

type StylesReturnType = {
  root: CSSInterpolation
}

type ComponentType =
  | OverridableComponent<OverridableTypeMap>
  | React.JSXElementConstructor<JSX.Element>
  | ((props?: React.ComponentProps<any>) => JSX.Element)

function useEmotionStyledComponent<T extends ComponentType>(
  styles: () => StylesReturnType,
  WrappedComponent: T
): ReturnedType<T>

function useEmotionStyledComponent<T extends ComponentType>(
  styles: (theme: MuiTheme) => StylesReturnType,
  WrappedComponent: T
): ReturnedType<T>

function useEmotionStyledComponent<T extends ComponentType, R>(
  styles: (theme: MuiTheme, props: R) => StylesReturnType,
  WrappedComponent: T,
  props: R
): ReturnedType<T>

function useEmotionStyledComponent<T extends ComponentType, R>(
  styles: (theme: MuiTheme, props?: R) => StylesReturnType,
  WrappedComponent: T,
  props?: R
): ReturnedType<T> {
  const theme = useTheme()
  const { root } = styles(theme, props)

  return useMemo(() => {
    return styled(WrappedComponent)(root)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [WrappedComponent])
}

export default useEmotionStyledComponent
