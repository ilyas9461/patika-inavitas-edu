const { pg_client } = require("../../adapters/database/postgresql");

const logLocationIndexGet = (req, res) => {
    let queryToDo = "Select vehicle_id, device_id, latitude, longtitude, created_at from log_location";
    /*
        [
            {
                "vehicle_id": "1",
                "device_id": "1",
                "latitude": "36.4284",
                "longtitude": "26.4521",
                "created_at": "2021-12-25T15:12:15.000Z"
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

  const logLocationIndexPost= (req, res) => {
    /* 
        {
            "vehicle_id":1,
            "device_id":1,
            "latitude":"36.4284",
            "longtitude":"26.4521",
            "created_at":"2021-12-25 18:12:15"
        }
    */
    let obj = req.body;
    let objToArr = Object.values(obj);
    console.log(objToArr);
  
    let queryToDo = "insert into log_location (vehicle_id, device_id, latitude, longtitude, created_at)" + 
                    "values($1, $2, $3, $4, $5)";
  
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

  module.exports = {
    logLocationIndexGet,
    logLocationIndexPost

  };