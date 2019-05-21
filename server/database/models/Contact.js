const bookshelf = require('../bookshelf');
require('./User');

class Contact extends bookshelf.Model{
  get tableName() {return 'contacts';}
  get hasTimestamps() {return true;}

  user(){
    return this.belongsTo('User', 'created_by');
  }
}



module.exports = bookshelf.model('Contact', Contact);