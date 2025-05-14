import { ancestor, firstChild, hasRole, lastChild, nextSibling, prevSibling } from "./domTraversal";

type ElementOrNull = Element | null;


export const isRootMenu = (currentMenu: ElementOrNull): boolean => {
  return currentMenu != null && hasRole(currentMenu, 'menuitem') && hasRole(currentMenu.parentElement, 'menubar');
};

export const lastChildMenu = (currentMenu: ElementOrNull): ElementOrNull => {
  const childMenus = firstChild(currentMenu, 'menu');
  return lastChild(childMenus, 'menuitem');
};
export const firstChildMenu = (currentMenu: ElementOrNull): ElementOrNull => {
  const childMenus = firstChild(currentMenu, 'menu');
  return firstChild(childMenus, 'menuitem');
};

const currentRootMenu = (currentMenu: ElementOrNull): ElementOrNull => {
  if (isRootMenu(currentMenu)) return currentMenu;
  const menubar = ancestor(currentMenu, 'menubar', 10);
  if (menubar) {
    for (const rootMenu of menubar.children) {
      if (rootMenu.contains(currentMenu)) return rootMenu;
    }
  }
  return null;
}

export const nextRootMenu = (currentMenu: ElementOrNull, direction: 'LEFT' | 'RIGHT'): ElementOrNull => {
  const thisRootMenu = currentRootMenu(currentMenu);
  switch (direction) {
    case 'LEFT':  return prevSibling(thisRootMenu, 'menuitem');
    case 'RIGHT': return nextSibling(thisRootMenu, 'menuitem');
  }
};

export const parentMenu = (activeMenu: ElementOrNull): ElementOrNull => {
  return ancestor(activeMenu, 'menuitem');
};

export const nextMenu = (activeMenu: ElementOrNull, direction: 'UP' | 'DOWN'): ElementOrNull => {
  const findSibling = (direction === 'DOWN') ? nextSibling : prevSibling;
  const nextMenu = findSibling(activeMenu, 'menuitem');
  if (nextMenu) {
    return nextMenu;
  } else {
    const subMenus = ancestor(activeMenu, 'menu');
    const findChild = (direction === 'DOWN') ? firstChild : lastChild;
    return findChild(subMenus, 'menuitem');
  }
};
