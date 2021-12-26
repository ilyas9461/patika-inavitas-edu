/*  */

const { homeIndex, homeIndexGet } = require("../controllers/home/home");
const { vehicleIndexGet, vehicleIndexPost,vehicleIndexPatch,vehicleIndexDelete } = require("../controllers/vehicle/vehicle");
const { deviceIndexGet, deviceIndexPost,deviceIndexPatch,deviceIndexDelete } = require("../controllers/device/device");
const { deviceTypeIndexGet, deviceTypeIndexPost,deviceTypeIndexDelete} =require("../controllers/device_type/device_type");
const {logTemperatureIndexGet, logTemperatureIndexPost}=require("../controllers/log_temperature/log_temperature");
const {logLocationIndexGet, logLocationIndexPost}=require("../controllers/log_location/log_location");

const router = express.Router();

router.route("/home").post(homeIndex).get(homeIndexGet);
// chain methods
router.route("/vehicle")
    .get(vehicleIndexGet)  //conroller functions
    .post(vehicleIndexPost)
    .patch(vehicleIndexPatch)
    .delete(vehicleIndexDelete);

router.route("/device")
    .get(deviceIndexGet)
    .post(deviceIndexPost)
    .patch(deviceIndexPatch)
    .delete(deviceIndexDelete);

router.route("/device_type")
    .get(deviceTypeIndexGet)
    .post(deviceTypeIndexPost)
    .delete(deviceTypeIndexDelete);

router.route("/log_temperature")
    .get(logTemperatureIndexGet)
    .post(logTemperatureIndexPost);

router.route("/log_location")
    .get(logLocationIndexGet)
    .post(logLocationIndexPost);

module.exports = {
    router,
};
