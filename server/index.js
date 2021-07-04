const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
const Category = require("./models/category");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use("/api", routes);
const localUrl = "mongodb://localhost:27017/shupersalDB";
mongoose
	.connect(localUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(5000, () => {
			console.log("application listen on port 5000");
		});
	});

Category.find().exec((err, categories) => {
	if (err) {
		throw new Error("error on get/create categories");
	}
	if (categories && categories.length == 0) {
		const new_categories = [
			"Dairy",
			"Vegetables",
			"Drinks",
			"Meat",
			"Fruits",
			"Bakery",
			"Chips&Snacks",
		];
		let promises = [];

		new_categories.forEach((nc) => {
			const cat = new Category({ name: nc });
			promises.push(cat.save());
		});

		Promise.all(promises).then((res) => {
			console.log(res);
		});
	}
});
