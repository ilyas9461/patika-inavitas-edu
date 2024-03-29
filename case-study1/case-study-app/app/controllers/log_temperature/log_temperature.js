const { pg_client } = require("../../adapters/database/postgresql");

const logTemperatureIndexGet = (req, res) => {   
    /*
      [
        {
            "vehicle_id": "1",
            "device_id": "1",
            "read_data": "22",
            "created_at": "2021-12-25T15:12:15.000Z"
        }
    ]
    */
    let queryToDo = "Select vehicle_id, device_id, read_data, created_at from log_temperature";
    pg_client.query(queryToDo, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err); // some server error.
        res.end();
      }
      console.log(result.rows);
      res.send(result.rows);
      res.end();
    });
  };

  const logTemperatureIndexPost= (req, res) => {
    /* 
        {
            "vehicle_id":1,
            "device_id":1,
            "read_data":22,
            "created_at":"2021-12-25 18:12:15"
        }
    */
    let obj = req.body;
    let objToArr = Object.values(obj);  //object to array
    console.log(objToArr);
    // array elements to pair $1,$2 ... 
    let queryToDo = "insert into log_temperature (vehicle_id, device_id, read_data, created_at)" + 
                    "values($1, $2, $3, $4)";
  
    pg_client.query(queryToDo, objToArr)
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

  module.exports = {
    logTemperatureIndexGet,
    logTemperatureIndexPost

  };