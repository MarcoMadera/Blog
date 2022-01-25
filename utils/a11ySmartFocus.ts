/**
 * Focus and element by default it will focus the h1, main or body, the first element that exist
 * @param element HTMLElement
 */
export default function a11ySmartFocus(element?: HTMLElement): void {
  const elementToFocus =
    element ??
    (document.querySelector("h1") ||
      document.querySelector("main") ||
      document.body);

  if (elementToFocus) {
    const didTabIndexExist = elementToFocus.getAttribute("tabIndex");

    // Only elements with a tabIndex are focusable. So we add a tabIndex here just to make it focusable.
    if (!didTabIndexExist) {
      elementToFocus.setAttribute("tabIndex", "-1");
    }

    elementToFocus.focus();

    // Once the focus leaves the element, we should clean up the tabIndex, if we added one. This is so the screen-reader
    // does not try to focus the element for purposes other than the initial client-navigation.
    if (!didTabIndexExist) {
      elementToFocus.addEventListener("blur", () => {
        elementToFocus.removeAttribute("tabIndex");
      });
    }
  }
}
