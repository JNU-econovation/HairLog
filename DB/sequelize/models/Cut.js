import { DataTypes, Sequelize } from 'sequelize';

export default class Cut extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      cutName: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      cutLength: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Cut',
      tableName: 'cuts',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Cut.belongsTo(db.Record)
  }
};