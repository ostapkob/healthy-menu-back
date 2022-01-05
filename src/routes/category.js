const router = require('express-promise-router')()
const { category } = require('../controllers')
const {upload} = require('../config/app.config')

router.get('/', category.getAll)
router.get("/:id", category.get)
// router.post("/", category.create)
router.post('/', upload.single('image'), category.create)
// router.put("/:id", category.update)
router.put('/:id', upload.single('image'), category.update)
router.delete("/:id", category.delete)
router.post('/test', upload.single('image'), category.test)
router.get("/print", category.print)

module.exports = router;