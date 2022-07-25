import User from '../../../DB/sequelize/models/User.js';
import Designer from '../../../DB/sequelize/models/Designer.js';
import Record from '../../../DB/sequelize/models/Record.js';
import Image from '../../../DB/sequelize/models/Image.js';
import CloudImage from '../../../DB/sequelize/models/CloudImage.js';
import Cut from '../../../DB/sequelize/models/Cut.js';
import Perm from '../../../DB/sequelize/models/Perm.js';
import Dyeing from '../../../DB/sequelize/models/Dyeing.js';

import classifyCategory from '../function/classifyCategory.js';
import cloudinary from '../function/cloudinary/delete.js';
import image from '../function/image.js';


const Post = {
    
    // record Post
    // record can have designer
    // record must belong to category, img
    record : async function(req, res) {
        let user = await User.findOne({where : {id : req.user.id}});
        let designer = await Post.designerInstance(req);
        let record = await Post.recordInstance(req, user, designer);
        let category = await Post.categoryInstance(req, record);
        let img = await Post.imgInstance(req, record);
        let result = {user, designer, record, category, img}
        return res.send({code : 200, result})
    },

    // inner function
    // make instance
    designerInstance : async function(req) {
        let { designerName }= req.body;
        if(designerName){
            let designer = await Designer.findOne({where : { designerName }})
            return designer
        } else {
            throw new Error("올바른 디저이너를 선택해주세요")
        }
    },

    recordInstance : async function(req, userInstance, designerInstance){
        let category = req.params.category;
        if(designerInstance) {
            let {recordDate, recordCost, recordEtc, recordGrade} = req.body;
            let record = await Record.create({ recordDate, recordCost, recordCategory : category, recordEtc, recordGrade, UserId : userInstance.id, DesignerId : designerInstance.id })
            return record
        } else {
            let {recordDate, recordCost, recordEtc, recordGrade} = req.body;
            let record = await Record.create({ recordDate, recordCost, recordCategory : category, recordEtc, recordGrade, UserId : userInstance.id })
            return record
        }
    },

    categoryInstance : async function(req, recordInstance) {
        let type = req.params.category;
        let info = await Post.recordCategory(req, recordInstance);
        let category = {type, info}
        return category
    },

    imgInstance : async function(req, recordInstance) {
        let imgInformation = await image.urls(req.files)
        let {urls, public_id} = imgInformation
        let urlQuery = await image.query(urls)
        let idQuery = await image.query(public_id)
        let url = await recordInstance.createImage(urlQuery)
        let id = await recordInstance.createCloudImage(idQuery)
        let img = {url, id}
        return img
    },
    
    // switch category 
    recordCategory : async function(req, recordInstance) {
        let category = req.params.category;
        switch (category) 
        {
            case "cut" : 
                let { cutName, cutLength } = req.body
                let cut = await Cut.create({ cutName , cutLength , RecordId : recordInstance.id })
                return cut;
            case "perm" : 
                let { permName, permTime, permHurt } = req.body 
                let perm = await Perm.create({ permName, permTime, permHurt, RecordId : recordInstance.id })
                return perm
            case "dyeing" : 
                let { dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt } = req.body 
                let dyeing = await Dyeing.create({ dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt, RecordId : recordInstance.id })
                return dyeing
            default :
            throw new Error('올바른 목록을 선택해 주세요!');
        }
    },

}

const Get = {
    
    // main Get
    // show latest record
    main : async function(req, res) {
        return classifyCategory.latest(req, res)
    },

    // instance Get
    // show record after submit
    instance : async function(req, res) {
        return classifyCategory.instanceResult(req, res)
    },

    // classification Get
    // show record by category
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
    
    // result Get
    // show record by recordId
    result : async function(req, res) {
        classifyCategory.eachResult(req,res)
    },
}


const Update = {

    // record Update
    record : async function(req, res) {
        let {RecordId} = req.body
        let category = req.params.category
        await Delete.recordDelete(category, RecordId)
        await Post.record(req, res)
    },
}

const Delete = {

    // record Delete
    record  : async function(req, res) {
        try {
            let {category, RecordId} = req.body
            let deleteResult = await Delete.recordDelete(category, RecordId)
            res.send({code : 200, deleteResult})
        } catch(e) {
            res.send({code : 404, msg : e})
        }
    },

    // inner function
    // delete all info related RecordId
    // record, cloudIamage, image and recordCategory delete by sequelize
    // cloudDelete delete info at cloudinary
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
        if(ids[0] != null) {
            await Promise.all(ids.map(id => cloudinary.deleteId(id)))
        }
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

export default {Post, Get, Update, Delete};
