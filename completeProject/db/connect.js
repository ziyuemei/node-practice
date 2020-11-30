// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/completeProject', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('成功接数据库')
});
