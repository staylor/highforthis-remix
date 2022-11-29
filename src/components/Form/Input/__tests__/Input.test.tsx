import { describe, expect, test, vi } from 'vitest';
import Input from 'components/Form/Input';
import { render, fireEvent } from '@testing-library/react';

const TEXT_VALUE = 'Run for the border.';

describe('Input', () => {
  test('empty', () => {
    const { container } = render(<Input />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild.value).toEqual('');
  });

  test('add className', () => {
    const { container } = render(<Input className="foo" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('onChange', () => {
    test('adding text', () => {
      const func = vi.fn();
      const { getByRole } = render(<Input onChange={func} />);
      const value = TEXT_VALUE;
      fireEvent.change(getByRole('textbox'), { target: { value } });

      expect(func).toHaveBeenCalledWith(value);
    });

    test('removing text', () => {
      const func = vi.fn();
      const value = TEXT_VALUE;
      const { getByRole } = render(<Input onChange={func} value={value} />);
      fireEvent.change(getByRole('textbox'), { target: { value: '' } });

      expect(func).toHaveBeenCalledWith('');
    });

    test('bad event', () => {
      const func = vi.fn();
      const value = TEXT_VALUE;
      const { getByRole } = render(<Input onChange={func} value={value} />);
      fireEvent.change(getByRole('textbox'), { target: { foo: 'bar', value: null } });

      expect(func).toHaveBeenCalledWith('');
    });

    test('bad type', () => {
      const func = vi.fn();
      const value = TEXT_VALUE;
      const { getByRole } = render(<Input onChange={func} value={value} />);
      fireEvent.change(getByRole('textbox'), { target: { value: false } });

      expect(func).toHaveBeenCalledWith('');
    });
  });
});
