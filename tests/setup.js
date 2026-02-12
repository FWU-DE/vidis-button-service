// Mock window.location for all tests to prevent JSDOM navigation errors
delete global.window.location;
global.window.location = {
  href: '',
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
};