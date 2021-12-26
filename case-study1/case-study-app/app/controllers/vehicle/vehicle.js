const { pg_client } = require("../../adapters/database/postgresql");

const vehicleIndexGet = (req, res) => {
  /* request json data :
    [
      {
          "id": 1,
          "vehicle_plate": "11KK125",
          "current_status": 1,
          "is_active": true
      },
      {
          "id": 2,
          "vehicle_plate": "26LYS111",
          "current_status": 1,
          "is_active": true
      },
      {
          "id": 3,
          "vehicle_plate": "26FN145",
          "current_status": 1,
          "is_active": true
      }
    ]
  */

  let queryToDo = "Select id, vehicle_plate, current_status, is_active from vehicles";
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

const vehicleIndexPost = (req, res) => {
  /* 
      {
          "vehicle_plate": "26LYS465",
          "current_status": 1,
          "is_active": true
      } 
  */
  let obj = req.body;
  let objToArr = Object.values(obj); // object to array.
  console.log(objToArr);

  let queryToDo = "insert into vehicles (vehicle_plate, current_status, is_active) " + "values($1, $2, $3)";
  // array element to pair queryToDo values 
  pg_client.query(queryToDo, objToArr)
    .then((result) => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
};

const vehicleIndexPatch = (req, res) => {
  /* 
   [
        { //old values
        "vehicle_plate": "26LYS465",
        "current_status": 1,
        "is_active": true
        } , 
        { //new values
        "vehicle_plate": "26LYS111",
        "current_status": 1,
        "is_active": true
        } 
    ]

    */
  let obj_old = req.body[0];
  let obj_new = req.body[1];
  let arrValues = Object.values(obj_new);//object to array.
  arrValues.push(obj_old.vehicle_plate); // push array vehicle plate for "where vehicle_plate=..."

  console.log(arrValues);
  let queryToDo = "update vehicles set vehicle_plate=$1, current_status=$2, is_active=$3 " + "where vehicle_plate=$4;";
  pg_client.query(queryToDo, arrValues)
    .then((result) => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
};

const vehicleIndexDelete = (req, res) => {
  /*  { 
        "vehicle_plate": "26LYS465",
        "current_status": 1,
        "is_active": true
       } , 
    */
  let obj = req.body;
  console.log(obj);
  let queryToDo = "delete from vehicles where vehicle_plate='" + obj.vehicle_plate + "'"; // delete with vehicle plate

  pg_client.query(queryToDo)
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
  vehicleIndexGet,
  vehicleIndexPost,
  vehicleIndexPatch,
  vehicleIndexDelete,
};
