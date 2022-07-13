import { DataTypes, Sequelize } from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userEmail: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: false,
        validate : {
          email(value){
            var isEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
            if (isEmail.test(value) === false) {
              throw new Error('이메일을 입력해주세요!');
            }
          }
        }
      },
      userPassword: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING(40),
        allowNull: true,
        validate : {
            name(value) {
                var isName =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
                if(isName.test(value) == false){
                    throw new Error('다시 이름을 입력해주세요!');
                }
            }
        }
      },
      userSex: {
        type: DataTypes.STRING(40),
        allowNull: true,
        validate : {
            isIn : {
                args : [[ 'm', 'w' ]],
                msg : "성별을 다시 지정해 주세요"
            },
        }
      },
      userCycle: {
        type: DataTypes.INTEGER(40),
        allowNull: true,
        validate: {
            isInt : true,
        }
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.User.hasMany(db.Record, {onDelete: 'CASCADE', hooks: true});
    db.User.hasMany(db.Designer, {onDelete: 'CASCADE', hooks: true});
  }
};