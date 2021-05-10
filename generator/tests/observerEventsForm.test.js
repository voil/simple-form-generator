import "../src/support/observerEventsForm.js";
import { describe, it, expect, beforeEach } from "jest-without-globals";

describe("Test observerEventsForm methods.", () => {
  let ObserverEventsForm = null;

  beforeEach(() => {
    ObserverEventsForm = window.ObserverEventsForm;
  });

  it("should have one event in.", () => {
    ObserverEventsForm.attachEvent("eventTest", () => {
      return true;
    });
    expect(ObserverEventsForm.getAttachedEvent("eventTest")).not.toEqual(false);
  });

  it('should return function whit "test" string on return.', () => {
    ObserverEventsForm.attachEvent("eventTest", () => {
      return "test";
    });
    expect(ObserverEventsForm.riseEvent("eventTest")()).toEqual("test");
  });
});
