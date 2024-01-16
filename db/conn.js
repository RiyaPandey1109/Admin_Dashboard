const mysql = require("mysql2");


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'projectx',
    password:'XDE@123'
});

db.connect((error)=>{
    if(error) throw error;
    console.log("connected !")
});

module.exports = db