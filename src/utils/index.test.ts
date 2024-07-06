import { isMobile } from './index';

describe('测试utils/index.ts', () => {
  test('isMobile', () => {
    expect(isMobile()).toBe(false);
  });
});
