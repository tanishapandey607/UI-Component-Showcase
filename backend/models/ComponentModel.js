const { Schema, model, Types } = require("mongoose")

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users' },
    code: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },

}, { timestamps: true });

module.exports = model('component', mySchema);