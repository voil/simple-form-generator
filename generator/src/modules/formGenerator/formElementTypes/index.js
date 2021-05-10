/**
 * Class for element html context.
 */
class FormElementsContext {
  /**
   * @var ElementClass
   * Reference to element class.
   */
  __currentStrategyElementType = null;

  /**
   * Method to set strategy class for current use.
   * @param ElementClass elementType
   */
  setStrategyElementType(elementType) {
    this.__currentStrategyElementType = elementType;
  }

  /**
   * Method to build html element.
   * @return HTMLElement
   */
  handleBulidElement() {
    return this.__currentStrategyElementType.initializeHtmlElement();
  }
}

export default new FormElementsContext();
