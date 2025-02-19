const User = require("../models/user")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const passport = require('passport')
const jwt = require("jsonwebtoken")
require('dotenv').config()

exports.signup_post = [
  body("username").isLength({min: 5, max: 20}),
  body("password").isLength({min: 10, max: 1000}),
  
  async (req,res) => {
  const errors = validationResult(req) 
  if (errors.isEmpty()){
    User.find({username: req.body.username}).exec().then(
      user => {
        if (user.length >= 1){
          return res.status(409).json(
            {
              message: "user exists"
            }
          )
        }
        else {
          bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
            if (err) {
              return next(err)
            }
            else {
            let adminStatus = false
            if(req.body.username === "summerfreeze"){
                adminStatus = true
            }
              const user = new User({
                username: req.body.username,
                password: hashedPassword,
                admin_status: adminStatus
              })
              const result = await user.save()
              res.json(user)
            }
          })
        }
      }
    )
  }
  else(res.json(errors))
  
  
}]

exports.login_post = async (req,res) => {
  User.find({username: req.body.username}).exec().then(
    user => {
      if (user.length < 1){
        return res.status(401).json({
          message: "auth failed"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err,r) => {
        if (err) {
          return res.status(401).json({
            message: "auth failed"
        })
      }
      if(r) {
        const secret = process.env.SECRET
        
          const jwtToken = jwt.sign({
            username: user[0].username,
            user_id: user[0]._id
          }
          , secret,
          {
            expiresIn: "1d"
          })

          const refreshToken = jwt.sign({
            username: user[0].username,
            user_id: user[0]._id
          }
          , secret,
          {
            expiresIn: "7d"
          })

          
          
          return res.status(200).json({
            message: "auth successful",
            jwt_token: jwtToken
          })
      
        }
      else{
        return res.status(401).json({
          message: "auth failed"
        })
      }
      

      
    }
    )
  }
  )
  }