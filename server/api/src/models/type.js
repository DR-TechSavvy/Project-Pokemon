const { DataTypes, UUIDV4 } = require ('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('type', {
    name: {
        type : DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
    },{timesTamps: false});
  };