const config = require("config");

describe("Sample Test", () => {
    it("should test that true === true", () => {
        expect(true).toBe(true);
    });

    it("should import test config", () => {
        expect(config.get("db.name")).toBe("spendismo-test");
    });
});
