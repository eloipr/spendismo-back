const ExpenseDBManager = require("../../db/ExpenseDBManager");

describe("ExpenseDBManager", () => {
    describe("getAll expenses of the logged user", () => {
        it("should return 0 expenses without errors", () => {
            ExpenseDBManager.getAll(
                "eloi",
                expenses => {
                    expect(expenses.lenght).toBe(0);
                },
                error => {
                    expect(error).toBeNull();
                }
            );
        });
    });
});
