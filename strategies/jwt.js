const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const User = require("../models/user")
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET
opts.passReqToCallback = true

module.exports = new JwtStrategy(opts, (req,jwt_payload, done) => {
    
    User.findOne({username: jwt_payload.username}).then(
        user => {
            req.user = user
            return done(null,user)
        }
    ).catch((err) => {
        return done(err, false)
    })
    
})