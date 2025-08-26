import * as CSS from "csstype";

type StyleProp<V extends string, T> = {
  varname: `--win32menubar-${V}`;
  type: T;
}

interface MenuStyle {
  background: StyleProp<'background', CSS.Property.Background>;
  color: StyleProp<'color', CSS.Property.Color>;
  outline: StyleProp<'outline', CSS.Property.Outline>;
  padding: StyleProp<'padding', CSS.Property.Padding>;
  margin: StyleProp<'margin', CSS.Property.Margin>;
  zIndex: StyleProp<'z-index', CSS.Property.ZIndex>;
  fontFamily: StyleProp<'font-family', CSS.Property.FontFamily>;
  fontSize: StyleProp<'font-size', CSS.Property.FontSize>;
  menuMinWidth: StyleProp<'menu-min-width', CSS.Property.MinWidth>;
  menuPadding: StyleProp<'menu-padding', CSS.Property.Padding>;
  menuMargin: StyleProp<'menu-margin', CSS.Property.Margin>;
  menuBackground: StyleProp<'menu-background', CSS.Property.Background>;
  menuBorder: StyleProp<'menu-border', CSS.Property.Border>;
  menuBoxShadow: StyleProp<'menu-box-shadow', CSS.Property.BoxShadow>;
  menuBorderRadius: StyleProp<'menu-border-radius', CSS.Property.BorderRadius>;
  rootLabelHeight: StyleProp<'root-label-height', CSS.Property.Height>;
  rootHoverBackground: StyleProp<'root-hover-background', CSS.Property.Background>;
  rootHoverColor: StyleProp<'root-hover-color', CSS.Property.Color>;
  rootIconSize: StyleProp<'root-icon-size', CSS.Property.Height | CSS.Property.Width>;
  labelHeight: StyleProp<'label-height', CSS.Property.Height>;
  labelPadding: StyleProp<'label-padding', CSS.Property.Padding>;
  labelTextAlign: StyleProp<'label-text-align', CSS.Property.TextAlign>;
  labelIconGap: StyleProp<'label-icon-gap', CSS.Property.Gap>;
  labelIconSize: StyleProp<'label-icon-size', CSS.Property.Height | CSS.Property.Width>;
  hotkeyFontSize: StyleProp<'hotkey-font-size', CSS.Property.FontSize>;
  hotkeyFontStyle: StyleProp<'hotkey-font-style', CSS.Property.FontStyle>;
  hotkeyPaddingLeft: StyleProp<'hotkey-padding-left', CSS.Property.PaddingLeft>;
  hoverBackground: StyleProp<'hover-background', CSS.Property.Background>;
  hoverColor: StyleProp<'hover-color', CSS.Property.Color>;
  separatorColor: StyleProp<'separator-color', CSS.Property.BorderBottomColor>;
  separatorHeight: StyleProp<'separator-height', CSS.Property.BorderBottomWidth>;
  separatorPadding: StyleProp<'separator-padding', CSS.Property.PaddingTop>;
}

export type CustomStyleVars = {
  [key in keyof MenuStyle as MenuStyle[key]['varname']]?: MenuStyle[key]['type'];
}
export type CustomStyleProps = {
  [key in keyof MenuStyle]?: MenuStyle[key]['type'];
}

export function cssVar<V extends keyof CustomStyleVars> (
  prop: V,
  fallback: CustomStyleVars[V],
): CustomStyleVars[V] {
  return `var(${prop}, ${fallback})` as CustomStyleVars[V];
}

export function stylePropsToVars(props: CustomStyleProps): CustomStyleVars {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(props)) {
    const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const varName = ('--win32menubar-' + kebabKey);
    result[varName] = value;
  }
  return result as CustomStyleVars;
}
