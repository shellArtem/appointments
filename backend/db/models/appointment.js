'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({Master}) {
    //   this.belongsTo(Master, { foreignKey: 'master_id' }); }
    
  }
  Appointment.init({
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    master: DataTypes.STRING,
    service: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};