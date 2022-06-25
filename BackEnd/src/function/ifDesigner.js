var User = require('../../../DB/sequelize/models/User')
var Designer = require('../../../DB/sequelize/models/Designer')
var Record = require('../../../DB/sequelize/models/Record')
var Image = require('../../../DB/sequelize/models/Image')
var Cut = require('../../../DB/sequelize/models/Cut')
var Perm = require('../../../DB/sequelize/models/Perm')
var Dyeing = require('../../../DB/sequelize/models/Dyeing')


var isDesigner = async function (req, category, userInstance) {
    var {recordDate, recordCost, recordTime, designerName, recordEtc, recordGrade} = req.body;
    var designer = await Designer.findOne({where : { designerName }})
    var record = await userInstance.createRecord({ recordDate, recordCost, recordTime, recordCategory : category, recordEtc, recordGrade, DesignerId : designer.id })
    var image = await record.createImage({ img1 : req.file.filename})
    var result = {record, image}
    return result
}

var isNotDesigner = async function  (req, category, userInstance) {
    var {recordDate, recordCost, recordTime, recordEtc, recordGrade} = req.body;
    var record = await userInstance.createRecord({ recordDate, recordCost, recordTime, recordCategory : category, recordEtc, recordGrade })
    var image = await record.createImage({ img1 : req.file.filename})
    var result = {record, image}
    return result
}

module.exports = { isDesigner, isNotDesigner}