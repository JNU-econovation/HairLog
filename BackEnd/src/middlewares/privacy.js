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
        let result = {}
        if(recordDesc != null) {
            let recentDate = new Date(recordDesc.recordDate)
            let nextDate = new Date( recentDate.getFullYear(), recentDate.getMonth(), recentDate.getDate() + req.user.userCycle)  
            result = { userName, recentDate, nextDate }
        } else {
            result = { userName }
        }
        res.send(result)
    },

}


const Update = {

    privacy : async function(req, res) {
        const { userEmail, userPassword, userName, userSex, userCycle } = req.body;
        try {
          const exUser = await User.findOne({ where: { userEmail } });
          if (exUser) {
            return res.redirect('/join?error=exist');
          }
          const hash = await bcrypt.hash(userPassword, 12);
          let updatePrivacy = await User.update({
            userEmail,
            userPassword : hash,
            userName,
            userSex,
            userCycle,
          });
          return res.send(updatePrivacy);
        } catch (error) {
          console.error(error);
          return next(error);
        }
    }
    
}

module.exports = {Post, Get, Update};
