const Driver = require("../../muber/models/Driver");

const index = async (req, res, next) => {
    res.send({ hi: "there" });
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
module.exports = { index, create, edit };
