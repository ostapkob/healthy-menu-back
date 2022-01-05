const genericCrud = require("./generic.controller");
const { Food } = require("../model");

const relations = {
  nameRefsModel: 'categories',
  nameItemsModel: 'ingredients',
}

module.exports = {
  ...genericCrud(Food, relations),
};
