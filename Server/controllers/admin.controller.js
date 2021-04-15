const bcrypt = require('bcrypt');
const { Admin } = require('../models')
const jwt = require('jsonwebtoken');


 const addAdmin = async (req, res) => {

        try {

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash('toor', salt)
                
                Admin.create({
                        email : 'root@gmail.com',
                        password : hashPassword
                })

                res.send("added")
                
            }
            catch (err) {
                res.json(err)
            }
     
}



const loginAdmin = async (req, res) => {

        const {email , password } = req.body;

        let error = [];


        if (!email || !password) {

            error.push('Request missing username or password param')

                return res.json({

                    error : error
                }
                    
                );
        }

        try {

                let admin = await Admin.findOne({

                        where: {
                            email: req.body.email
                        }
                });


                if (!admin) {
                    error.push('Admin note found')
                    return res.json({
                            error : error
                    })
                }
                // res.send(admin)

                if (await bcrypt.compare(password, admin.password)) {


                const token = jwt.sign({email: admin.email },'belcaidkey');


                res.json({
                        message : "login success",
                        token : token
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















module.exports = {
       loginAdmin,
       addAdmin
}




