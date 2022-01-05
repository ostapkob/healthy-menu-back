const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    products: {
        type: [], 
        default: ''
    },
    foods: {
        type: [ObjectId],
        ref: 'Food'
    },
    image: {
        data: Buffer,
        contentType: String
    },
})

module.exports = model("Category", schema)