const User = require('../../../DB/sequelize/models/User'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Record = require('../../../DB/sequelize/models/Record'),
      Image = require('../../../DB/sequelize/models/Image'),
      CloudImage = require('../../../DB/sequelize/models/CloudImage'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');

const { Op } = require("sequelize");

const ifDesigner = require('../function/ifDesigner'),
      classifyCategory = require('../function/classifyCategory'),
      cloudinaryDelete = require('../function/cloudinary/delete'),
      imageFunction = require('../function/image');

const show = require('@jongjun/console')

const Post = {

    record  : async function(req, res) {
        let category = req.params.category
        let user = await User.findOne({where : {id : req.user.id}});
        let record = await Post.recordWithDesigner(req, category, user)
        let imgInformation = await imageFunction.urls(req.files)
        let {urls, public_id} = imgInformation
        let urlQuery = await imageFunction.query(urls)
        let idQuery = await imageFunction.query(public_id)
        let image = await record.createImage(urlQuery)
        await record.createCloudImage(idQuery)
        let result = {record, image}
        result[`${category}`] = await Post.recordCategory(req, category, record)
        res.send(result)
    },
    
    // inner function
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
                let cut = await Cut.create({ cutName , cutLength , RecordId : record.id })
                return cut;
            case "perm" : 
                let { permName, permTime, permHurt } = req.body 
                let perm = await Perm.create({ permName, permTime, permHurt, RecordId : record.id })
                return perm
            case "dyeing" : 
                let { dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt } = req.body 
                let dyeing = await Dyeing.create({ dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt, RecordId : record.id })
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

    record : async function(req, res) {
        let {RecordId} = req.body
        let category = req.params.category
        await Delete.recordDelete(category, RecordId)
        await Post.record(req, res)
    }

}

const Delete = {

    record  : async function(req, res) {
        let {category, RecordId} = req.body
        await Delete.recordDelete(category, RecordId)
        res.send("record delete")
    },

    // inner function
    recordDelete : async function(category, RecordId){
        await Record.destroy({where : {id : RecordId}})
        await Delete.clouddDelete(RecordId);
        await CloudImage.destroy({where : {RecordId}})
        await Image.destroy({where : {RecordId}})
        await Delete.recordCategory(category, RecordId)
    },

    clouddDelete : async function(RecordId) {

        let imagesId = await CloudImage.findOne({attributes : ["img1", "img2", "img3"], where : {RecordId}, raw : true})
        let idInfo = Object.entries(imagesId)
        let ids = idInfo.map(ids => ids[1])
        await Promise.all(ids.map(id => cloudinaryDelete.deleteId(id)))

    },

    recordCategory : async function(category, RecordId) {

        switch (category) 
        {
            case "cut" : 
                let cut = await Cut.destroy({where :{RecordId}})
                return cut;
            case "perm" : 
                let perm = await Perm.destroy({where : {RecordId}})
                return perm
            case "dyeing" : 
                let dyeing = await Dyeing.destroy({RecordId})
                return dyeing
            default :
            throw new Error('올바른 목록을 선택해 주세요!');
        }
    },

}

module.exports = {Post, Get, Update, Delete};
