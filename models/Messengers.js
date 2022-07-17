// таблица для хранения информации о мессенджерах
module.exports = (sequelize, DataTypes) => {

    const Messengers = sequelize.define("Messengers", {
        messengerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        inline: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        

        buttonsCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    

    Messengers.associate = (models) => {
        Messengers.hasMany(models.Buttons, {
            onDelete: "cascade",
        });
    }

    return Messengers;
}