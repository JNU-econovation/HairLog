import User from '../../../DB/sequelize/models/User.js';
import Designer from '../../../DB/sequelize/models/Designer.js';
import Record from '../../../DB/sequelize/models/Record.js';
import Image from '../../../DB/sequelize/models/Image.js';
import Cut from '../../../DB/sequelize/models/Cut.js';
import Perm from '../../../DB/sequelize/models/Perm.js';
import Dyeing from '../../../DB/sequelize/models/Dyeing.js';


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
    let designer = await Promise.all(record.map(res => findOne({where : {id :res.DesignerId}, raw : true})))
    return designer
}

export default { isDesigner, isNotDesigner, getDesigner,}