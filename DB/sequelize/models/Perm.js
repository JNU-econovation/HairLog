const { DataTypes, Sequelize } = require('sequelize');

module.exports = class Perm extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      permName: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      permTime: {
        type: DataTypes.INTEGER(40),
        allowNull: false,
      },
      permHurt: {
        type: DataTypes.INTEGER(40),
        allowNull: false,
        validate: {
            max : 3,
        },
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Perm',
      tableName: 'perms',
      paranoid: true, 
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Perm.belongsTo(db.Record)
  }
};