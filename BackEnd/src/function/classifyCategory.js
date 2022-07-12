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

    let user = await User.findOne({where : {id : req.user.id}});
    let record = await Record.findAndCountAll({raw : true, where : {UserId : user.id}, order : [['recordDate', 'DESC']]});
    let designer = await ifDesigner.getDesigner(record.rows);
    let category = await getCategory(req, record);
    let img = await getImg(record, record.count);
    let result = {user, designer, record, category, img}
    return res.send({code : 200, result})

}

const instanceResult = async function(req, res, category) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let record = await Record.findAndCountAll({raw : true, limit : 1, where : {UserId : req.user.id}, order : [['recordDate', 'DESC']]});
    let designer = await ifDesigner.getDesigner(record.rows);
    if(record.count != 0){
        let category = await classify(record.rows[0].id, record.rows[0].recordCategory)
        let img = await getImg(record, 1);
        let result = {user, designer, record, category, img}
        return res.send({code : 200, result})
    }
    res.send({code : 404, msg : `${category} 기록이 없습니다!`})

}

const category = async function(req, res) {

    let user = await User.findOne({where : {id : req.user.id}});
    let record = await Record.findAndCountAll({raw : true, where : {[Op.and] : [{UserId : user.id}, {recordCategory : req.params.category}]}, order : [['recordDate', 'DESC']]});
    let designer = await ifDesigner.getDesigner(record.rows);
    let category = await getCategory(req, record);
    let img = await getImg(record, record.count);
    let result = {user, designer, record, category, img}
    return res.send({code : 200, result})

}


const designer = async function(req, res) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let designerList = await Designer.findAndCountAll({where : {UserId : req.user.id}})
    if(designerList.count != 0) {
        let recordByDesigner = await Promise.all(designerList.rows.map( 
            rows => Record.findAndCountAll({where : {DesignerId : rows.id}, raw : true})
        ));
        let category = await Promise.all(recordByDesigner.map(res => getCategory(req, res)))
        let img  = await Promise.all(recordByDesigner.map(res => getImg(res, res.count)))
        
        let result = {user, designerList, recordByDesigner, category, img}
        return res.send({code : 200, result})
    }
    return res.send({code : 404, msg : "등록된 디자이너가 없습니다!"})

}


const eachResult = async function(req, res) {

    let user = await User.findOne({wherer : {id : req.user.id}});
    let record = await Record.findAndCountAll({raw : true, limit : 1, where : {id : req.query.id}, order : [['recordDate', 'DESC']]});
    let designer = await ifDesigner.getDesigner(record.rows);
    if(record.count != 0){
        let category = await classify(record.rows[0].id, record.rows[0].recordCategory)
        let img = await getImg(record, 1);
        let result = {user, designer, record, category, img}
        return res.send({code : 200, result})
    }
    res.send({code : 404, msg : `${category} 기록이 없습니다!`})

}

// inner use

const getCategory = async function(req, recordInstance) {
    let category = await Promise.all(recordInstance.rows.map(res => classify(res.id ,res.recordCategory)))
    return category
}

const classify = async function ( recordId, recordCategory) {
    let classifyResult;
    if(recordCategory != undefined) {
        switch(recordCategory) {
            case "cut" :
                classifyResult = await Cut.findOne({where : {RecordId : recordId}})
                return classifyResult
            case "perm" :
                classifyResult = await Perm.findOne({where : {RecordId : recordId}})
                return classifyResult

            case "dyeing" :
                classifyResult = await Dyeing.findOne({where : {RecordId : recordId}})
                return classifyResult

            default :
                throw new Error("올바른 목록을 선택해주세요")
        }
    }
    return null;
}

const getImg = async function(recordInstance, recordCount) {
    
    let imgInstance;
    if(recordCount == 1){
        let img = await Image.findOne({where : {RecordId : recordInstance.rows[0].id}, raw : true})
        imgInstance = { count : recordInstance.count, rows : img }
        return imgInstance
    }
    let img = await Promise.all(recordInstance.rows.map(
        rows => Image.findOne({where : {RecordId : rows.id}, raw : true})
    ))
    imgInstance = { count : recordInstance.count, rows : img }
    return imgInstance
    
}
   
module.exports = { latest, designer, category, instanceResult, eachResult}
