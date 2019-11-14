import { testDate } from "./test.data";

export function mockGlobalDate() {
  const mockDate = new Date(testDate);
  const _Date = Date
  // @ts-ignore
  global.Date = jest.fn(() => mockDate);
  global.Date.UTC = _Date.UTC;
  global.Date.parse = _Date.parse;
  global.Date.now = _Date.now;
}