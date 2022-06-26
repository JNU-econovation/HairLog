const User = require('../../../DB/sequelize/models/User'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Record = require('../../../DB/sequelize/models/Record'),
      Image = require('../../../DB/sequelize/models/Image'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');


const isDesigner = async function (req, category, userInstance) {
    let {recordDate, recordCost, recordTime, designerName, recordEtc, recordGrade} = req.body;
    let designer = await Designer.findOne({where : { designerName }})
    let record = await userInstance.createRecord({ recordDate, recordCost, recordTime, recordCategory : category, recordEtc, recordGrade, DesignerId : designer.id })
    let image = await record.createImage({ img1 : req.file.filename})
    let result = {record, image}
    return result
}

const isNotDesigner = async function  (req, category, userInstance) {
    let {recordDate, recordCost, recordTime, recordEtc, recordGrade} = req.body;
    let record = await userInstance.createRecord({ recordDate, recordCost, recordTime, recordCategory : category, recordEtc, recordGrade })
    let image = await record.createImage({ img1 : req.file.filename})
    let result = {record, image}
    return result
}

module.exports = { isDesigner, isNotDesigner}