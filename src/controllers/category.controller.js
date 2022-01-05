const genericCrud = require("./generic.controller");
const { Category } = require("../model");

const relations = {
  nameRefsModel: 'foods',
  nameItemsModel: 'products',
}

module.exports = {
  ...genericCrud(Category, relations),
};
