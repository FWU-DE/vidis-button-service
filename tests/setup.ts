// Mock window.location globally to prevent JSDOM navigation errors
Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    href: '',
    origin: 'http://localhost',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
  },
});