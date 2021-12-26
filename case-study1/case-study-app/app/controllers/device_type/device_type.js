const {pg_client} = require("../../adapters/database/postgresql");

const deviceTypeIndexGet = (req, res) => {
  /* return value:
    [
        {
            "device_name": "TEMPERATURE",
            "device_description": "K thermocouples",
            "is_active": true
        },
        {
            "device_name": "GPS",
            "device_description": "uBox",
            "is_active": true
        }
    ]
  */
  let queryToDo = "Select device_name, device_description, is_active from devices_type"; // query string.
  pg_client.query(queryToDo, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err); // some server error.
      res.end();
    } else {
      console.log(result.rows);
      res.send(result.rows);
      res.end();
    }

  });
};

const deviceTypeIndexPost = (req, res) => {
  /* request boy json data:
      {
          "device_name": "HUMIDITY",
          "device_description": "REAL",
          "is_active": true
      }
  */
  let obj = req.body; //get object
  let objToArr = Object.values(obj); //object to array
  console.log(objToArr);

  let queryToDo = "insert into devices_type (device_name, device_description, is_active)" +
    "values($1, $2, $3)";
 // meaning of $1, $2 ... : array elements corresponding to columns. (not array index, it is array element.) 
  pg_client.query(queryToDo, objToArr) //(querryString, array)
    .then((result) => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err); // some server error.
      res.end();
    });
};

const deviceTypeIndexDelete = (req, res) => {
  /* request body json data: 
  {
      "id": 3,
      "device_name": "HUMIDITY",
      "device_description": "REAL",
      "is_active": true
  } 
  */
  let obj = req.body;
  console.log(obj);
  let queryToDo = "delete from devices where id='" + obj.id + "'"; // delete for id.

  pg_client.query(queryToDo)
    .then(() => {
      res.status(200).send("OK");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err); // some server error.
      res.end();
    });
};

module.exports = {
  deviceTypeIndexGet,
  deviceTypeIndexPost,
  deviceTypeIndexDelete
};