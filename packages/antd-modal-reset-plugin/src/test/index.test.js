import React from "react";
import renderer from "react-test-renderer";
import modalResetPlugin from "../index";

it("it is a function and return a reactdom", () => {
  expect(typeof modalResetPlugin).toBe("function");
});
