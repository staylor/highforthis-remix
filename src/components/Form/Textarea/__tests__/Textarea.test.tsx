import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import Textarea from '@/components/Form/Textarea';

const TEXT_VALUE = 'Run for the border.';

describe('Textarea', () => {
  test('empty', () => {
    const { container } = render(<Textarea />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('add className', () => {
    const { container } = render(<Textarea className="foo" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('onChange', () => {
    test('adding text', () => {
      const func = vi.fn();
      const { getByRole } = render(<Textarea onChange={func} />);
      const value = TEXT_VALUE;
      fireEvent.change(getByRole('textbox'), { target: { value } });

      expect(func).toHaveBeenCalledWith(value);
    });

    test('removing text', () => {
      const func = vi.fn();
      const value = TEXT_VALUE;
      const { getByRole } = render(<Textarea onChange={func} value={value} />);
      fireEvent.change(getByRole('textbox'), { target: { value: '' } });

      expect(func).toHaveBeenCalledWith('');
    });

    test('bad event', () => {
      const func = vi.fn();
      const value = TEXT_VALUE;
      const { getByRole } = render(<Textarea onChange={func} value={value} />);
      fireEvent.change(getByRole('textbox'), { target: { foo: 'bar', value: null } });

      expect(func).toHaveBeenCalledWith('');
    });

    test('bad type', () => {
      const func = vi.fn();
      const value = TEXT_VALUE;
      const { getByRole } = render(<Textarea onChange={func} value={value} />);
      fireEvent.change(getByRole('textbox'), { target: { value: false } });

      expect(func).toHaveBeenCalledWith('');
    });
  });
});
