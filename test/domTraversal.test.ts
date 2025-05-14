import { ARIARoleDefinitionKey as Role } from "aria-query";
import { ancestor, firstChild, hasRole, isDisabled, isMatch, lastChild, nextSibling, prevSibling } from "../src/utils/domTraversal";


const createElement = (role?: Role, disabled?: string | boolean) => {
  const div = document.createElement('div');
  if (role) div.setAttribute('role', role);
  if (disabled === true) div.setAttribute('aria-disabled', 'true');
  if (typeof disabled === 'string') div.setAttribute('aria-disabled', disabled);
  return div;
}

describe('domTraversal', () => {
  describe('hasRole()', () => {
    it('should return true if element has the matching explicit role', () => {
      const div = createElement('button');
      expect(hasRole(div, 'button')).toBe(true);
    });
    
    it('should return false if element has a different explicit role', () => {
      const div = createElement('dialog');
      expect(hasRole(div, 'button')).toBe(false);
    });
    
    it('returns false when the element has no explicit role', () => {
      const div = document.createElement('div');
      expect(hasRole(div, 'button')).toBe(false);
    });
  });
  
  describe('isDisabled()', () => {
    it('should return true if element is explicitly ARIA disabled', () => {
      const div = createElement(undefined, true);
      expect(isDisabled(div)).toBe(true);
    });
    
    it('should return true if element is ARIA disabled with no value', () => {
      const div = createElement(undefined, '');
      expect(isDisabled(div)).toBe(true);
    });
    
    it('should return false if element has no aria-disabled attribute', () => {
      const div = document.createElement('div');
      expect(isDisabled(div)).toBe(false);
    });
    
    it('should return false if element has aria-disabled attribute as false', () => {
      const div = createElement(undefined, 'false');
      expect(isDisabled(div)).toBe(false);
    });
  });
  
  describe('isMatch()', () => {
    it('should return true if role is matched', () => {
      const div = createElement('button');
      expect(isMatch(div, 'button')).toBe(true);
    });
    
    it('should return false if role is different', () => {
      const div = createElement('dialog');
      expect(isMatch(div, 'button')).toBe(false);
    });
    
    it('should return false if role is matched but is disabled', () => {
      const div = createElement('button', true);
      expect(isMatch(div, 'button')).toBe(false);
    });
    
    it('should return true when excludeDisabled is false and role is matched', () => {
      const div = createElement('button', true);
      expect(isMatch(div, 'button', false)).toBe(true);
    });
  });
  
  describe('ancestor()', () => {
    const div = document.createElement('div');
    const child = createElement('menuitem');
    child.appendChild(div);
    const parent = createElement('menu');
    parent.appendChild(child);
    const grandparent = createElement('menubar');
    grandparent.appendChild(parent);
    
    it('should return the closest ancestor with matching role', () => {
      expect(ancestor(div, 'menuitem')).toBe(child);
      expect(ancestor(div, 'menu')).toBe(parent);
      expect(ancestor(div, 'menubar')).toBe(grandparent);
    });
    
    it('should return null if no ancestor has role', () => {
      expect(ancestor(div, 'dialog')).toBeNull();
    });
    
    it('should return null if ancestor with role is past maxLevels', () => {
      expect(ancestor(div, 'menubar', 3)).toBe(grandparent);
      expect(ancestor(div, 'menubar', 2)).toBeNull();
    });
  });
  
  describe('nextSibling()', () => {
    const element = createElement('menuitem');
    const sibling1 = createElement('button');
    const sibling2 = createElement('menuitem', true);
    const sibling3 = createElement('menuitem');
    const container = createElement('menu');
    container.appendChild(element);
    container.appendChild(sibling1);
    container.appendChild(sibling2);
    container.appendChild(sibling3);
    
    it('should return the next matched sibling that is not disabled', () => {
      expect(nextSibling(element, 'button')).toBe(sibling1);
      expect(nextSibling(element, 'menuitem')).not.toBe(sibling2);
      expect(nextSibling(element, 'menuitem')).toBe(sibling3);
    });
    
    it('should return any next matched sibling if excludeDisabled is false', () => {
      expect(nextSibling(element, 'menuitem', false)).toBe(sibling2);
      expect(nextSibling(element, 'menuitem', false)).not.toBe(sibling3);
    });
  });
  
  describe('prevSibling()', () => {
    const sibling3 = createElement('menuitem');
    const sibling2 = createElement('menuitem', true);
    const sibling1 = createElement('button');
    const element = createElement('menuitem');
    const container = createElement('menu');
    container.appendChild(sibling3);
    container.appendChild(sibling2);
    container.appendChild(sibling1);
    container.appendChild(element);
    
    it('should return the previous matched sibling that is not disabled', () => {
      expect(prevSibling(element, 'menuitem')).toBe(sibling3);
      expect(prevSibling(element, 'menuitem')).not.toBe(sibling2);
      expect(prevSibling(element, 'button')).toBe(sibling1);
    });
    
    it('should return any previous matched sibling if excludeDisabled is false', () => {
      expect(prevSibling(element, 'menuitem', false)).not.toBe(sibling3);
      expect(prevSibling(element, 'menuitem', false)).toBe(sibling2);
    });
  });
  
  describe('', () => {
    const child1 = createElement('menuitem', true);
    const child2 = createElement('button');
    const child3 = createElement('menuitem');
    const child4 = createElement('button');
    const child5 = createElement('menuitem', true);
    const parent = createElement('menu');
    parent.appendChild(child1);
    parent.appendChild(child2);
    parent.appendChild(child3);
    parent.appendChild(child4);
    parent.appendChild(child5);
    
    describe('firstChild()', () => {
      it('should return the first matching child that is not disabled', () => {
        expect(firstChild(parent, 'button')).toBe(child2);
        expect(firstChild(parent, 'menuitem')).toBe(child3);
      });
      it('should return the first matching child if excludeDisabled is false', () => {
        expect(firstChild(parent, 'menuitem', false)).toBe(child1);
      });
    });
    
    describe('lastChild()', () => {
      it('should return the last matching child that is not disabled', () => {
        expect(lastChild(parent, 'menuitem')).toBe(child3);
        expect(lastChild(parent, 'button')).toBe(child4);
      });
      it('should return the last matching child if excludeDisabled is false', () => {
        expect(lastChild(parent, 'menuitem', false)).toBe(child5);
      });
    });
  });
});
