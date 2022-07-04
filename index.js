const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./model/Users");
app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://root:root@cluster0.y8hyzch.mongodb.net/mern?retryWrites=true&w=majority"
);

app.get("/getUsers", (request, response) => {
    UserModel.find({}, (err, result) => {
        if (!err) {
            response.json(result);
        } else {
            response.json(err);
        }
    })
});


app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});



app.put("/updateUser", (req, res) => {

    const { id, fulName, age, rollNum, email } = req.body

    try {
        UserModel.findById(id, (err, user) => {
            // console.log(user)
            alert(user)
            user.name = fulName
            user.age = age
            user.rollNum = rollNum
            user.email = email

            user.save()
            res.send("User has been successfully updated in DB")
        })
    }

    catch (err) {
        res.send("Getting error from server")
    }
})



app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id

    await UserModel.findByIdAndRemove(id).exec()
    res.send(
        "User has been successfully deleted from DB"
    )

})



const PORT = "8000";

app.listen(PORT, () => {
    console.log(`Server is running perfectly on  port  ${PORT}`);
});
