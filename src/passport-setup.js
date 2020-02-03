const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const User = require("./models/User");

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(e => {
            done(new Error("Failed to deserialize the user"));
        });
});

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "/auth/facebook/callback",
            profileFields: ["id", "email", "name"]
        },
        async (accessToken, refreshToken, profile, done) => {
            const currentUser = await User.findOne({ facebookId: profile.id });
            if (!currentUser) {
                const newUser = await new User({
                    name: profile.name.givenName,
                    email: profile.emails[0].value,
                    facebookId: profile.id
                }).save();
                if (newUser) {
                    done(null, newUser);
                }
            }
            done(null, currentUser);
        }
    )
);
