// таблица для хранения пользователей
module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 

    });

    Users.associate = (models) => {
        Users.hasMany(models.Messengers, {
            onDelete: "cascade",
        });
    }

    return Users;
}