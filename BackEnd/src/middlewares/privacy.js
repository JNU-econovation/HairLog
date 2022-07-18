import User from '../../../DB/sequelize/models/User.js';
import Record from '../../../DB/sequelize/models/Record.js';


import bcrypt from 'bcrypt';

const Post = {
    
}

const Get = {
    
    user : async function(req, res) {
      try {
        let user =  req.user;
        let recordDesc = await Record.findOne({ attributes: ['recordDate'], order : [['recordDate', 'DESC']], where : {UserId : req.user.id}})
        let result = {}
        if(recordDesc != null) {
            let recentDate = new Date(recordDesc.recordDate)
            let nextDate = new Date( recentDate.getFullYear(), recentDate.getMonth(), recentDate.getDate() + req.user.userCycle)  
            result = { user, recentDate, nextDate }
            res.send({code :200, result})
        } else {
            result = { user }
            res.send({code :200, result})
        }
      } catch(e) {
        res.send({code : 404, msg : e})
      }

    },

}


const Update = {

    privacy : async function(req, res,next) {
        const { userEmail, userPassword, userName, userSex, userCycle } = req.body;
        try {
          const exUser = await User.findOne({ where: { userEmail } });
          if (exUser) {
            const hash = await bcrypt.hash(userPassword, 12);
            let updatePrivacy = await User.update({
              userEmail,
              userPassword : hash,
              userName,
              userSex,
              userCycle,
            },
            {where : {id : req.user.id}});
            return res.send({code : 200, updatePrivacy});
          }
          return res.send({code: 404, msg : "No Existing User"})
        } catch (error) {
          console.error(error);
          return next(error);
        }
    }
    
}

export default {Post, Get, Update};
