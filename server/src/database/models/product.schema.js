const {model, Schema} = require('mongoose');

const {TableNamesEnum} = require('../../constants');

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    hasDiscount: {type: Boolean, default: false},
    oldPrice: {type: Number},
    tags: {type: Array},
    photos: {type: Array},
    docs: {type: Array},
    stockCount: {type: Number, required: true, default: 0},
    userId: {type: Schema.Types.ObjectID, ref: TableNamesEnum.USER}

},
{
    timestamps: true
});

module.exports = model(TableNamesEnum.PRODUCT, ProductSchema);
