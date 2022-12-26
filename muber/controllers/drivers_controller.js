const Driver = require("../models/Driver");

const index = async (req, res, next) => {
    try {
        const { lng, lat } = req.query;
        const point = {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
        };
        const drivers = await Driver.aggregate([
            {
                $geoNear: {
                    near: point,
                    spherical: true,
                    maxDistance: 200000,
                    distanceField: "dist.calculated",
                },
            },
        ]);
        res.send(drivers);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.send(driver);
    } catch (err) {
        next(err);
    }
};
const edit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const driver = req.body;
        const response = await Driver.findOneAndUpdate({ _id: id }, driver);
        res.send(driver);
    } catch (err) {
        next(err);
    }
};
const deleteDriver = async (req, res, next) => {
    const driverId = req.params.id;
    try {
        const driver = await Driver.findByIdAndRemove({ _id: driverId });
        res.status(204).send(driver);
    } catch (err) {
        next(err);
    }
};
module.exports = { index, create, edit, deleteDriver };
