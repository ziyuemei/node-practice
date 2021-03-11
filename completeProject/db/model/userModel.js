const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    us: { type: String, required: true },
    ps: { type: String, required: true },
    age: { type: Number, default: 0 },
    sex: { type: Number, default: 0 }
});
var User = mongoose.model('users', userSchema);

module.exports = User