import React from "react";
import renderer from "react-test-renderer";
import Index from "../pages/index";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      page: "1",
    },
    beforePopState: require("next/router"),
  })),
}));

it("renders homepage unchanged", () => {
  const tree = renderer.create(<Index />).toJSON();
  expect(tree).toMatchSnapshot();
});
