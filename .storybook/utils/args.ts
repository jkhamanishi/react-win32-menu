
import { FC, ComponentProps } from 'react';
import { ArgTypes, Meta } from '@storybook/react-vite';
import { InputType } from 'storybook/internal/types';


interface ArgDetails<T> {
  description: string;
  defaultValue?: T;
  control: InputType['control'];
  options?: InputType['options'];
  type?: string;
}
type ArgsDescription<TArgs> = { [ArgName in keyof TArgs]: ArgDetails<TArgs[ArgName]> };
type MetaArgs<T> = Pick<Meta<T>, 'argTypes' | 'args'>;


function argType<T>({description, defaultValue, control, options, type}: ArgDetails<T>): InputType {
  return {
    control,
    options,
    description,
    table: {
      defaultValue: defaultValue === undefined ? undefined : { summary: defaultValue as string },
      type: !type ? undefined : { summary: type },
    }
  };
}

export function args<T>(desc: ArgsDescription<T>): MetaArgs<FC<T>> {
  const argTypes: Partial<ArgTypes<T>> = {};
  const defaults: Partial<T> = {};
  
  for (const argName in desc) {
    const argDetails = desc[argName];
    argTypes[argName] = argType(argDetails);
    defaults[argName] = argDetails.defaultValue;
  }
  
  return { argTypes, args: defaults };
}

export { type ComponentProps as Props, type Meta }
