var User = require('../../../DB/sequelize/models/User')
var Designer = require('../../../DB/sequelize/models/Designer')
var Record = require('../../../DB/sequelize/models/Record')
var Image = require('../../../DB/sequelize/models/Image')
var Cut = require('../../../DB/sequelize/models/Cut')
var Perm = require('../../../DB/sequelize/models/Perm')
var Dyeing = require('../../../DB/sequelize/models/Dyeing')

const { Op } = require("sequelize");
var ifDesigner = require('../function/ifDesigner')
var classifyCategory = require('../function/classifyCategory')

var show = require('@jongjun/console')

var Post = {
    
    record  : async function(req, res) {
        var category = req.params.category
        var user = await User.findOne({where : {id : req.user.id}});
        var {record, image} = await Post.recordWithDesigner(req, category, user)
        var result = {record, image}
        result[`${category}`] = await Post.recordCategory(req, category, record)
        res.send(result)
    },
    
    recordWithDesigner :  async function(req, category, userInstance) {
        var { designerName }= req.body;
        if(designerName){
            return ifDesigner.isDesigner(req,category,userInstance)
        } else {
            return ifDesigner.isNotDesigner(req,category,userInstance)
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
            default :
            throw new Error('올바른 목록을 선택해 주세요!');
        }
    },

}

var Get = {

    main : async function(req, res) {
        return classifyCategory.latest(req, res)
    },

    instanceResult : async function(req, res) {
        var category = req.params.category
        return classifyCategory.categoryResult(req, res, category)
    },

    classification : async function(req, res) {
        var category = req.params.category
        if( category == "latest") {
            classifyCategory.latest(req,res)
        } 
        else if( category == "designer") {
            classifyCategory.designer(req,res)
        } else {
            classifyCategory.category(req,res,category)
        } 
        
    },
    
}


var Update = {
    
}

module.exports = {Post, Get, Update};
