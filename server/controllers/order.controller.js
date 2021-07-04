const Order = require('../models/order.js');

module.exports.orderCheck = (req, res) => {
    const dateToCheck = new Date(req.body.date);
    const yesterday = dateToCheck.setDate(dateToCheck.getDate() - 1);
    const tomorrow = dateToCheck.setDate(dateToCheck.getDate() + 1);

    Order.find({
        shippingDate: {
            $gte: yesterday,
            $lte: tomorrow
        }
    }).exec((err, orders) => {
        if (err) {
            throw new Error('failed on check orders');
        }
        res.json(orders);
    })
}

module.exports.create = (req, res) => {
    console.log('new order');

    const order = new Order(req.body);
    order.save((err, order) => {
        if (err) {
            throw  new Error('Error add order');
        }
        res.json(order);
    });
}
