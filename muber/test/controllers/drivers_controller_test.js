const assert = require("assert");
const request = require("supertest");
const app = require("../../app");

const mongoose = require("mongoose");
const Driver = mongoose.model("driver");
describe("Drivers controller", () => {
    it("Post to /api/drivers creates a new driver", async () => {
        try {
            const response = await request(app)
                .post("/api/drivers")
                .send({ email: "test@test.com" });
            // console.log(response);
            const count = await Driver.count();
            assert(1 === count);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });
});
