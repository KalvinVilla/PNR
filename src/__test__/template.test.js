import { load_template } from "../template.js";

describe("testing mail", () => {
  it("send", async () => {
    expect(await load_template("test")).toBe("<h1>Hello</h1>");
  });
});
