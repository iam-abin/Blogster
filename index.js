require("dotenv").config();
require("express-async-errors");
const express = require("express");
// const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const logger = require("morgan");

const keys = require("./config/keys");
const { errorHandler } = require("./middlewares/errorHandler");
const { connectDB } = require("./config/db/db.connection");

// To available content of these file globally
require("./models/User");
require("./models/Blog");
require("./services/passport");
require("./services/cache");

// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI);

const app = express();

app.use(logger("dev"));
// Middlewares
app.use(
    cors({
        origin: "http://localhost:4000", // Your frontend URL
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secret: keys.cookieKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    // console.log("Session Cookie:", req.session); // Debug
    // console.log("User:", req.user); // Debug
    next();
});
// connecting to mongodb database
connectDB();

require("./routes/authRoutes")(app);
require("./routes/blogRoutes")(app);
require("./routes/uploadRoutes")(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"));
    });
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
