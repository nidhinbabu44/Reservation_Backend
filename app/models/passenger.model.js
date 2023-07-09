const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Passenger = sequelize.define("passenger", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        passenger_id: { type: Sequelize.STRING },
        passenger_name: { type: Sequelize.STRING },
        passenger_age: { type: Sequelize.STRING },
        passenger_address: { type: Sequelize.STRING },
        last_modified_by: { type: Sequelize.STRING },
        remarks: { type: Sequelize.STRING },
    });
    return Passenger;
};