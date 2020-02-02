const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: "510433696275222",
            clientSecret: "2d79251383b78dca8d98b8a78b4063c6",
            callbackURL: "/auth/facebook/callback",
            profileFields: ["id", "email", "name", "displayName"]
        },
        async (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => console.log(profile));
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
