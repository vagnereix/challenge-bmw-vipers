import { ComponentProps, forwardRef } from 'react';

type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className="border-none rounded text-base px-4 py-3 w-full bg-gray-300 font-semibold text-black"
      />
    );
  },
);
