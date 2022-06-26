var User = require('../../../DB/sequelize/models/User')
var Designer = require('../../../DB/sequelize/models/Designer')
var Record = require('../../../DB/sequelize/models/Record')
var Image = require('../../../DB/sequelize/models/Image')
var Cut = require('../../../DB/sequelize/models/Cut')
var Perm = require('../../../DB/sequelize/models/Perm')
var Dyeing = require('../../../DB/sequelize/models/Dyeing')
const { Op } = require("sequelize");

var show = require('@jongjun/console')



var latest = async function(req, res) {

    var user = await User.findOne({wherer : {id : req.user.id}});
    var recordArray = await Record.findAndCountAll({raw : true,where : {UserId : user.id}, order : [['createdAt', 'DESC']]});
    var recordObj = Object.assign({}, recordArray)
    var recordCount = await user.countRecords()
    var img = await imgObj(recordArray, recordCount)
    var result = {user, record : recordObj, img}
    return res.send(result)

}

var designer = async function(req, res) {

    var user = await User.findOne({wherer : {id : req.user.id}});
    var dessignerList = await Designer.findAndCountAll({where : {UserId : req.user.id}})
    var recordWithDesigner = await Promise.all(dessignerList.rows.map( 
        rows => Record.findAll({where : {DesignerId : rows.id}})
    ));
    
    var img = await Promise.all(dessignerList.rows.map(
        rows=> Image.findOne({where : {RecordId : rows.id}, raw : true})
    ));
    var result = {user, record : recordWithDesigner, img}
    return res.send(result)

}

var category = async function(req, res, category) {

    var user = await User.findOne({wherer : {id : req.user.id}});
    var recordObj = await Record.findAndCountAll({raw : true, order : [['createdAt', 'DESC']], where : {[Op.and] : [{recordCategory : category}, {UserId : req.user.id}]}});
    var recordCount = recordObj.count
    var categoryRecord = await classify(category ,recordObj, recordCount)
    var img = await imgObj(recordObj)
    var result = {user, record : recordObj, categoryRecord, img}
    return res.send(result)

}

var categoryResult = async function(req, res, category) {

    var user = await User.findOne({wherer : {id : req.user.id}});
    var recordObj = await Record.findAndCountAll({raw : true, limit : 1, order : [['createdAt', 'DESC']], where : {[Op.and] : [{recordCategory : category}, {UserId : req.user.id}]}});
    var categoryRecord = await classify(category ,recordObj, 1)
    var img = await imgObj(recordObj, 1)
    var result = {user, record : recordObj, categoryRecord, img}
    return res.send(result)

}


// inner use
var classify = async function ( category ,recordObj, recordCount) {

    switch(category) {
        case "cut" :
            var categoryRecord = await Promise.all(recordObj.rows.map(
                rows => Cut.findOne({where : {RecordId : rows.id}})
            ))
            return categoryRecord
        case "perm" :
            var categoryRecord = await Promise.all(recordObj.rows.map(
                rows => Perm.findOne({where : {RecordId : rows.id}})
            ))
            return categoryRecord
        case "dyeing" :
            var categoryRecord = await Promise.all(recordObj.rows.map(
                rows => Dyeing.findOne({where : {RecordId : rows.id}})
            ))
            return categoryRecord
        default :
            throw new Error('올바른 목록을 선택해 주세요!');

    }

}

var imgObj = async function(record, recordCount) {

    var img = await Promise.all(record.rows.map(
        rows => Image.findOne({where : {RecordId : rows.id}, raw : true})
    ))
    if(recordCount == 1){
        var img = await Image.findOne({where : {RecordId : record.rows[0].id}, raw : true})
    }
    return img
    
}
   
module.exports = { latest, designer, category, categoryResult}
