import { describe, expect, test } from 'vitest';
import { uploadUrl } from 'src/utils/media';

describe('media', () => {
  test('uploadUrl', () => {
    const url = uploadUrl('2018/01/31', 'foo.png');

    expect(url).toMatchSnapshot();
  });
});
