import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe(`<Button />`, () => {
  it(`should render correctly`, () => {
    render(<Button>Label</Button>);

    expect(screen.getByRole(`button`, { name: /label/i })).toBeInTheDocument();
  });

  it(`should receive props correctly`, () => {
    render(
      <Button type="submit" title="Label title">
        Label
      </Button>,
    );

    const button = screen.getByRole(`button`, { name: /label/i });
    expect(button).toHaveAttribute(`type`, `submit`);
    expect(button).toHaveAttribute(`title`, `Label title`);
  });
});
