const router = require("express-promise-router")();
const { food } = require("../controllers");
const {upload} = require('../config/app.config')

router.get('/', food.getAll)
router.get('/items', food.getItems)
router.get("/:id", food.get)
// router.post("/", food.create)
router.post('/', upload.single('image'), food.create)
// router.put("/:id", food.update)
router.put('/:id', upload.single('image'), food.update)
router.delete("/:id", food.delete)
router.post('/test', upload.single('image'), food.test)
router.post('/print',  food.print)

module.exports = router;
