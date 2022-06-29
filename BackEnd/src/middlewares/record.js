const User = require('../../../DB/sequelize/models/User'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Record = require('../../../DB/sequelize/models/Record'),
      Image = require('../../../DB/sequelize/models/Image'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');

const { Op } = require("sequelize");

const ifDesigner = require('../function/ifDesigner'),
      classifyCategory = require('../function/classifyCategory'),
      imageFunction = require('../function/image');

const show = require('@jongjun/console')

const Post = {

    record  : async function(req, res) {
        let category = req.params.category
        let user = await User.findOne({where : {id : req.user.id}});
        let record = await Post.recordWithDesigner(req, category, user)
        let urls = await imageFunction.urls(req.files)
        let query = await imageFunction.query(urls)
        let image = await record.createImage(query)
        let result = {record, image}
        result[`${category}`] = await Post.recordCategory(req, category, record)
        res.send(result)
    },
    
    recordWithDesigner :  async function(req, category, userInstance) {
        let { designerName }= req.body;
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
                let { cutName, cutLength } = req.body
                let cut = await Cut.create({ cutName , cutLength , RecordId : record.id})
                return cut;
            case "perm" : 
                let { permName, permTime, permHurt } = req.body 
                let perm = await Perm.create({ permName, permTime, permHurt, RecordId : record.id})
                return perm
            case "dyeing" : 
                let { dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt } = req.body 
                let dyeing = await Dyeing.create({ dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt, RecordId : record.id})
                return dyeing
            default :
            throw new Error('올바른 목록을 선택해 주세요!');
        }
    },

}

const Get = {

    main : async function(req, res) {
        return classifyCategory.latest(req, res)
    },

    instanceResult : async function(req, res) {
        let category = req.params.category
        show.With('1', category)
        return classifyCategory.categoryResult(req, res, category)
    },

    classification : async function(req, res) {
        let category = req.params.category
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


const Update = {
    
}

module.exports = {Post, Get, Update};
