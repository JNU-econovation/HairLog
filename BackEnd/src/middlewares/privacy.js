var User = require('../../../DB/sequelize/models/User')
var Record = require('../../../DB/sequelize/models/Record')
var Designer = require('../../../DB/sequelize/models/Designer')
var Image = require('../../../DB/sequelize/models/Image')
var Cut = require('../../../DB/sequelize/models/Cut')
var Perm = require('../../../DB/sequelize/models/Perm')
var Dyeing = require('../../../DB/sequelize/models/Dyeing')

const { Op } = require("sequelize");

var show = require('@jongjun/console')

var Post = {
    
}

var Get = {
    
    user : async function(req, res) {
        var userName =  req.user.userName;
        var recordDesc = await Record.findOne({ attributes: ['recordDate'], order : [['recordDate', 'DESC']], where : {UserId : req.user.id}})
        var recentDate = new Date(recordDesc.recordDate)
        var nextDate = new Date( recentDate.getFullYear(), recentDate.getMonth(), recentDate.getDate() + req.user.userCycle)  
        var result = { userName, recentDate, nextDate }
        res.send(result)
    },

}


var Update = {
    
}

module.exports = {Post, Get, Update};
