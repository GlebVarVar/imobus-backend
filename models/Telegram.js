module.exports = (sequelize, DataTypes) => {

    const Telegram = sequelize.define("Telegram", {
        text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },


        buttonsCountStandart: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        linkButtonsStandart: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },


        buttonsCountInline: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        linkButtonsInline: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    });

    Telegram.associate = (models) => {
        Telegram.hasMany(models.Buttons, {
            onDelete: "cascade",
        });
    }


    return Telegram;
}