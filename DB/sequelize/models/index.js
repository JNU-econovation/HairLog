const Sequelize = require('sequelize');
const User = require('./User');
const Record = require('./Record');
const Image = require('./Image');
const Designer = require('./Designer');
const Cut = require('./Cut');
const Perm = require('./Perm');
const Dyeing = require('./Dyeing');




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