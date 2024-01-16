const crypto = require("crypto");
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
      user: 'root',
      database: 'projectx',
      password:'XDE@123'

  
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

const generateToken = async (jsonObject) => {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(jsonObject);

        // Create a hash using the SHA-256 algorithm
        const hash = crypto.createHash("sha256").update(jsonString).digest("hex");

        // Truncate the hash to the desired length
        const truncatedHash = hash.substring(0, 4);

        // Check if the username already exists in the database
        conn.query(
            "SELECT * FROM tokens WHERE empusername = ?",
            [jsonObject.empusername],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                console.log(result);

                if (result.length > 0) {
                    reject("Employee Username Already Exists! Use Something Else!");
                } else {
                    // Insert the new token into the database
                    conn.query(
                        "INSERT INTO tokens (empusername, token) VALUES (?, ?)",
                        [jsonObject.empusername, truncatedHash],
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.log(result);
                                resolve(truncatedHash);
                            }
                        }
                    );
                }
            }
        );
    });
};

module.exports = {
    generateToken: generateToken,
};
