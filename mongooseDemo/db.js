const mongoose = require('mongoose');
// 主机地址：localhost  数据库名字：
mongoose.connect('mongodb://localhost/mongooseDemo', { useNewUrlParser: true, useUnifiedTopology: true });

// 链接数据库
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // 数据库连接成功
  console.log('db ok');
});

// scheme 对象操作数据库

// 创建一个和集合相关的 scheme 对象
const userSchema = mongoose.Schema({
    us: {type: String, required: true},
    ps: {type: String, required: true},
    age: Number,
    sex: {type: Number, default: 0}
})

// 将 scheme 对象转化为数据模型
const User = mongoose.model('users', userSchema);    //该数据对象和集合关联('集合名/表名'，scheme 对象)

// 操作数据库

// 添加数据,单条数据就是一个对象{}，插入多条数据就是数组嵌套对象[{},{},{}...]
User.insertMany([{us: '紫月梅2', ps: '12345', age: 13, sex: 2}, {us: '紫月梅3', ps: '12345', age: 20, sex: 1}, {us: '紫月梅4', ps: '12345', age: 18, sex: 2}])
.then((data)=>{
    console.log(data, '插入成功')
})
.catch((err)=>{
    console.log(err, '插入失败')
})

// 查询数据---所有数据
// User.find()
// .then((data)=>{
//     console.log(data, '查询成功')
// })
// .catch((err)=>{
//     console.log(err, '查询失败')
// })

// 查询数据---有条件查询
// User.find({us: '紫月梅'})
// .then((data)=>{
//     console.log(data, '查询成功')
// })
// .catch((err)=>{
//     console.log(err, '查询失败')
// })

// 删除数据---删除所有
// User.remove()
// .then((data)=>{
//     console.log(data, '删除成功')
// })
// .catch((err)=>{
//     console.log(err, '删除失败')
// })
