
module.exports = (sequelize,DataTypes) => {

    const Employee = sequelize.define('Employee',{

        name: DataTypes.STRING,
        mail: DataTypes.STRING,
        password: DataTypes.STRING,
        cin: DataTypes.STRING,
        dateOfBirth: DataTypes.DATE,
        registration_number: DataTypes.STRING,
        
    });


    return Employee;

}