import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import Message from '@/components/Form/Message';

describe('Message', () => {
  test('empty', () => {
    const { container } = render(<Message />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('text', () => {
    const { container } = render(<Message text="This is an admin message." />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
