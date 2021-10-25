// To define mappings between a model and a table, use the define method

const contactMe = (sequelize, Sequelize) => {
    const contactMe = sequelize.define("contactMe", {
        fname: {
            type: Sequelize.STRING
        },
        mobileNumber: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        msg:{
            type: Sequelize.TEXT
        },
              
    });

    return contactMe;
};

module.exports = {
    contactMe
}