const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You must create a username',
            trim: true
        },
        email: {
            type: String,
            required: 'Please provide your email address',
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    
        id: false
    }
);

// get number of Friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce(
        (total, friends) => total + friends.length + 1,
        0
    );
});


const User = model('User', UserSchema);

module.exports = User;
