import { CSSProperties, DependencyList, useMemo } from 'react';
export { cssVar, type CustomStyleVars } from '../utils/menuStyle';


export function useMenuStyle(style: CSSProperties): CSSProperties;
export function useMenuStyle(style: CSSProperties, active: boolean): CSSProperties;
export function useMenuStyle(style: CSSProperties, deps: DependencyList): CSSProperties;
export function useMenuStyle(style: CSSProperties, deps: DependencyList, active: boolean): CSSProperties;
export function useMenuStyle(
  style: CSSProperties,
  arg1?: DependencyList | boolean,
  arg2?: boolean,
): CSSProperties {
  const deps: DependencyList = (typeof arg1 === 'object') ? arg1 : [];
  const active: boolean = (typeof arg1 === 'boolean') ? arg1 : (arg2 ?? true);
  
  const styleMemo = useMemo<CSSProperties>(() => {
    return (active ? style : {});
  }, [active, ...deps]);
  
  return styleMemo;
}

export default useMenuStyle;
