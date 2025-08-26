
import { ComponentProps, FC } from 'react';
import { ArgTypes, Meta } from '@storybook/react';
import { InputType } from 'storybook/internal/types';


interface ArgDetails<T> {
  description: string;
  defaultValue: T;
  control: InputType['control'];
  options?: InputType['options'];
}
type Args<T extends FC> = ComponentProps<T>;
type ArgsDescription<TArgs> = { [ArgName in keyof TArgs]: ArgDetails<TArgs[ArgName]> };
type MetaArgs<T> = Pick<Meta<T>, 'argTypes' | 'args'>;


function argType<T>({description, defaultValue, control, options}: ArgDetails<T>): InputType {
  return {
    control,
    options,
    description,
    table: {
      defaultValue: { summary: defaultValue as string },
    }
  };
}

export function args<
  T extends FC,
  TArgs extends Args<T> = Args<T>
>(
  desc: ArgsDescription<TArgs>
): MetaArgs<T> {
  const argTypes: Partial<ArgTypes<TArgs>> = {};
  const defaults: Partial<TArgs> = {};
  
  for (const argName in desc) {
    const argDetails = desc[argName];
    argTypes[argName] = argType(argDetails);
    defaults[argName] = argDetails.defaultValue;
  }
  
  return { argTypes, args: defaults };
}
