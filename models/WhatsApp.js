module.exports = (sequelize, DataTypes) => {

    const WhatsApp = sequelize.define("WhatsApp", {
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


    WhatsApp.associate = (models) => {
        WhatsApp.hasMany(models.Buttons, {
            onDelete: "cascade",
        });
    }

    return WhatsApp;
}