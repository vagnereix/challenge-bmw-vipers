import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from '../Input';
import { Ref } from 'react';

describe(`<Input />`, () => {
  it(`should render correctly`, () => {
    render(<Input />);

    expect(screen.getByRole(`textbox`)).toBeInTheDocument();
  });

  it(`should receive props correctly`, () => {
    render(<Input type="email" title="email" />);

    const input = screen.getByRole(`textbox`);
    expect(input).toHaveAttribute(`type`, `email`);
    expect(input).toHaveAttribute(`title`, `email`);
  });

  it(`should apply forward ref correctly`, () => {
    const ref: Ref<HTMLInputElement> = { current: null };
    render(<Input ref={ref} type="email" title="email" />);

    const input = screen.getByRole(`textbox`);
    fireEvent.change(input, { target: { value: `vagnereix.dev@gmail.com` } });

    expect(ref.current?.value).toBe(`vagnereix.dev@gmail.com`);
  });
});
