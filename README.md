# react-win32-menu

![NPM Version](https://img.shields.io/npm/v/react-win32-menu)
![NPM Downloads](https://img.shields.io/npm/dt/react-win32-menu)
![NPM License](https://img.shields.io/npm/l/react-win32-menu)

React components resembling Win32 desktop menus

## Installation
```
npm install react-win32-menu --save
```

## Usage
Check out the [Package Storybook](http://jkhamanishi.github.io/react-win32-menu) for the full documentation, API, and more examples. 


```tsx
import { Win32MenuBar, MenuItem, RootMenu, SubMenu } from "react-win32-menu";

function ExampleMenuBar() {
  return (
    <Win32MenuBar>
      <RootMenu label="label">
        <MenuItem label="label" />
        <MenuItem label="label" />
        <SubMenu label="label">
          <MenuItem label="label" />
          <MenuItem label="label" />
          <MenuItem label="label" />
        </SubMenu>
      </RootMenu>
    </Win32MenuBar>
  );
}

export default ExampleMenuBar;
```
