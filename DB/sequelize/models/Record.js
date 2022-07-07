const { DataTypes, Sequelize } = require('sequelize');

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      recordDate: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate : {
            date(value) {
                var isDate = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
                if(isDate.test(value) == false) {
                    throw new Error('다시 날짜를 입력해주세요!');
                }
            }
        },
      },
      recordCost: {
        type: DataTypes.INTEGER(40),
        allowNull: false,
      },
      recordCategory: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate : {
          isIn : [['cut', 'perm', 'dyeing']]
        },
      },
      recordEtc: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      recordGrade: {
        type: DataTypes.INTEGER(40),
        allowNull: false,
        validate: {
            max : 5,
        },
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Record',
      tableName: 'records',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Record.belongsTo(db.User)
    db.Record.belongsTo(db.Designer)
    db.Record.hasOne(db.Image, {onDelete: 'CASCADE', hooks: true})
    db.Record.hasOne(db.CloudImage, {onDelete: 'CASCADE', hooks: true})
    db.Record.hasOne(db.Cut, {onDelete: 'CASCADE', hooks: true})
    db.Record.hasOne(db.Perm, {onDelete: 'CASCADE', hooks: true})
    db.Record.hasOne(db.Dyeing, {onDelete: 'CASCADE', hooks: true})
  }
};