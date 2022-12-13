const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
    it("requires a user name", () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name.properties;
        assert(message === "Name is required.");
    });
    it("requires a user name to be longer than 2 characters", () => {
        const user = new User({ name: "ab" });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name.properties;
        assert(
            message ===
                `Name length should be greater than 2 characters, currently given ${user.name.length} characters.`
        );
    });

    it("disallows invalid records from being saved", (done) => {
        const user = new User({ name: "Al" });
        user.save().catch((validationResult) => {
            const { message } = validationResult.errors.name;
            assert(
                message ===
                    `Name length should be greater than 2 characters, currently given ${user.name.length} characters.`
            );
            done();
        });
    });
});
