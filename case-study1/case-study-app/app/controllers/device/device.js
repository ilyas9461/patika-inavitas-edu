const { pg_client } = require("../../adapters/database/postgresql");

const deviceIndexGet = (req, res) => {
  let queryToDo =
    "Select  devices.id, vehicles.vehicle_plate, devices.device_name, devices.is_online, devices.is_active" +
    " from devices  inner join vehicles on devices.vehicle_id=vehicles.id ";
  /*
   [
    {
        "id": 1,
        "vehicle_plate": "11KK125",
        "device_name": "TEMPERATURE",
        "is_online": true,
        "is_active": true
    },
    {
        "id": 2,
        "vehicle_plate": "11KK125",
        "device_name": "GPS",
        "is_online": true,
        "is_active": true
    },
    {
        "id": 3,
        "vehicle_plate": "26LYS111",
        "device_name": "TEMPERATURE",
        "is_online": true,
        "is_active": true
    },
    {
        "id": 4,
        "vehicle_plate": "26LYS111",
        "device_name": "GPS",
        "is_online": true,
        "is_active": true
    }
]
   */

  pg_client.query(queryToDo, (err, result) => {
    if (err) {
      console.log(err);
      res.end();
    }
    console.log(result.rows);

    res.send(result.rows);
    res.end();
  });
};

const deviceIndexPost = (req, res) => {
  /* 
    {
      "vehicle_id": 1,
      "device_type_id": 1,
      "device_name": "TEMP 1",
      "is_online": true,
      "is_active": true
    } 
  */
  let obj = req.body;
  let objToArr = Object.values(obj);
  console.log(objToArr);

  let queryToDo = "insert into devices (vehicle_id, device_type_id, device_name, is_online, is_active) " + "values($1, $2, $3, $4, $5)";

  pg_client
    .query(queryToDo, objToArr)
    .then((result) => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
};

const deviceIndexPatch = (req, res) => {
  /* 
    [
      { // old value
          "vehicle_id": 1,
          "device_type_id": 1,
          "device_name": "TEMP 1",
          "is_online": true,
          "is_active": true
      },
      { // new value
          "vehicle_id": 1,
          "device_type_id": 1,
          "device_name": "TEMP 5",
          "is_online": true,
          "is_active": false
      }
    ]
  */
  let obj_old = req.body[0];
  let obj_new = req.body[1];
  let arrValues = Object.values(obj_new);
  arrValues.push(obj_old.vehicle_id);

  console.log(arrValues);

  let queryToDo = "update devices set vehicle_id=$1, device_type_id=$2, device_name=$3, is_online=$4, is_active=$5 " + "where vehicle_id=$6;";
  pg_client
    .query(queryToDo, arrValues)
    .then((result) => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
};

const deviceIndexDelete = (req, res) => {
  /*   { 
        "id":6,
        "vehicle_id": 1,
        "device_type_id": 1,
        "device_name": "TEMP 1",
        "is_online": true,
        "is_active": true
      } 
  */
  let obj = req.body;
  console.log(obj);
  let queryToDo = "delete from devices where id='" + obj.id + "'";

  pg_client
    .query(queryToDo)
    .then(() => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
};

module.exports = {
  deviceIndexGet,
  deviceIndexPost,
  deviceIndexPatch,
  deviceIndexDelete,
};
