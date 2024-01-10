module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('pokemon', {
    id: {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },{timesTamps: false});
  };