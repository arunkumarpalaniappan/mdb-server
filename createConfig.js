const fs = require("fs");

const data = {
  "serverConf": {
    "host": "0.0.0.0",
    "port": process.env.PORT|5000
  },
  "databaseConfig": {
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "user": process.env.DB_USER,
      "pwd": process.env.DB_PASSWORD
  }
}

fs.writeFileSync('./config/default.json',data);
