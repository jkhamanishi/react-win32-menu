import { ARIARoleDefinitionKey as Role } from 'aria-query';

type ElementOrNull = Element | null;


export const firstChild = (element: ElementOrNull, withRole: Role, excludeDisabled=true): ElementOrNull => {
  return findMatchingChild(element, 1, withRole, excludeDisabled)
};
export const lastChild = (element: ElementOrNull, withRole: Role, excludeDisabled=true): ElementOrNull => {
  return findMatchingChild(element, -1, withRole, excludeDisabled)
};
const findMatchingChild = (element: ElementOrNull, searchDirection: -1 | 1, withRole: Role, excludeDisabled=true): ElementOrNull => {
  if (!element) return null;
  const childElement = getEdgeChild(element, searchDirection);
  if (isMatch(childElement, withRole, excludeDisabled)) {
    return childElement;
  } else {
    return findMatchingSibling(childElement, searchDirection, withRole, excludeDisabled);
  }
};
const getEdgeChild = (element: Element, direction: -1 | 1): ElementOrNull => {
  switch (direction) {
    case  1: return element.firstElementChild;
    case -1: return element.lastElementChild;
  }
}

export const nextSibling = (element: ElementOrNull, withRole: Role, excludeDisabled=true): ElementOrNull => {
  return findMatchingSibling(element, 1, withRole, excludeDisabled);
};
export const prevSibling = (element: ElementOrNull, withRole: Role, excludeDisabled=true): ElementOrNull => {
  return findMatchingSibling(element, -1, withRole, excludeDisabled);
};
const findMatchingSibling = (element: ElementOrNull, searchDirection: -1 | 1, withRole: Role, excludeDisabled=true): ElementOrNull => {
  if (!element) return null;
  let next = getSibling(element, searchDirection);
  while (next) {
    if (isMatch(next, withRole, excludeDisabled)) {
      return next;
    }
    next = getSibling(next, searchDirection);
  }
  return null;
};
const getSibling = (element: Element, direction: -1 | 1): ElementOrNull => {
  switch (direction) {
    case  1: return element.nextElementSibling;
    case -1: return element.previousElementSibling;
  }
}

export const ancestor = (element: ElementOrNull, ancestorRole: Role, maxLevels: number = 5): ElementOrNull => {
  if (!element) return null;
  let parent: ElementOrNull = element.parentElement;
  for (let i = 1; i <= maxLevels; i++) {
    if (parent === null) {
      return null;
    } else if (hasRole(parent, ancestorRole)) {
      return parent;
    } else {
      parent = parent.parentElement;
    }
  }
  return null;
};

export const isMatch = (element: ElementOrNull, role: Role, excludeDisabled=true): boolean => {
  return element !== null && hasRole(element, role) && !(excludeDisabled && isDisabled(element));
};

export const isDisabled = (element: ElementOrNull): boolean => {
  return element != null && element.ariaDisabled != null && element.ariaDisabled != 'false';
};

export const hasRole = (element: ElementOrNull, role: Role): boolean => {
  return element != null && element.role == role;
};