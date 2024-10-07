const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
    // console.log("Serializing user:", user.id); // Debug
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        // console.log("Deserializing user:", user); // Debug
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "http://localhost:5000/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log("PROFILE ", profile);
            try {
                const existingUser = await User.findOne({
                    googleId: profile.id,
                });
                if (existingUser) {
                    return done(null, existingUser);
                }
                const user = new User({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    profileImage: profile.photos[0].value,
                });
                await user.save();

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);
