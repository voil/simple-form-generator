import "../../support/observerEventsForm";
import FormElementsContext from "./formElementTypes";

/**
 * Class module of form generator.
 */
class FormGenerator {
  /**
   * @var HtmlFormElement | null
   * Reference to form element.
   */
  __instanceForm = null;

  /**
   * @var Object
   * Object of scheme generator.
   */
  __formSchemeToGenerate = [];

  /**
   * @var Object
   * Dictionary of scheme elements.
   */
  __dictionaryMapOfTypesToHtmlElements = {
    email: "input",
    reset: "button",
    submit: "button",
    password: "input",
    login: "input",
  };

  /**
   * Constructor of class.
   * @param String formSelector
   * @param Array<Object> formScheme
   */
  constructor(formSelector = "", formScheme = []) {
    this.__getInstanceOfForm(formSelector);
    this.__formSchemeToGenerate = formScheme;
  }

  /**
   * Public method to generate dynamic form.
   */
  handleBulidDynamicForm() {
    this.__validateArgumentsSchemeOfForm();
    if (!this.__instanceForm) {
      return;
    }

    this.__injectConvertedTypeFormToHtmlElement(
      this.__formSchemeToGenerate[0],
      0
    );
  }

  /**
   * Public method to fire callback when form generated.
   * @throw Error
   */
  onLoad(callback = (instanceForm) => {}) {
    window.ObserverEventsForm.attachEvent(
      `handleFireEventFormLoaded_${this.__instanceForm.id}`,
      callback
    );
  }

  /**
   * Public method to fire when submit event generated.
   * @param Function callback
   * @throw Error
   */
  onSubmit(callback = (instanceForm, paramForm) => {}) {
    window.ObserverEventsForm.attachEvent(
      `handleFireEventSubmitForm_${this.__instanceForm.id}`,
      callback
    );
  }

  /**
   * Private method to stop submit form.
   */
  __handleStopSubmitForm() {
    if (
      (window.FormValidatorInitializeted &&
        this.__instanceForm.hasAttribute("data-validate")) ||
      !window.ObserverEventsForm.getAttachedEvent(
        `handleFireEventSubmitForm_${this.__instanceForm.id}`
      )
    ) {
      return;
    }
    const typeOfSubmit = this.__instanceForm.addEventListener
      ? {
          eventName: "submit",
          methodName: "addEventListener",
        }
      : {
          eventName: "onsubmit",
          methodName: "attachEvent",
        };

    this.__instanceForm[typeOfSubmit.methodName](
      typeOfSubmit.eventName,
      (event) => {
        event.preventDefault();
        window.ObserverEventsForm.riseEvent(
          `handleFireEventSubmitForm_${this.__instanceForm.id}`
        )(this.__instanceForm, this.__getElementsParamsForm());
      },
      true
    );
  }

  /**
   * Private method to get params element form.
   * @throw Object
   */
  __getElementsParamsForm() {
    const currentParamsForm = {};
    [...this.__instanceForm.getElementsByTagName("input")].forEach(
      (currentInputElement) => {
        currentParamsForm[currentInputElement.getAttribute("name")] =
          currentInputElement.value;
      }
    );
    return currentParamsForm;
  }

  /**
   * Private method to check arguemtn scheme of form.
   * @throw Error
   */
  __validateArgumentsSchemeOfForm() {
    if (!Array.isArray(this.__formSchemeToGenerate)) {
      throw new Error(`Scheme form must by array type`);
    }
  }

  /**
   * Private method to convert type scheme to form html element
   * @param Object formElementFromScheme
   * @param Number indexElement
   */
  async __injectConvertedTypeFormToHtmlElement(
    formElementFromScheme = {},
    indexElement = 0
  ) {
    if (indexElement >= this.__formSchemeToGenerate.length) {
      this.__handleStopSubmitForm();
      window.ObserverEventsForm.riseEvent(
        `handleFireEventFormLoaded_${this.__instanceForm.id}`
      )(this.__instanceForm);
      return;
    }
    if (
      !this.__validateElementSchemeType(formElementFromScheme, indexElement)
    ) {
      return;
    }
    const FormElementStrategy = await this.__handleFetchDynamicElementModule(
      this.__dictionaryMapOfTypesToHtmlElements[formElementFromScheme.type]
    );
    FormElementsContext.setStrategyElementType(
      new FormElementStrategy(formElementFromScheme)
    );
    this.__instanceForm.appendChild(
      await FormElementsContext.handleBulidElement()
    );

    indexElement++;
    this.__injectConvertedTypeFormToHtmlElement(
      this.__formSchemeToGenerate[indexElement],
      indexElement
    );
  }

  /**
   * Private method to get dynamical html element strategy.
   * @param String elementStrategyName
   */
  async __handleFetchDynamicElementModule(elementStrategyName = "") {
    return (
      await import(
        /* webpackChunkName: "[request]" */
        /* webpackMode: "lazy" */
        `./formElementTypes/${elementStrategyName}Element/index.js`
      )
    )[`${this.__toUpperFirstLetter(elementStrategyName)}FormElement`];
  }

  /**
   * Private method to validate element scheme.
   * @param Object formElementFromScheme
   * @param Number indexElement
   */
  __validateElementSchemeType(formElementFromScheme = {}, indexElement = 0) {
    if (
      !formElementFromScheme.type ||
      !this.__dictionaryMapOfTypesToHtmlElements[formElementFromScheme.type]
    ) {
      console.warn(
        `One of the schema elements will not be rendered index: "${indexElement}" because it has no types or an unsupported type was given. Supported Types: ${Object.keys(
          this.__dictionaryMapOfTypesToHtmlElements
        ).join(", ")}`
      );
      return false;
    }
    return true;
  }

  /**
   * Private method to get form element instance.
   * @param String formSelector
   */
  __getInstanceOfForm(formSelector = "") {
    this.__instanceForm = document.getElementById(formSelector);
    if (!this.__instanceForm) {
      throw new Error(
        `Form of selector ${formSelector} not exists in html dom.`
      );
    }
  }

  /**
   * Method to change first letter of text to upper case.
   * @param String textToChange
   * @return String
   */
  __toUpperFirstLetter(textToChange = "") {
    return textToChange.charAt(0).toUpperCase() + textToChange.slice(1);
  }
}

/**
 * Function to inizialize class form generator.
 */
export function initialize(formSelector = "", formScheme = []) {
  return new FormGenerator(formSelector, formScheme);
}
