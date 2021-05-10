import "./style.sass";

/**
 * Class for input element.
 */
export class InputFormElement {
  /**
   * Constructor of class
   * @param Object paramsElement
   */
  __paramsForCurrentElement = {};

  /**
   * Public method for generate html element.
   */
  constructor(paramsElement = {}) {
    this.__paramsForCurrentElement = paramsElement;
  }

  /**
   * Public method for generate html element.
   */
  initializeHtmlElement() {
    const elementContainer = document.createElement("div");
    elementContainer.className = "formElementInput";
    elementContainer.appendChild(this.__generateLabelElement());
    elementContainer.appendChild(this.__generateInputElement());
    return elementContainer;
  }

  /**
   * Private method for generate input element.
   */
  __generateInputElement() {
    const elementInput = document.createElement("input");
    elementInput.className = "formElementInput__input";

    if (this.__paramsForCurrentElement.required) {
      elementInput.setAttribute("data-required", true);
    }

    if (this.__paramsForCurrentElement.autofocus) {
      elementInput.autofocus = true;
      setTimeout(() => elementInput.focus(), 0);
    }

    elementInput.setAttribute("type", this.__paramsForCurrentElement.type);
    elementInput.setAttribute("name", this.__paramsForCurrentElement.name);
    elementInput.setAttribute("id", this.__paramsForCurrentElement.id);
    return elementInput;
  }

  /**
   * Private method for generate label element.
   */
  __generateLabelElement() {
    const elementLabel = document.createElement("label");
    elementLabel.className = "formElementInput__label";

    elementLabel.innerHTML = `${
      this.__paramsForCurrentElement.required
        ? "<sup class='formElementInput__required'>*</sup>"
        : ""
    }${this.__paramsForCurrentElement.label}: `;
    elementLabel.setAttribute("for", this.__paramsForCurrentElement.id);
    return elementLabel;
  }
}
