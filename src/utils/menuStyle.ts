import * as CSS from "csstype";


export interface CustomStyleVars {
  '--win32menubar-padding'?: CSS.Property.Padding;
  '--win32menubar-margin'?: CSS.Property.Margin;
  '--win32menubar-outline'?: CSS.Property.Outline;
  '--win32menubar-z-index'?: CSS.Property.ZIndex;
  '--win32menubar-background'?: CSS.Property.Background;
  '--win32menubar-color'?: CSS.Property.Color;
  '--win32menubar-font-family'?: CSS.Property.FontFamily;
  '--win32menubar-font-size'?: CSS.Property.FontSize;
  '--win32menubar-menu-padding'?: CSS.Property.Padding;
  '--win32menubar-menu-margin'?: CSS.Property.Margin;
  '--win32menubar-menu-outline'?: CSS.Property.Outline;
  '--win32menubar-menu-background'?: CSS.Property.Background;
  '--win32menubar-menu-border'?: CSS.Property.Border;
  '--win32menubar-menu-box-shadow'?: CSS.Property.BoxShadow;
  '--win32menubar-menu-border-radius'?: CSS.Property.BorderRadius;
  '--win32menubar-root-label-height'?: CSS.Property.Height;
  '--win32menubar-label-height'?: CSS.Property.Height;
  '--win32menubar-label-padding'?: CSS.Property.Padding;
  '--win32menubar-label-min-width'?: CSS.Property.MinWidth;
  '--win32menubar-label-text-align'?: CSS.Property.TextAlign;
  '--win32menubar-label-icon-gap'?: CSS.Property.Gap;
  '--win32menubar-label-icon-size'?: CSS.Property.Height | CSS.Property.Width;
  '--win32menubar-root-icon-size'?: CSS.Property.Height | CSS.Property.Width;
  '--win32menubar-hotkey-font-size'?: CSS.Property.FontSize;
  '--win32menubar-hotkey-font-style'?: CSS.Property.FontStyle;
  '--win32menubar-root-hover-background'?: CSS.Property.Background;
  '--win32menubar-root-hover-color'?: CSS.Property.Color;
  '--win32menubar-hover-background'?: CSS.Property.Background;
  '--win32menubar-hover-color'?: CSS.Property.Color;
}

export function cssVar<T extends keyof CustomStyleVars> (
  prop: T,
  fallback: CustomStyleVars[T],
): CustomStyleVars[T] {
  return `var(${prop}, ${fallback})` as CustomStyleVars[T];
}

type CamelCase<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}` ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}` : Lowercase<S>;
type PropName<S extends string> = S extends `--win32menubar-${infer P1}` ? CamelCase<P1> : never;

export type CustomStyleProps = {
  [key in keyof CustomStyleVars as PropName<key>]: CustomStyleVars[key];
} 

export function stylePropsToVars(props: CustomStyleProps): CustomStyleVars {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(props)) {
    const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const varName = ('--win32menubar-' + kebabKey);
    result[varName] = value;
  }
  return result;
}
