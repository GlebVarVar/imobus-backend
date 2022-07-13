module.exports = (sequelize, DataTypes) => {

    const VK = sequelize.define("VK", {
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

    VK.associate = (models) => {
        VK.hasMany(models.Buttons, {
            onDelete: "cascade",
        });
    }

    return VK;
}