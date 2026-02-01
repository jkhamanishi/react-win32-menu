
import { ComponentType, createElement, ReactElement, ReactNode } from "react";

type Components = ComponentType<{children: NonNullable<ReactElement>}>[];
type ComponentsParam = [...Components, ReactNode];

/**
 * Aggregates multiple React components into a nested structure.
 * 
 * Takes an array of component types and a final child node, then wraps the child
 * in each component from right to left, creating a nested component tree.
 * 
 * @param components - An array where all elements except the last are component types
 *                     that accept a single `children` prop, and the last element is
 *                     the innermost child node to be wrapped.
 * 
 * @returns A ReactElement with all components nested around the child node.
 * 
 * @example
 *    ```tsx
 *    const render = aggregateComponents([
 *      ProviderA,
 *      ProviderB,
 *      <div>Content</div>
 *    ]);
 *    ```
 * 
 *    is equivalent to:
 * 
 *    ```tsx
 *    const render = (
 *      <ProviderA>
 *        <ProviderB>
 *          <div>Content</div>
 *        </ProviderB>
 *      </ProviderA>
 *    );
 *    ```
 */
function aggregateComponents(components: ComponentsParam): ReactElement {
  const children = components.pop() as ReactElement;
  
  return (components as Components).reduceRight<ReactElement>((acc, Component) => {
    return createElement(Component, null, acc);
  }, children);
}


export default aggregateComponents;
