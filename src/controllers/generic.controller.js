const boom = require("boom");
const fs = require('fs');
const createRefs = require('./createRefs')

function handlerBody(body, nameItems) {
  let result = [];
  for (let item of body[nameItems].split(",")) {
    item && result.push(item.trim().toLowerCase());
  }
  body[nameItems] = result
  return body
}


const genericCrud = (model, {
  nameRefsModel = '',
  nameItemsModel = '',
}) => ({
  async get({
    params: {
      id
    }
  }, res) {
    console.log('GET', id)
    try {
      const item = await model.findById(id)
        .populate(nameRefsModel) //, ["title", "products"]); //https://runebook.dev/ru/docs/mongoose/populate
      console.log('sent')
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async getAll(_, res) {
    console.log('GET ALL')
    createRefs(model)
    try {
      const items = await model.find({}).populate(nameRefsModel)
      console.log('sent')
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async create(req, res) {
    console.log('CREATE')
    try {
      let body = handlerBody(req.body, nameItemsModel)
      image = fs.readFileSync(req.file.path)
      body['image'] = {
        data: image,
        contentType: 'image/png'
      }
      const item = new model(body);
      const newItem = await item.save();
      createRefs(model)
      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async update(req, res) {
    console.log('UPDATE')
    let body = handlerBody(req.body, nameItemsModel)
    if (req.file) {
      image = fs.readFileSync(req.file.path)
      body['image'] = {
        data: image,
        contentType: 'image/png'
      }
    }
    let id = body.id
    delete body.id
    try {
      const item = await model.findByIdAndUpdate(id, body, {
        new: true
      });
      createRefs(model)
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }

  },
  async delete({
    params: {
      id
    }
  }, res) {
    console.log('DELETE')
    try {
      await model.findByIdAndDelete(id);
      return res.status(200).send({
        status: "OK",
        message: "Item removed"
      });
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async print(req, res) {
    console.log(req.body)
    return res.status(200).send("OK");
  },

  async getItems(_, res) {
    console.log('GET Items')
    try {
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async test(req, res) {
    console.log('test')
    try {
      let body = handlerbody(req.body)
      image = fs.readfilesync(req.file.path) || ""
      body['image'] = {
        data: image,
        contenttype: 'image/png'
      }
      body[nameRefsModel] = "61c1daac38e47ecc35e41b5e"
      console.log(body)
      const item = new model(body);
      const newitem = await item.save();
      return res.status(200).send(newitem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
});

module.exports = genericCrud;