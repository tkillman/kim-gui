import FirstKim from "../../src/components/kim/FirstKim";

describe("FirstKim", () => {
  it("renders label correctly", () => {
    cy.mount(<FirstKim title="확인" />);
    cy.contains("확인").should("be.visible");
  });
});
