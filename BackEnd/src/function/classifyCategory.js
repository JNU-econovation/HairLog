const User = require('../../../DB/sequelize/models/User'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Record = require('../../../DB/sequelize/models/Record'),
      Image = require('../../../DB/sequelize/models/Image'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');
const { Op } = require("sequelize");

const show = require('@jongjun/console')



const latest = async function(req, res) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let recordArray = await Record.findAndCountAll({raw : true,where : {UserId : user.id}, order : [['createdAt', 'DESC']]});
    let recordObj = Object.assign({}, recordArray)
    let recordCount = recordArray.count
    let img = await imgObj(recordArray, recordCount)
    let result = {user, record : recordObj, img}
    return res.send(result)

}

const designer = async function(req, res) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let dessignerList = await Designer.findAndCountAll({where : {UserId : req.user.id}})
    if(dessignerList.count != 0) {
        let recordWithDesigner = await Promise.all(dessignerList.rows.map( 
            rows => Record.findAll({where : {DesignerId : rows.id}})
        ));
        
        let img = await Promise.all(dessignerList.rows.map(
            rows=> Image.findOne({where : {RecordId : rows.id}, raw : true})
        ));
        let result = {user, record : recordWithDesigner, img}
        return res.send(result)
    }
    return res.send("등록된 디자이너가 없습니다!")


}

const category = async function(req, res, category) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let recordObj = await Record.findAndCountAll({raw : true, order : [['createdAt', 'DESC']], where : {[Op.and] : [{recordCategory : category}, {UserId : req.user.id}]}});
    if(recordObj.count != 0){
        let categoryRecord = await classify(res, category ,recordObj)
        let img = await imgObj(recordObj)
        let result = {user, record : recordObj, categoryRecord, img}
        return res.send(result)
    }
    return res.send(`${category} 기록이 없습니다!`)


}

const categoryResult = async function(req, res, category) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let recordObj = await Record.findAndCountAll({raw : true, limit : 1, order : [['createdAt', 'DESC']], where : {[Op.and] : [{recordCategory : category}, {UserId : req.user.id}]}});
    if(recordObj.count != 0){
        let categoryRecord = await classify(res, category ,recordObj)
        let img = await imgObj(recordObj, 1)
        let result = {user, record : recordObj, categoryRecord, img}
        return res.send(result)
    }
    return res.send(`${category} 기록이 없습니다!`)

}


// inner use
const classify = async function ( res, category ,recordObj) {

    show.Hash(category)

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
            return res.send('올바른 목록을 선택해 주세요!');

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
   
module.exports = { latest, designer, category, categoryResult}
