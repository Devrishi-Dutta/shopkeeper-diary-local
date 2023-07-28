const express = require('express');

const cors = require('cors');

const path=require('path');

const dotenv=require('dotenv');
dotenv.config();

require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");

const Seller = require("./db/Seller");

const jwt = require('jsonwebtoken');
const jwtKey = 'shopkeeper';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let newuser = await user.save();
    newuser = newuser.toObject();
    delete newuser.password;
    jwt.sign({ newuser }, jwtKey, (err, token) => {
        if (err) {
            res.send({ newuser: "Something went wrong" });
        }
        res.send({ newuser, auth: token });
    })
});

app.post("/login", async (req, res) => {
    let user = await User.findOne(req.body).select("-password");
    if (req.body.password && req.body.email) {
        if (user) {
            jwt.sign({ user }, jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: "No user found" });
                }
                res.send({ user, auth: token });
            })

        }
        else {
            res.send({ result: "No user found" });
        }
    }
    else {
        res.send({ result: "Please fill all details" });
    }

})

app.post("/add-product",verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.post("/add-seller",verifyToken, async (req, res) => {
    let seller = new Seller(req.body);
    let result = await seller.save();
    res.send(result);
});

app.get("/products/:id",verifyToken, async (req, res) => {
    let products = await Product.find({
        "$or": [
            { userId: { $regex: req.params.id } }
            
        ]
    });
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "no product found" });
    }
})

app.get("/sellers/:id",verifyToken, async (req, res) => {
    let sellers = await Seller.find({
        "$or": [
            { userId: { $regex: req.params.id } }
            
        ]
    });
    if (sellers.length > 0) {
        res.send(sellers);
    }
    else {
        res.send({ result: "no seller found" });
    }
})

app.delete("/product/:id",verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.delete("/seller/:id",verifyToken, async (req, res) => {
    const result = await Seller.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get("/product/:id",verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "No Record Found" });
    }
})

app.get("/seller/:id",verifyToken, async (req, res) => {
    let result = await Seller.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "No Record Found" });
    }
})
app.get("/user/:id",verifyToken, async (req, res) => {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "No Record Found" });
    }
})

app.put("/product/:id",verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.put("/seller/:id",verifyToken, async (req, res) => {
    let result = await Seller.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})
app.put("/user/:id",verifyToken, async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

app.get("/search2/:key", verifyToken, async (req, res) => {
    let result = await Seller.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];

        jwt.verify(token, jwtKey,(err, valid)=>{
            if(err){
                res.send({result:"Please add valid token "});
            }
            else{
                next();
            }
        });
    }
    else{
        res.send({result:"Please add token with header"});
    }
   
}

const PORT=process.env.PORT ;
app.listen(PORT, () => {
    console.log("app is listening on PORT");
});
