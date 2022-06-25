var User = require('../../../DB/sequelize/models/User')
var Designer = require('../../../DB/sequelize/models/Designer')
var Image = require('../../../DB/sequelize/models/Image')
var Cut = require('../../../DB/sequelize/models/Cut')
var Perm = require('../../../DB/sequelize/models/Perm')
var Dyeing = require('../../../DB/sequelize/models/Dyeing')

const { Op } = require("sequelize");


var show = require('@jongjun/console')

var Post = {
    
    designer : async function(req, res) {
        var {designerName, designerSalon, designerFav} = req.body;
        var user = await User.findOne({wherer : {id : req.user.id}});
        var designerRecord = await user.createDesigner({designerName, designerSalon, designerFav})
        res.send(designerRecord)
    },

}

var Get = {

    designer : async function(req, res) {
        var user = await User.findOne({wherer : {id : req.user.id}});
        var designerList = await user.getDesigners({raw : true})
        res.send(designerList)
    },

    favDesignerList : async function(req, res) { 
        var fav = await Designer.findAndCountAll({where :{[Op.and ] : [{UserId : req.user.id}, {designerFav : '1'}]},  order : [['updatedAt', 'DESC']],});
        const result = fav.rows.map(row => row);
        res.send(result)
    },


}


var Update = {

}

module.exports = {Post, Get, Update};
