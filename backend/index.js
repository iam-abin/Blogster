require("dotenv").config();
require("express-async-errors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const logger = require("morgan");

const keys = require("./config/keys");
const { errorHandler } = require("./middlewares/errorHandler");
const { connectDB } = require("./config/db/db.connection");
const { FRONTEND_URL } = require("./utils/constants");

// To available content of these file globally
require("./models/User");
require("./models/Blog");
require("./utils/passport");
require("./utils/cache");

const app = express();

app.use(logger("dev"));
// Middlewares
app.use(
    cors({
        origin: FRONTEND_URL,
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

// connecting to mongodb database
connectDB();

require("./routes/authRoutes")(app);
require("./routes/blogRoutes")(app)
require("./routes/uploadRoutes")(app);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("frontend/build"));

//     const path = require("path");

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve("frontend", "build", "index.html"));
//     });
// }

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
