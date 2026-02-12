// Properly mock window.location for all tests
delete (global as any).window.location;
(global as any).window.location = {
  href: '',
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
};