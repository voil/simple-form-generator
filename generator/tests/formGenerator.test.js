import { describe, it, expect, beforeEach, act } from "jest-without-globals";
import { initialize as initializeGenerator } from "../src/modules/formGenerator/index.js";

describe("Test formGenerator methods.", () => {
  const schemeForm = [
    {
      id: "fr-email",
      type: "email",
      name: "email",
      label: "Adres e-mail",
      autofocus: true,
    },
    {
      type: "submit",
      label: "Zarejestruj",
    },
  ];

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="form-register" class="form"></form>
    `;
  });

  it("should have generate form and call function.", async () => {
    const mockFn = jest.fn(() => {});

    const formInstance = initializeGenerator("form-register", schemeForm);
    formInstance.handleBulidDynamicForm();
    formInstance.onSubmit(mockFn);

    formInstance.onLoad((form) => {
      const buttonsElements = [...form.getElementsByTagName("button")];
      buttonsElements[0].click();

      expect(mockFn).toHaveBeenCalled();
    });
  });

  it("should have generate form.", () => {
    const formInstance = initializeGenerator("form-register", schemeForm);
    formInstance.handleBulidDynamicForm();

    formInstance.onLoad((form) => {
      const inputsElements = [...form.getElementsByTagName("input")];
      expect(inputsElements.length).toEqual(1);

      expect(inputsElements[0].getAttribute("type")).toEqual("email");
      expect(inputsElements[0].getAttribute("id")).toEqual("fr-email");
      expect(inputsElements[0].getAttribute("name")).toEqual("email");
      expect(inputsElements[0].hasAttribute("autofocus")).toEqual(true);

      const labelsElements = [...form.getElementsByTagName("label")];
      expect(labelsElements[0].innerHTML).toEqual("Adres e-mail: ");

      const buttonsElements = [...form.getElementsByTagName("button")];
      expect(buttonsElements.length).toEqual(1);

      expect(buttonsElements[0].innerHTML).toEqual("Zarejestruj");
    });
  });
});
