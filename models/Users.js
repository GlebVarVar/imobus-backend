module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 

    });

    Posts.associate = (models) => {
        Posts.hasMany(models.VK, {
            onDelete: "cascade",
        });
        Posts.hasMany(models.SMS, {
            onDelete: "cascade",
        });
        Posts.hasMany(models.Telegram, {
            onDelete: "cascade",
        });
        Posts.hasMany(models.WhatsApp, {
            onDelete: "cascade",
        });
    }

    return Users;
}