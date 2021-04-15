
module.exports = (sequelize,DataTypes) => {

    const Admin = sequelize.define('Admin',{

        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });


    return Admin;

}


