/**
 * Test for SPA remounting scenario (e.g., React Router navigation)
 * This test verifies that the vidis-login component can be mounted,
 * unmounted, and remounted multiple times without errors.
 */

describe("VidisLogin - SPA Remount Behavior", () => {
  beforeEach(() => {
    // Clean up any existing elements
    document.body.innerHTML = "";
  
    // Mock window.location to avoid JSDOM navigation errors
    delete (window as any).location;
    (window as any).location = { href: '' };
  });
  it("should handle multiple mount/unmount cycles without errors", async () => {
    const createAndMountComponent = () => {
      const element = document.createElement("vidis-login");
      element.setAttribute("loginurl", "https://example.com/auth");
      document.body.appendChild(element);
      return element;
    };

    const unmountComponent = (element: HTMLElement) => {
      element.remove();
    };

    // First mount
    const firstMount = createAndMountComponent();
    expect(document.querySelector("vidis-login")).toBeTruthy();

    // First unmount
    unmountComponent(firstMount);
    expect(document.querySelector("vidis-login")).toBeFalsy();

    // Second mount - this would fail with the old code
    const secondMount = createAndMountComponent();
    expect(document.querySelector("vidis-login")).toBeTruthy();

    // Second unmount
    unmountComponent(secondMount);

    // Third mount
    const thirdMount = createAndMountComponent();
    expect(document.querySelector("vidis-login")).toBeTruthy();

    // Cleanup
    unmountComponent(thirdMount);
  });

  it("should not redefine vidis-login-vue-app custom element", () => {
    const spy = jest.spyOn(customElements, "define");

    // First mount
    const first = document.createElement("vidis-login");
    document.body.appendChild(first);

    // Get initial call count for vidis-login-vue-app
    const initialCalls = spy.mock.calls.filter(
      (call) => call[0] === "vidis-login-vue-app"
    ).length;

    // Second mount
    const second = document.createElement("vidis-login");
    document.body.appendChild(second);

    // Should not have additional calls for vidis-login-vue-app
    const finalCalls = spy.mock.calls.filter(
      (call) => call[0] === "vidis-login-vue-app"
    ).length;

    expect(finalCalls).toBe(initialCalls);

    // Cleanup
    first.remove();
    second.remove();
    spy.mockRestore();
  });

  it("should create functional components on each mount", async () => {
    // Mock window.location.href setter to prevent navigation errors
    const originalLocation = window.location;
    delete (window as any).location;
    (window as any).location = { 
      href: '',
      ...originalLocation 
    };
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: ''
    });

    // First mount cycle
    const first = document.createElement("vidis-login");
    first.setAttribute("loginurl", "https://example.com/auth");
    document.body.appendChild(first);
  
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(first.shadowRoot).toBeTruthy();
  
    first.remove();

    // Second mount cycle
    const second = document.createElement("vidis-login");
    second.setAttribute("loginurl", "https://example.com/auth2");
    document.body.appendChild(second);
  
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(second.shadowRoot).toBeTruthy();
  
    second.remove();
  
    // Restore original location
    (window as any).location = originalLocation;
  });
});
