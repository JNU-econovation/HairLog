const User = require('../../../DB/sequelize/models/User'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Record = require('../../../DB/sequelize/models/Record'),
      Image = require('../../../DB/sequelize/models/Image'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');


const isDesigner = async function (req, category, userInstance) {
    let {recordDate, recordCost, designerName, recordEtc, recordGrade} = req.body;
    let designer = await Designer.findOne({where : { designerName }})
    let record = await userInstance.createRecord({ recordDate, recordCost, recordCategory : category, recordEtc, recordGrade, DesignerId : designer.id })
    let result = record
    return result 
}

const isNotDesigner = async function  (req, category, userInstance) {
    let {recordDate, recordCost, recordEtc, recordGrade} = req.body;
    let record = await userInstance.createRecord({ recordDate, recordCost, recordCategory : category, recordEtc, recordGrade })
    let result = record
    return result
}

const getDesigner = async function (record) {
    let designer = await Promise.all(record.map(res => Designer.findOne({where : {id :res.DesignerId}, raw : true})))
    return designer
}

module.exports = { isDesigner, isNotDesigner, getDesigner,}