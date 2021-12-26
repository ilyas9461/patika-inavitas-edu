const { pg_client } = require("../../adapters/database/postgresql");

const deviceTypeIndexGet = (req, res) => {
  let queryToDo = "Select device_name, device_description, is_active from devices_type";
  /*
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

const deviceTypeIndexPost = (req, res) => {
    /* 
        {
            "device_name": "HUMIDITY",
            "device_description": "REAL",
            "is_active": true
        }
    */
    let obj = req.body;
    let objToArr = Object.values(obj);
    console.log(objToArr);
  
    let queryToDo = "insert into devices_type (device_name, device_description, is_active)" + 
                    "values($1, $2, $3)";
  
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

const deviceTypeIndexDelete= (req, res) => {
    /*   
    {
        "id": 3,
        "device_name": "HUMIDITY",
        "device_description": "REAL",
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
  deviceTypeIndexGet,
  deviceTypeIndexPost,
  deviceTypeIndexDelete
};
