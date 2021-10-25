
const users = (sequelize, Sequelize) => {
    const user = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.STRING
        }
    });

    return user;
};

module.exports = {
    users
}
