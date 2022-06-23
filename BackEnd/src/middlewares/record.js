var User = require('../../../DB/sequelize/models/User')
var Designer = require('../../../DB/sequelize/models/Designer')
var Record = require('../../../DB/sequelize/models/Record')
var Image = require('../../../DB/sequelize/models/Image')
var Cut = require('../../../DB/sequelize/models/Cut')
var Perm = require('../../../DB/sequelize/models/Perm')
var Dyeing = require('../../../DB/sequelize/models/Dyeing')

const { Op } = require("sequelize");
var nullCheck = require('../function/nullCheck')

var show = require('@jongjun/console')

var Post = {
    
    record  : async function(req, res) {
        var category = req.params.category
        var user = await User.findOne({where : {id : req.user.id}});
        var {record, image} = await Post.recordDesigner(req, category, user)
        var result = {record, image}
        result[`${category}`] = await Post.recordCategory(req, category, record)
        res.send(result)
    },
    
    recordDesigner :  async function(req, category, userInstance) {
        var {recordDate, recordCost, recordTime, designerName, recordEtc, recordGrade} = req.body;
        if(designerName){
            var designer = await Designer.findOne({where : { designerName }})
            var record = await userInstance.createRecord({ recordDate, recordCost, recordTime, recordCategory : category, recordEtc, recordGrade, DesignerId : designer.id })
            var image = await record.createImage({ img1 : req.file.filename})
            var result = {record, image}
            return result
        } else {
            var record = await userInstance.createRecord({ recordDate, recordCost, recordTime, recordCategory : category, recordEtc, recordGrade })
            var image = await record.createImage({ img1 : req.file.filename})
            var result = {record, image}
            return result
        }
    },
    
    recordCategory : async function(req, category, record) {
        switch (category) 
        {
            case "cut" : 
                var { cutName, cutLength } = req.body
                var cut = await Cut.create({ cutName , cutLength , RecordId : record.id})
                return cut;
            case "perm" : 
                var { permName, permTime, permHurt } = req.body 
                var perm = await Perm.create({ permName, permTime, permHurt, RecordId : record.id})
                return perm
            case "dyeing" : 
                var { dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt } = req.body 
                var dyeing = await Dyeing.create({ dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt, RecordId : record.id})
                return dyeing
        }
    },

}

var Get = {

    main : async function(req, res) {
        var user = await User.findOne({wherer : {id : req.user.id}});
        var recordArray = await user.getRecords({raw : true});
        var recordObj = Object.assign({}, recordArray)
        var recordCount = await user.countRecords()
        var img = {};
        for (var i = 0; i < recordCount; i++) {
            img[i] = await Image.findOne({where : {RecordId : recordArray[i].id}, raw : true})
        }
        var result = {user, record : recordObj, img}
        res.send(result)
    },

    designerList : async function(req, res) {
        var fav = await Designer.findAndCountAll({where :{[Op.and ] : [{UserId : req.user.id}, {designerFav : '1'}]},  order : [['updatedAt', 'DESC']],});
        var designerList = {}
        for (var i = 0; i < fav.count; i++) {
            designerList[i] = fav.rows[i]
        }
        var result = designerList
        res.send(result)
    },

    result : async function(req, res) {
        var user = await User.findOne({wherer : {id : req.user.id}});
        var recordArray = await user.getRecords({raw : true, order : [['createdAt', 'DESC']]});
        var recordLast = recordArray[0]
        var img= await Image.findOne({where : {RecordId : req.user.id}, raw : true})
        var result = {user, record : recordLast, img}
        res.send(result)
    },
    
    classification : async function(req, res) {
        var standard = req.params.standard
        show.Hash(standard)
        if( standard == "latest") {
            Get.standardFunction.latest(req,res)
        } if( standard == "designer") {
            Get.standardFunction.designer(req,res)
        } else {
            Get.standardFunction.category(req,res)
        }
        
    },

    standardFunction : {
        latest : async function(req, res) {
            var user = await User.findOne({wherer : {id : req.user.id}});
            var recordArray = await user.getRecords({raw : true, order : [['createdAt', 'DESC']]});
            var recordObj = Object.assign({}, recordArray)
            var recordCount = await user.countRecords()
            var img = {};
            for (var i = 0; i < recordCount; i++) {
                img[i] = await Image.findOne({where : {RecordId : recordArray[i].id}, raw : true})
            }
            var result = {user, record : recordObj, img}
            return res.send(result)
        },
        designer : async function(req, res) {
            var user = await User.findOne({wherer : {id : req.user.id}});
            var recordArray = await user.getRecords({raw : true, group : "DesignerId"});
            var recordObj = Object.assign({}, recordArray)
            var recordCount = await user.countRecords()
            var img = {};
            for (var i = 0; i < recordCount; i++) {
                img[i] = await Image.findOne({where : {RecordId : recordArray[i].id}, raw : true})
            }
            var result = {user, record : recordObj, img}
            return res.send(result)
        },
        category : async function(req, res) {
            var user = await User.findOne({wherer : {id : req.user.id}});
            var recordArray = await Record.findAll({raw : true, where : {[Op.and] : [{recordCategory : req.params.standard}, {UserId : req.user.id}]}});
            var recordObj = Object.assign({}, recordArray)
            var recordCount = await user.countRecords({where : {recordCategory : req.params.standard}})
            var img = {};
            for (var i = 0; i < recordCount; i++) {
                show.Hash(i)
                img[i] = await Image.findOne({where : {RecordId : recordArray[i].id}, raw : true})
            }
            var result = {user, record : recordObj, img}
            return res.send(result)
        }
    }

}


var Update = {
    
}

module.exports = {Post, Get, Update};
