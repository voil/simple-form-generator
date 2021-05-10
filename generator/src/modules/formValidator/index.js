import "../../support/observerEventsForm";

/**
 * Class module of form validator.
 */
class FormValidator {
  /**
   * Constructor of class.
   */
  constructor() {
    this.__catchAllFormToValidate();
  }

  /**
   * Private method to stop submit form.
   * @param HtmlFormElement currentForm
   */
  __stopSubmitForm(currentForm = null) {
    const typeOfSubmit = currentForm.addEventListener
      ? {
          eventName: "submit",
          methodName: "addEventListener",
        }
      : {
          eventName: "onsubmit",
          methodName: "attachEvent",
        };

    currentForm[typeOfSubmit.methodName](
      typeOfSubmit.eventName,
      (event) => {
        event.preventDefault();
        this.__checkIsFormValidate(currentForm);
      },
      true
    );
  }

  /**
   * Private method to get params element form.
   * @param HtmlFormElement currentForm
   * @return Object
   */
  __getElementsParamsForm(currentForm = null) {
    const currentParamsForm = {};
    [...currentForm.getElementsByTagName("input")].forEach(
      (currentInputElement) => {
        currentParamsForm[currentInputElement.getAttribute("name")] =
          currentInputElement.value;
      }
    );
    return currentParamsForm;
  }

  /**
   * Private method to check is form validate.
   * @param HtmlFormElement currentForm
   */
  __checkIsFormValidate(currentForm = null) {
    currentForm.isValidate = true;
    [...currentForm.getElementsByTagName("input")]
      .filter((currentElement) => currentElement.hasAttribute("data-required"))
      .forEach((currentInputElement) => {
        this.__addRiseInputEvent(currentInputElement);
        this.__setErrorWarningElement(currentInputElement);

        currentForm.isValidate =
          currentInputElement.value.trim() === ""
            ? false
            : currentForm.isValidate;
        currentInputElement.className = `formElementInput__input ${
          currentInputElement.value.trim() === ""
            ? "formElementInput__input--error"
            : ""
        }`;
      });
    if (currentForm.isValidate) {
      this.__submitForm(currentForm, this.__getElementsParamsForm(currentForm));
    }
  }

  /**
   * Private method to attach error warning element.
   * @param HtmlInputElement currentInputElement
   */
  __setErrorWarningElement(currentInputElement) {
    if (
      !currentInputElement.hasAttribute("data-required") ||
      currentInputElement.parentNode.getElementsByClassName(
        "formElementInput__error"
      ).length > 0
    ) {
      return;
    }

    const elementSpanError = document.createElement("span");
    elementSpanError.className = "formElementInput__error";
    elementSpanError.innerHTML = "Pole jest wymagane.";

    currentInputElement.parentNode.appendChild(elementSpanError);
  }

  /**
   * Private method to submit form.
   * @param HtmlFormElement currentForm
   * @param Object currentParamsForm
   */
  __submitForm(currentForm, currentParamsForm) {
    if (
      !window.ObserverEventsForm.getAttachedEvent(
        `handleFireEventSubmitForm_${currentForm.id}`
      )
    ) {
      currentForm.submit();
    } else {
      window.ObserverEventsForm.riseEvent(
        `handleFireEventSubmitForm_${currentForm.id}`
      )(currentForm, currentParamsForm);
    }
  }

  /**
   * Private method to rise input events.
   * @param HtmlInputElement currentInputElement
   */
  __addRiseInputEvent(currentInputElement) {
    if (currentInputElement.oninput) {
      return;
    }
    currentInputElement.oninput = function () {
      this.className = `formElementInput__input ${
        this.value.trim() === "" ? "formElementInput__input--error" : ""
      }`;
    };
  }

  /**
   * Private method to catch form validate.
   */
  __catchAllFormToValidate() {
    document.getElementsByTagName("form").forEach((currentForm) => {
      if (currentForm.hasAttribute("data-validate")) {
        this.__stopSubmitForm(currentForm);
      }
    });
  }
}

/**
 * Function to inizialize class form validator.
 */
export function initialize() {
  window.FormValidatorInitializeted = true;
  return new FormValidator();
}
