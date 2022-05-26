const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        thoughText: {
            type: String,
            required: 'Must be less than 280 characters',

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
