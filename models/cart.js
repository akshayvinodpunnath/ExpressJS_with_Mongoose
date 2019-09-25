const mongodb = require('mongodb');
const getDb = require ('../util/database').getDb; 

class Cart {

}

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
