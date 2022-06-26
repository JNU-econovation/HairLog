const Sequelize = require('sequelize'),
      User = require('./User'),
      Record = require('./Record'),
      Image = require('./Image'),
      Designer = require('./Designer'),
      Cut = require('./Cut'),
      Perm = require('./Perm'),
      Dyeing = require('./Dyeing');




const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

// connecting to a database
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

// add db object
const db = {};
db.sequelize = sequelize; 
db.User = User;
db.Record = Record;
db.Image = Image;
db.Designer = Designer;
db.Cut = Cut;
db.Perm = Perm;
db.Dyeing = Dyeing;




// Sequelize adds a getter & a setter for each attribute defined through Model.init
User.init(sequelize);
Record.init(sequelize);
Image.init(sequelize);
Designer.init(sequelize);
Cut.init(sequelize);
Perm.init(sequelize);
Dyeing.init(sequelize);




User.associate(db);
Record.associate(db);
Image.associate(db);
Designer.associate(db);
Cut.associate(db);
Perm.associate(db);
Dyeing.associate(db);



module.exports = db;