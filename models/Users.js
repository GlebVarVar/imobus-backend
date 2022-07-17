module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 

    });

    Users.associate = (models) => {
        // Users.hasMany(models.VK, {
        //     onDelete: "cascade",
        // });
        // Users.hasMany(models.SMS, {
        //     onDelete: "cascade",
        // });
        // Users.hasMany(models.Telegram, {
        //     onDelete: "cascade",
        // });
        // Users.hasMany(models.WhatsApp, {
        //     onDelete: "cascade",
        // });
        Users.hasMany(models.Messengers, {
            onDelete: "cascade",
        });
    }

    return Users;
}