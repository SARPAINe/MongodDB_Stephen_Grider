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

    it("Post to /api/drivers requires an email", async () => {
        try {
            const response = await request(app).post("/api/drivers").send({});
            assert(response.body.error);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });

    it("Put to /api/drivers/id can update a record", async () => {
        try {
            const driver = new Driver({
                email: "test@test.com",
                driving: false,
            });
            await driver.save();
            const response = await request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true });
            const foundDriver = await Driver.findOne({
                email: "test@test.com",
            });
            assert(foundDriver.driving === true);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
        const driver = new Driver({ email: "test@test.com", driving: false });
    });

    it("Delete to /api/drivers/:id can delete a record", async () => {
        try {
            const driver = new Driver({ email: "test34@test.com" });
            await driver.save();
            const response = await request(app).delete(
                `/api/drivers/${driver._id}`
            );
            const count = await Driver.count();
            assert(count === 0);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });

    it("Get to /api/drivers finds drivers in a location", async () => {
        const seattleDriver = new Driver({
            email: "seattle@test.com",
            geometry: {
                type: "Point",
                coordinates: [-122.4759902, 47.6147628],
            },
        });
        const miamiDriver = new Driver({
            email: "miami@test.com",
            geometry: { type: "Point", coordinates: [-80.2534507, 25.791581] },
        });

        let x = await Promise.all([seattleDriver.save(), miamiDriver.save()]);
        let response = await request(app).get("/api/drivers?lng=-80&lat=25");
        console.log(response.body);
        // Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
        //     request(app)
        //         .get("/api/drivers?lng=-80&lat=25")
        //         .end((err, response) => {
        //             assert(response.body.length === 1);
        //             assert(response.body[0].obj.email === "miami@test.com");
        //             done();
        //         });
        // });
    });
});
