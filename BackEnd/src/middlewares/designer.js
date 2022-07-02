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
        let {designerName, designerSalon, designerFav} = req.body;
        let user = await User.findOne({wherer : {id : req.user.id}});
        let designerRecord = await user.createDesigner({designerName, designerSalon, designerFav})
        res.send(designerRecord)
    },

}

const Get = {

    designer : async function(req, res) {
        let user = await User.findOne({wherer : {id : req.user.id}});
        let designerList = await user.getDesigners({raw : true})
        res.send(designerList)
    },

    favDesignerList : async function(req, res) { 
        let fav = await Designer.findAndCountAll({where :{[Op.and ] : [{UserId : req.user.id}, {designerFav : '1'}]},  order : [['updatedAt', 'DESC']],});
        const result = fav.rows.map(row => row);
        res.send(result)
    },


}


const Update = {

}

const Delete = {

    designer : async function(req, res) {
        let {DesignerId} = req.body
        await Designer.destroy({where : {id : DesignerId}})
        return res.send("designer delete")
    },

}
module.exports = {Post, Get, Update, Delete};
