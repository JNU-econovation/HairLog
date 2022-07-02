const User = require('../../../DB/sequelize/models/User'),
      Record = require('../../../DB/sequelize/models/Record'),
      Designer = require('../../../DB/sequelize/models/Designer'),
      Image = require('../../../DB/sequelize/models/Image'),
      Cut = require('../../../DB/sequelize/models/Cut'),
      Perm = require('../../../DB/sequelize/models/Perm'),
      Dyeing = require('../../../DB/sequelize/models/Dyeing');

const { Op } = require("sequelize");

const show = require('@jongjun/console')

const Post = {
    
}

const Get = {
    
    user : async function(req, res) {
        let userName =  req.user.userName;
        let recordDesc = await Record.findOne({ attributes: ['recordDate'], order : [['recordDate', 'DESC']], where : {UserId : req.user.id}})
        let recentDate = new Date(recordDesc.recordDate)
        let nextDate = new Date( recentDate.getFullYear(), recentDate.getMonth(), recentDate.getDate() + req.user.userCycle)  
        let result = { userName, recentDate, nextDate }
        res.send(result)
    },

}


const Update = {
    // 개인정보 수정 페이지 완성되면 작성
}

module.exports = {Post, Get, Update};
