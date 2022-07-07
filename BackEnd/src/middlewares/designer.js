const User = require('../../../DB/sequelize/models/User'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Image = require('../../../DB/sequelize/models/Image'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');

const { Op } = require("sequelize");


const show = require('@jongjun/console')

const Post = {
    
    designer : async function(req, res) {
        try {
            let {designerName, designerSalon, designerFav} = req.body;
            let user = await User.findOne({wherer : {id : req.user.id}});
            let designerRecord = await user.createDesigner({designerName, designerSalon, designerFav})
            res.send({code : 200, designerRecord})
        } catch(e) {
            res.send({code : 404, msg : e})
        }
    },

}

const Get = {

    designer : async function(req, res) {
        try {
            let user = await User.findOne({wherer : {id : req.user.id}});
            let designerList = await user.getDesigners({raw : true})
            res.send({code : 200, designerList})
        } catch(e) {
            res.send({code : 404, msg : e})
        }
    },

    favDesignerList : async function(req, res) { 
        try {
            let fav = await Designer.findAndCountAll({where :{[Op.and] : [{UserId : req.user.id}, {designerFav : '1'}]}});
            const result = fav.rows.map(row => row);
            res.send({code :200, result})
        } catch(e) {
            res.send({code : 404, msg : e})
        }
    },


}


const Update = {
    
    designer : async function(req, res) {
        try {
            let {DesignerId, designerName, designerSalon, designerFav} = req.body;
            let upadateDesigner = await Designer.update({designerName, designerSalon, designerFav}, {where : {id : DesignerId}})
            res.send({code : 200, upadateDesigner})
        } catch(e) {
            res.send({code : 404, msg : e})
        }
    }

}

const Delete = {

    designer : async function(req, res) {
        try {
            let {DesignerId} = req.body
            let deleteDesigner = await Designer.destroy({where : {id : DesignerId}})
            res.send({code : 200, deleteDesigner})
        } catch(e) {
            res.send({code : 404, msg : e})
        }
    },

}
module.exports = {Post, Get, Update, Delete};
