module.exports = (sequelize, DataTypes) => {

    const SMS = sequelize.define("SMS", {
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

    SMS.associate = (models) => {
        SMS.hasMany(models.Buttons, {
            onDelete: "cascade",
        });
    }

    return SMS;
}