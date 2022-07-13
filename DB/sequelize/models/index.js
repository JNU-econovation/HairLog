import Sequelize from 'sequelize';
import User from './User.js';
import Record from './Record.js';
import Image from './Image.js';
import CloudImage from './CloudImage.js';
import Designer from './Designer.js';
import Cut from './Cut.js';
import Perm from './Perm.js';
import Dyeing from './Dyeing.js';


const env = process.env.NODE_ENV || 'development';
import sequelizeConfig from '../config/config.js' ;


// connecting to a database
const sequelize = new Sequelize(
  sequelizeConfig[env].database, 
  sequelizeConfig[env].username, 
  sequelizeConfig[env].password, 
  sequelizeConfig[env]
);

// add db object
const db = {};
db.sequelize = sequelize; 
db.User = User;
db.Record = Record;
db.Image = Image;
db.CloudImage = CloudImage;
db.Designer = Designer;
db.Cut = Cut;
db.Perm = Perm;
db.Dyeing = Dyeing;




// Sequelize adds a getter & a setter for each attribute defined through Model.init
User.init(sequelize);
Record.init(sequelize);
Image.init(sequelize);
CloudImage.init(sequelize);
Designer.init(sequelize);
Cut.init(sequelize);
Perm.init(sequelize);
Dyeing.init(sequelize);




User.associate(db);
Record.associate(db);
Image.associate(db);
CloudImage.associate(db);
Designer.associate(db);
Cut.associate(db);
Perm.associate(db);
Dyeing.associate(db);



export default db;