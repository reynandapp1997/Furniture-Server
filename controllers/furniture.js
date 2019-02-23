const mongoose = require('mongoose');
const moment = require('moment');

const Furnitures = require('../models/furniture');

exports.getFurnitures = (req, res, next) => {
    Furnitures.find()
        .sort({
            createdAt: -1
        })
        .populate('creator', 'name')
        .select('-description')
        .exec()
        .then(result => {
            const furniture = result.map(fur => {
                const createdAt = moment(fur.createdAt).fromNow();
                const updatedAt = moment(fur.updatedAt).fromNow();
                const images = fur.images.map(img => {
                    return `http://localhost:3001/api/upload/image/${img}`
                });
                return {
                    id: fur._id,
                    name: fur.name,
                    price: fur.price,
                    quantity: fur.quantity,
                    cat_id: fur.cat_id,
                    images,
                    item_code: fur.item_code,
                    creator: fur.creator,
                    createdAt,
                    updatedAt
                };
            });
            return res.status(200).json(furniture);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while getting furnitures'
            });
        });
};

exports.getFurniture = (req, res, next) => {
    const id = req.params.id;
    Furnitures.findById(id)
        .sort({
            createdAt: -1
        })
        .populate('creator', 'name')
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Furniture not found'
                });
            }
            const createdAt = moment(result.createdAt).fromNow();
            const updatedAt = moment(result.updatedAt).fromNow();
            const images = result.images.map(img => {
                return `http://localhost:3001/api/upload/image/${img}`
            });
            return res.status(200).json({
                    id: result._id,
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    quantity: result.quantity,
                    cat_id: result.cat_id,
                    images,
                    item_code: result.item_code,
                    creator: result.creator,
                    createdAt,
                    updatedAt
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while getting fureniture'
            });
        });
};

exports.getFurnitureByCategory = (req, res, next) => {
    const id = req.params.id;
    Furnitures.find({ cat_id: id })
        .sort({
            createdAt: -1
        })
        .populate('creator', 'name')
        .select('-description')
        .exec()
        .then(result => {
            const furniture = result.map(fur => {
                const createdAt = moment(fur.createdAt).fromNow();
                const updatedAt = moment(fur.updatedAt).fromNow();
                const images = fur.images.map(img => {
                    return `http://localhost:3001/api/upload/image/${img}`
                });
                return {
                    id: fur._id,
                    name: fur.name,
                    price: fur.price,
                    quantity: fur.quantity,
                    cat_id: fur.cat_id,
                    images,
                    item_code: fur.item_code,
                    creator: fur.creator,
                    createdAt,
                    updatedAt
                };
            });
            return res.status(200).json(furniture);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something error while getting furnitures'
            });
        });
};

exports.createFurniture = (req, res, next) => {
    const creator = req.user.id;
    const files = req.files.map(file => {
        return file.filename
    });
    const {
        name,
        description,
        price,
        quantity,
        cat_id,
        item_code
    } = req.body;
    const fureniture = new Furnitures({
        name,
        description,
        price,
        quantity,
        cat_id,
        images: files,
        item_code,
        creator
    });
    fureniture.save()
        .then(result => {
            return res.status(201).json({
                message: 'Furniture created'
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                message: 'Something error while create furniture'
            });
        });
};

exports.updateFurniture = async (req, res, next) => {
    const id = req.params.id;
    const creator = req.user.id;
    const {
        name,
        description,
        price,
        quantity,
        cat_id,
        images,
        item_code
    } = req.body;
    const fureniture = new Furnitures({
        _id: id,
        name,
        description,
        price,
        quantity,
        cat_id,
        images,
        item_code,
        creator
    });
    const fur = await Furnitures.findOne({
        _id: id,
        creator
    });
    if (!fur) {
        return res.status(404).json({
            message: 'Furniture not found'
        });
    }
    Furnitures.findOneAndUpdate({
        _id: id
    }, fureniture, (error, document, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something error while updating fureniture'
            });
        } else if (document) {
            return res.status(201).json({
                message: 'Furniture updated'
            });
        } else if (result) {
            return res.status(201).json({
                message: 'Furniture updated'
            });
        }
    });
};

exports.deleteFurniture = async (req, res, next) => {
    const id = req.params.id;
    const creator = req.user.id;
    const ann = await Furnitures.findOne({
        _id: id,
        creator
    });
    if (!ann) {
        return res.status(404).json({
            message: 'Furniture not found'
        });
    }
    Furnitures.findOneAndDelete({
        _id: id
    }, (error, result) => {
        return res.status(201).json({
            message: 'Furniture deleted'
        });
    });
};
