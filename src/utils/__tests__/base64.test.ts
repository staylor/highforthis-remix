import { describe, expect, test } from 'vitest';
import { base64Encode, base64Decode } from 'src/utils/base64';

describe('base64', () => {
  test('serialization', () => {
    const value = 'lshjgjh34t0934t(*^&*^*^*^*&^KHJHHKJ)';

    const encoded = base64Encode(value);

    expect(encoded).toMatchSnapshot();

    const decoded = base64Decode(encoded);

    expect(decoded).toEqual(value);
  });

  test('unicode', () => {
    const value = 'kj๐ทhkj๐whe80980๐98235๐ด#$%^&*()๐';

    const encoded = base64Encode(value);

    expect(encoded).toMatchSnapshot();

    const decoded = base64Decode(encoded);

    expect(decoded).toEqual(value);
  });
});
