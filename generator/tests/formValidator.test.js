import { initialize } from "../src/modules/formValidator/index.js";
import { describe, it, expect, beforeEach } from "jest-without-globals";

describe("Test formValidator methods.", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="form-register" class="form" data-validate>
        <div>
          <label for="fr-email">
            <sup class="formElementInput__required">*</sup>
            Adres e-mail:
          </label>
          <input id="inputElement" data-required="true" autofocus="" type="email" name="email" id="fr-email">
          <button id="buttonSubmit" type="submit">Zarejestruj</button>
        </div>
      </form>
    `;
    initialize();
  });

  it("should have error class for required input.", () => {
    document.getElementById("buttonSubmit").click();
    expect(document.getElementById("inputElement").className).toEqual(
      "formElementInput__input formElementInput__input--error"
    );
  });

  it("should have error message element.", () => {
    document.getElementById("buttonSubmit").click();
    expect(
      document
        .getElementById("inputElement")
        .parentNode.getElementsByClassName("formElementInput__error").length > 0
    ).toEqual(true);
  });
});
