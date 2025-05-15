import { CSSProperties, DependencyList, useMemo } from 'react';
export { cssVar, type CustomStyleVars } from '../utils/menuStyle';

export function useMenuStyle(style: CSSProperties, deps: DependencyList = []) {
  return useMemo<CSSProperties>(() => style, deps);
}

export default useMenuStyle;
