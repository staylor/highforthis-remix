import { describe, expect, test } from 'vitest';
import { cursorToOffset, offsetToCursor } from 'src/utils/connection';

describe('connection', () => {
  test('serialization', () => {
    const value = 7;

    const serialized = offsetToCursor(value);

    expect(serialized).toMatchSnapshot();

    const deserialized = cursorToOffset(serialized);

    expect(deserialized).toEqual(value);
  });
});
