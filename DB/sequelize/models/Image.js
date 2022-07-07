const { DataTypes, Sequelize } = require('sequelize');

module.exports = class Image extends Sequelize.Model {
static init(sequelize) {
    return super.init({
    img1: {
        type : DataTypes.STRING(512),
        allowNull: true,
    },
    img2: {
        type : DataTypes.STRING(512),
        allowNull: true,
    },
    img3: {
        type : DataTypes.STRING(512),
        allowNull: true,
    },
    }, {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Image',
    tableName: 'images',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    });
}

    static associate(db) {
    db.Image.belongsTo(db.Record)
    }
};