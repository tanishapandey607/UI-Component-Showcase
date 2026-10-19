const express = require("express");
const Model = require("../models/ComponentModel");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require("../middlewares/auths");

const router = express.Router();


router.post("/add", auth, (req, res) => {
    req.body.user = req.user._id;
    console.log(req.body);
    //res.send('response from user add');
    new Model(req.body)
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);

            res.status(500).json(err);

        });
});


router.get("/getall", (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});




router.get("/getbyemail/:email", (req, res) => {
    Model.find({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get("/getbyid/:id", (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put("/update/:id", (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.delete("/delete/:id", (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;