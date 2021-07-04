const Product = require('../models/product');
const Category = require('../models/category');

module.exports.list = (req, res) => {
    Product.find().exec((err, products) => {
        if (err) {
            throw new Error('Error get products');
        }

        res.json(products).status(200);
    })
}

module.exports.addNewProduct = (req, res) => {
    console.log('new product');

    const product = new Product(req.body);
    product.save((err, product) => {
        if (err) {
            throw  new Error('Error add product');
        }
        res.json(product);
    });
}
module.exports.getCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            throw new Error('Error get categories');
        }

        res.json(categories).status(200);
    })
}
