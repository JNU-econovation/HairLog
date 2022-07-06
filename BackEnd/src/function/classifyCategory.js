const User = require('../../../DB/sequelize/models/User'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Record = require('../../../DB/sequelize/models/Record'),
      Image = require('../../../DB/sequelize/models/Image'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');
const { Op } = require("sequelize");

const show = require('@jongjun/console')
const ifDesigner = require("../function/ifDesigner")



const latest = async function(req, res) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let recordArray = await Record.findAndCountAll({raw : true,where : {UserId : user.id}, order : [['recordDate', 'DESC']]});
    let designer = await ifDesigner.getDesigner(recordArray.rows)
    let recordObj = Object.assign({}, recordArray)
    let recordCount = recordArray.count
    let img = await imgObj(recordArray, recordCount)
    let result = {user, designer, record : recordObj, img}
    return res.send(result)

}

const designer = async function(req, res) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let dessignerList = await Designer.findAndCountAll({where : {UserId : req.user.id}})
    if(dessignerList.count != 0) {
        let recordWithDesigner = await Promise.all(dessignerList.rows.map( 
            rows => Record.findAndCountAll({where : {DesignerId : rows.id}, raw : true})
        ));
        let designer = await ifDesigner.getDesignerWith(recordWithDesigner)
        let tempImageRecord = await Promise.all(recordWithDesigner.map(res => {return res.rows}))
        let img = imgDesigner(tempImageRecord)
        let result = {user, designer, record : recordWithDesigner, img}
        return res.send({code : 200, result})
    }
    return res.send({code : 404, msg : "등록된 디자이너가 없습니다!"})


}

const category = async function(req, res, category) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let recordObj = await Record.findAndCountAll({raw : true, order : [['recordDate', 'DESC']], where : {[Op.and] : [{recordCategory : category}, {UserId : req.user.id}]}});
    if(recordObj.count != 0){
        let categoryRecord = await classify(res, category ,recordObj)
        let designer = await ifDesigner.getDesigner(recordObj.rows)
        let img = await imgObj(recordObj)
        let result = {user, designer, record : recordObj, categoryRecord, img}
        return res.send({code : 200, result})
    }
    res.send({code : 404, msg: `${category} 기록이 없습니다!`})


}

const categoryResult = async function(req, res, category) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let recordObj = await Record.findAndCountAll({raw : true, limit : 1, order : [['recordDate', 'DESC']], where : {[Op.and] : [{recordCategory : category}, {UserId : req.user.id}]}});
    if(recordObj.count != 0){
        let categoryRecord = await classify(res, category ,recordObj)
        let designer = await ifDesigner.getDesigner(recordObj.rows)
        let img = await imgObj(recordObj, 1)
        let result = {user, designer, record : recordObj, categoryRecord, img}
        res.send({code : 200, result})
    }
    res.send({code : 404, msg : `${category} 기록이 없습니다!`})

}

// const eachResult = async function(req, res, clickRecord) {

//     let user = await User.findOne({wherer : {id : req.user.id}});
//     let designer = await Designer.findOne({where : {id : clickRecord.DesignerId}})
//     let record = await Record.findAndCountAll({where : {id : clickRecord.id}})
//     let categoryRecord = await classify(res, record.rows[0].recordCategory, record)
//     let image = record.getImage()
//     let result = {user, designer, record, categoryRecord, image}
//     res.send({code : 200, result})

// }

// inner use
const classify = async function ( res, category ,recordObj) {

    switch(category) {
        case "cut" :
            let categoryRecord = await Promise.all(recordObj.rows.map(
                rows => Cut.findOne({where : {RecordId : rows.id}})
            ))
            return categoryRecord = { count : recordObj.count, rows : categoryRecord }
        case "perm" :
            categoryRecord = await Promise.all(recordObj.rows.map(
                rows => Perm.findOne({where : {RecordId : rows.id}})
            ))
            return categoryRecord = { count : recordObj.count, rows : categoryRecord}
        case "dyeing" :
            categoryRecord = await Promise.all(recordObj.rows.map(
                rows => Dyeing.findOne({where : {RecordId : rows.id}})
            ))
            return categoryRecord = { count : recordObj.count, rows : categoryRecord}
        default :
            return res.send({code : 404, msg: '올바른 목록을 선택해 주세요!'});

    }

}

const imgObj = async function(record, recordCount) {

    let img = await Promise.all(record.rows.map(
        rows => Image.findOne({where : {RecordId : rows.id}, raw : true})
    ))
    if(recordCount == 1){
        let img = await Image.findOne({where : {RecordId : record.rows[0].id}, raw : true})
    }
    return img = { count : record.count, rows : img}
    
}

const imgDesigner = async function(record) {
    let i = 0;
    let img = {}
    for ( let imgs of record) {
        img[i] = await Promise.all(imgs.map(res => Image.findOne({where : {RecordId : res.id}}) ))
        i++
    }
    return img
}
   
module.exports = { latest, designer, category, categoryResult }
