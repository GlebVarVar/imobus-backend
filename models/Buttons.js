module.exports = (sequelize, DataTypes) => {

    const Buttons = sequelize.define("Buttons", {
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });



    return Buttons;
}