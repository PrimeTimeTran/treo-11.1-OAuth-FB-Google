const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const User = require("../models/User");
passport.use(
  new FacebookTokenStrategy(
    {
      fbGraphVersion: "v9.0",
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
    },
    function (_, _, profile, done) {
      console.log("Hi Treo, Loi Sucks sometimes", profile);
      User.findOrCreate(
        {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatarUrl: profile.photos[0].value,
        },
        function (error, user) {
          return done(error, user);
        },
      );
    },
  ),
);
