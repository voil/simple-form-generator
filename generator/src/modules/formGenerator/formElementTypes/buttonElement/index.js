import "./style.sass";

/**
 * Class for button element.
 */
export class ButtonFormElement {
  /**
   * @var Object
   * Params for current element.
   */
  __paramsForCurrentElement = {};

  /**
   * Constructor of class
   * @param Object paramsElement
   */
  constructor(paramsElement = {}) {
    this.__paramsForCurrentElement = paramsElement;
  }

  /**
   * Public method for generate html element.
   */
  initializeHtmlElement() {
    const elementContainer = document.createElement("button");
    elementContainer.className = "formElementButton";
    elementContainer.innerHTML = this.__paramsForCurrentElement.label;
    elementContainer.setAttribute("type", this.__paramsForCurrentElement.type);
    return elementContainer;
  }
}
