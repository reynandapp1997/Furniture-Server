const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const {
    upload
} = require('../middlewares/upload');
const {
    createFurniture,
    deleteFurniture,
    getFurniture,
    getFurnitures,
    getFurnitureByCategory,
    updateFurniture
} = require('../controllers/furniture');

router.get('/', getFurnitures);

router.get('/:id', getFurniture);

router.get('/category/:id', getFurnitureByCategory)

router.post('/', auth, upload.array('images', 10), createFurniture);

router.put('/:id', auth, updateFurniture);

router.delete('/:id', auth, deleteFurniture);

module.exports = router;