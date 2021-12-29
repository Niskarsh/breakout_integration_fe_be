const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://Niskarsh:Nik.31@cluster0.8xaqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((data) => {
    console.log("MongoDB connected");

    const personSchema = new Schema({
      name: String,
      age: Number,
    });

    const Person = mongoose.model("Person", personSchema);

    // schema => model => document => save in mongodb

    // // parse application/x-www-form-urlencoded
    // app.use(bodyParser.urlencoded({ extended: false }))

    // // parse application/json
    // app.use(bodyParser.json())

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3001"); 
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      next(); 
    })

    app.get("/", function (req, res) {
      res.send("Hello World, This was a get request");
    });

    app.get("/fetchAll", function (req, res) {
      // Read all operation
      // const { age } = req.params;
      Person.find({})
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
    });

    // Dynamic route :age
    app.get("/fetch/:ageP", function (req, res) {
      // Filtered read operation
      const { ageP } = req.params;
      Person.find({ age: ageP })
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
    });

    // mongoose => Schema => Model => Document => Save in mongodb

    app.post("/user/:nameP/:ageP", function (req, res) {
      // write operation
      const { nameP, ageP } = req.params;
      var person1 = new Person({
        name: nameP,
        age: ageP,
      }); // Creating a document

      person1
        .save()
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
    });

    app.post("/", function (req, res) {
      res.send("THis was a post request");
    });

    app.patch("/user/:nameP/:ageP", function (req, res) {
      // UPdate operation
      const { nameP, ageP } = req.params;
      Person.update({ name: nameP }, { age: ageP })
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
    });

    app.delete("/user/:ageP", function (req, res) {
      // delete operation
      const { ageP } = req.params;
      Person.deleteMany({ age: ageP })
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
    });

    let port = process.env.PORT || 3000;

    app.listen(port, function () {
      console.log(`Server up and running on port ${port}`);
    });
  })
  .catch((err) => console.log("Connection Error", err));

// GET POST PUT/PATCH DELETE
// CRUD operations - create-POST read-GET update-PUT/PATCH delete-DELETE