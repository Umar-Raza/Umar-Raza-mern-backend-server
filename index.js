const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./model/Users");

app.use(express.json());
app.use(cors());

//mongodb+srv://root:root@cluster0.y8hyzch.mongodb.net/mern?retryWrites=true&w=majority

mongoose.connect("mongodb://localhost/users");

app.get("/getUsers", (request, response) => {
	UserModel.find({}, (err, result) => {
		if (!err) {
			response.json(result);
		} else {
			response.json(err);
		}
	});
});

app.post("/createUser", async (req, res) => {
	const user = req.body;
	console.log(user);
	try {
		const newUser = new UserModel(user);
		await newUser.save();
		res.json(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.put("/updateUser", async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.id);

		for (const keys in req.body) {
			if (keys === req.body.id) return;
			user[keys] = req.body[keys];
		}

		await user.save();

		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

app.delete("/deleteUser/:id", async (req, res) => {
	const id = req.params.id;

	await UserModel.findByIdAndRemove(id).exec();
	res.send("User has been successfully deleted from DB");
});

const PORT = "8000";

app.listen(PORT, () => {
	console.log(`Server is running perfectly on  port  ${PORT}`);
});
