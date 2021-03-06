const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');
const contactRoutes = require('./api/routes/contact');
const categoryRoutes = require('./api/routes/category');
const faqRoutes = require('./api/routes/faq');
const bookfreeRoutes = require('./api/routes/bookfree');
const shopProfileRoutes = require('./api/routes/shopProfile');

mongoose.connect(
  "mongodb://node-bookshop:" +
    "Cocoopark143" +
    "@node-bookshop-shard-00-00-9iimh.mongodb.net:27017,node-bookshop-shard-00-01-9iimh.mongodb.net:27017,node-bookshop-shard-00-02-9iimh.mongodb.net:27017/test?ssl=true&replicaSet=node-bookshop-shard-0&authSource=admin&retryWrites=true",
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/contacts", contactRoutes);
app.use("/categorys", categoryRoutes);
app.use("/faqs", faqRoutes);
app.use("/bookfrees", bookfreeRoutes);
app.use("/shopProfile", shopProfileRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
