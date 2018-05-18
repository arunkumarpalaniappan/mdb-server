const fs = require("fs");

const data = {
  "serverConf": {
    "host": "0.0.0.0",
    "port": process.env.PORT||5000
  },
  "databaseConfig": {
      "host": process.env.DB_HOST||"localhost",
      "port": process.env.DB_PORT||27017,
      "user": process.env.DB_USER||"arunkumar",
      "pwd": process.env.DB_PASSWORD||"password"
  }
}

fs.writeFileSync('./config/default.json',JSON.stringify(data));
