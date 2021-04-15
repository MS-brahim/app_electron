require('dotenv').config()
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const db = require('./models');

const port = process.env.PORT || 8080;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));








const adminRoutes = require("./routes/admin");
const employeeRoutes = require("./routes/employee");




app.use('/admin', adminRoutes);
app.use('/', employeeRoutes);




db.sequelize.sync().then((res)=>{


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }) 

})



