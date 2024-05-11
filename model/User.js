const {model, Schema } = require('mongoose');
const { hash, compare} = require('bcrypt')


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    thoughts: {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
    }

})

const User = model('User', userSchema);


module.exports = User