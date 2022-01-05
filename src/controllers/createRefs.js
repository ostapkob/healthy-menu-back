const { Category } = require("../model");
const { Food } = require("../model");

async function createRefsFood() {
    await Food.updateMany({}, { $set: { category: [] } }) //clean
    const categories = await Category.find({})
    const foods = await Food.find({})
    for (let food of foods) {
        let findedItems = []
        for (let category of categories) {
            let intersection = category.products.filter(x => food.ingredients.includes(x));
            if (intersection.length > 0) {
                findedItems.push(category.id)
            }
        }
        food.categories = findedItems
        try {
            await Food.findByIdAndUpdate(food.id, food, {
                new: true
            });
        } catch (err) {
            console.log(err)
        }
    }
}

async function createRefsCategory() {
    await Category.updateMany({}, { $set: { foods: [] } }) //clean
    const foods = await Food.find({})
    const categories = await Category.find({})
    for (let category of categories) {
        let findedItems = []
        for (let food of foods) {
            let intersection = category.products.filter(x => food.ingredients.includes(x));
            if (intersection.length > 0) {
                findedItems.push(food.id)
            }
        }
        category.foods = findedItems
        try {
            await Category.findByIdAndUpdate(category.id, category, {
                new: true
            });
        } catch (err) {
            console.log(err)
        }
    }
}


async function createRefs(model) {
    if (model == Food) {
        createRefsFood()
    }
    if (model == Category) {
        createRefsCategory()
    }
}

// module.exports = {createRefsFood, createRefsCategory}
module.exports = createRefs
