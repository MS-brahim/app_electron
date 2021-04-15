const bcrypt = require('bcrypt');
const { Employee } = require('../models');
const jwt = require('jsonwebtoken');

const {sendMail} = require('../services/sendMail.js');

const addEmployee = async (req, res) => {

    let error = [];

    try {
    
               
            // const existingEmployee = await Employee.findOne({mail : req.body.mail});


           

            // if (existingEmployee) {

            //         error.push('An account whit this mail exist ');
            //         return res.json({

            //                 error : error
            //         }) 
                    
            // }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            const newEmployee = new Employee({
    
                            name: req.body.name,
                            mail: req.body.mail,
                            cin: req.body.cin,
                            password: hashPassword,
                            dateOfBirth: req.body.dateOfBirth,
                            registration_number: req.body.registration_number,

            });
            
            const saveEmployee = await newEmployee.save();

            res.json({message : 'Employee added'})



            let subject = "Account verification";
            let text = "CNSS Maroc";
            let output;
            output = `
            <h2>This is  Your Registration Number  and Password , Keep it Safe !!!</h2>
            <p> Email : ${req.body.mail}</p>;
            <p> Password : ${req.body.registration_number}</p>`;

            sendMail(req.body.mail,subject,text,output);

            

            
        }
        catch (err) {
            res.json(err)
        }
 
}





const loginEmployee = async (req, res) => {

    const {mail , password } = req.body;

    let error = [];


    if (!mail || !password) {

        error.push('Request missing username or password param')

            return res.json({

                error : error
            }
                
            );
    }

    try {

            let employee = await Employee.findOne({

                    where: {
                        mail: req.body.mail
                    }
            });


            if (!employee) {
                error.push('employee note found')
                return res.json({
                        error : error
                })
            }
            // res.send(employee)

            if (await bcrypt.compare(password, employee.password)) {


            const token = jwt.sign({id: employee.id },'belcaidkey');


            res.json({
                    message : "login success",
                    token : token,
                    id : employee.id
            })

                

                
            }else{
                error.push('invalid credentials ');
                return res.json({
                        error : error
                }) 
            }




        }
        catch (err) {

            return res.status(400).send(err);

        }

}




const getAllEmployee = async (req, res ) =>{


    let employee = await Employee.findAll();


    if (!employee) {
        error.push('employee note found')
        return res.json({
                error : error
        })
    }

    res.send(employee)

}


const employeeById = async (req,res) =>{


    let employee = await Employee.findOne({ where: {id: req.params.id} })


    if (!employee) {
        error.push('employee note found')
        return res.json({
                error : error
        })
    }

    res.send(employee)

}






module.exports = {
    addEmployee,loginEmployee,getAllEmployee,employeeById
}
