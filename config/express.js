const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/db-connection");

module.exports = function (app) {
  app.use(express.json());

  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  dbConnection();
};

// methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//       allowedHeaders: ["Authorization", "Content-Type"],
