const {pg_client} = require("../../adapters/database/postgresql");

const deviceIndexGet = (req, res) => {
  /* return values :
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

  let queryToDo = "Select  devices.id, vehicles.vehicle_plate, devices.device_name, devices.is_online, devices.is_active" +
                  " from devices  inner join vehicles on devices.vehicle_id=vehicles.id order by devices.id asc"; // query string.
  pg_client.query(queryToDo, (err, result) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      console.log(result.rows);
      res.send(result.rows);
      res.end();
    }
  });
}; //get

const deviceIndexPost = (req, res) => {
  /* request body json data:
    {
      "vehicle_id": 1,
      "device_type_id": 1,
      "device_name": "TEMP 1",
      "is_online": true,
      "is_active": true
    } 
  */
  let obj = req.body; // get object
  let objToArr = Object.values(obj); //object to array, 
  console.log(objToArr);
  let queryToDo = "insert into devices (vehicle_id, device_type_id, device_name, is_online, is_active) " + "values($1, $2, $3, $4, $5)";
  // meaning of $1, $2 ... : array elements corresponding to columns. (not array index, array element)             
  pg_client.query(queryToDo, objToArr) //(queryString, array)
    .then((result) => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
}; //post

const deviceIndexPatch = (req, res) => {
  /* // request body json data 
    [
      { // old value for query string. 
          "vehicle_id": 1,
          "device_type_id": 1,
          "device_name": "TEMP 1",
          "is_online": true,
          "is_active": true
      },
      { // new value for update set.
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

  let arrValues = Object.values(obj_new); //object to array.
  arrValues.push(obj_old.vehicle_id); // push of array last element. Where to use the update...

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
  /*   { //reguest json data
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
  let queryToDo = "delete from devices where id='" + obj.id + "'"; //delete for id.
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