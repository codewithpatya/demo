// express app
const express = require("express")
const app = express()

// environmentl import
require("dotenv/config")

// mysql module import
const mysql = require("mysql")

// module import for integration
const cors = require("cors")

// for xlsx file import
const xlsx = require('xlsx');

// for file uploadation import
const multer = require("multer")
const path = require('path');
const fs = require('fs');


// middleware
app.use(express.json());
app.use(cors());

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage
}).single('files'); // 'file' should match the name attribute in your HTML form


// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
  
    // Convert data to MySQL format and store in database
    data.forEach(row => {
      const sql = `INSERT INTO all_people (First_Name,last_name,email_address,company_name,company_domain,job_title,job_function,job_level,Company_Address,city,State,Zip_Code,country,Telephone_Number,Employee_Size,Industry,Company_Link,Prospect_Link,pid,region,email_validation) VALUES ?;`;
  
      connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Record inserted:', result);
      });
    });
  
    res.send('File uploaded successfully.');
  });
  
  // Handle update
  app.post('/update', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
  
    // Update records if matching prospect links found
    data.forEach(row => {
      const prospectLink = row.prospect_link;
      const sql = `UPDATE all_people SET column1 = '${row.value1}', column2 = '${row.value2}', ... WHERE prospect_link = '${prospectLink}';`;
  
      connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Record updated:', result);
      });
    });
  
    res.send('Update completed.');
  });
  
    //  // Insert data into MySQL database
    //  const sql = 'INSERT INTO all_people (First_Name,last_name,email_address,company_name,company_domain,job_title,job_function,job_level,Company_Address,city,State,Zip_Code,country,Telephone_Number,Employee_Size,Industry,Company_Link,Prospect_Link,pid,region,email_validation) VALUES ?';
    //  pool.query(sql, [dataToStore], (err, results) => {
    //    if (err) {
    //      console.error('Error inserting data into database: ', err);
    //      return res.status(500).json({ success: false, message: "Error inserting data into database" })
    //     //  res.status(500).json({ error: 'Error inserting data into database' });
    //     //  return;
    //    }
    //    console.log('Data inserted into database');
    //    res.status(200).json({success:true,message: 'File uploaded and data stored successfully'});
    //  });





// By-Default Get-req
app.get("/", (req, res) => {
    res.send("Welcome To Uploadation API!!")
})

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running at 5000!`);
});


// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'srv1391.hstgr.io',
    user: 'u858543158_VectorDB_user1',
    password: 'm[EB9jp6R15',
    database: 'u858543158_VectorDB'
})

// Connect to the database
pool.getConnection((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database!!');
});

