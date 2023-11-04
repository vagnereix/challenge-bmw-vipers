import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="flex justify-center items-center w-full mt-2 px-4 py-3 bg-gray-300 text-white font-semibold rounded tex-lg hover:shadow-md transition hover:translate-y-0.5"
    />
  );
}
