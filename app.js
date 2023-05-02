const express = require("express");
const cors = require("cors")
const route = require("./app/routes")
const ApiError = require("./app/api-error");

const app = express();
app.use(cors());
app.use(express.json());

// Route
route(app)

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal server Error",
    });
});

module.exports = app;
