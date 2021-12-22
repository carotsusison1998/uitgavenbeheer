/**
 * co the tuong tac voi mongo voi 3 cach
 * 1: callback
 * 2: promises
 * 3: async/await(promises)
 */
const User = require("../models/User");
const Deck = require("../models/Deck");
// const joi = require('joi')
// const idSchema = joi.object().keys({
//     userID: joi.string().regex(/^[0-9a-fA-F]{24}$/).required() //yeu cau nhap

// })

// const getAll = (req, res, next) => {
//     //  cach 1: callback
//     // User.find({}, (err, user) => {
//     //     if(err) next(err)
//     //     else
//     //         return res.status(200).json({user})
//     // })

//     // promises
//     // User.find({}).then((user)=>{
//     //     return res.status(200).json({user})
//     // }).catch((err) => next(err))
// }

const getAll = async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};

// const insertUser = (req, res, next) => {
//     const newUser = new User(req.body)
//     // callback
//     // newUser.save((err, user)=>{
//     //     if(err) next (err)
//     //     else
//     //         console.log(user)
//     // })

//     // promises
//     // newUser.save().then((user)=>{
//     //     return res.status(201).json({user})
//     // }).catch((err) => next(err))

// }

const insertUser = async (req, res, next) => {
  const newUser = new User(req.value.body);
  await newUser.save();
  return res.status(201).json({ newUser });
};

const getOneUser = async (req, res, next) => {
  const { userID } = req.value.params;
  const user = await User.findById(userID);
  return res.status(200).json({ user });
};
const replaceUser = async (req, res, next) => {
  const { userID } = req.value.params;
  const newUser = req.value.body;
  const userUpdate = await User.findByIdAndUpdate(userID, newUser);
  return res.status(200).json({ succes: true });
};
const updateUser = async (req, res, next) => {
  const { userID } = req.value.params;
  const newUser = req.value.body;
  const userUpdate = await User.findByIdAndUpdate(userID, newUser);
  return res.status(200).json({ succes: true });
};

const getUserDesks = async (req, res, next) => {
  const { userID } = req.value.params;
  // get user
  const user = await User.findById(userID).populate("desk");
  // console.log('user', user.desk)
  return res.status(200).json({ deck: user.desk });
};

const newUserDesks = async (req, res, next) => {
  const { userID } = req.value.params;
  // tao deck cho user
  const newDeck = new Deck(req.value.body);
  // lay thong tin user muon tao de tao deck
  const user = await User.findById(userID);
  // noi bang || assign user as a deck`s owner
  newDeck.owner = user;
  // tao deck
  await newDeck.save();
  // update lai user da co deck
  user.desk.push(newDeck);
  // luu lai
  await user.save();
  return res.status(201).json({ desk: newDeck });
};

const signUp = async (req, res, next) => {
  const {firstName, lastName, email, password} = req.value.body
  // check email co chua
  const foundEmail = await User.findOne({ email })
  // console.log(foundEmail)
  if(foundEmail) return res.status(403).json({error: {message: "email is exists! please using email other"}})
  const newUser = await new User({firstName, lastName, email, password})
  // console.log(newUser);
  newUser.save()
  return res.status(201).json({success: true})
}

const signIn = async (req, res, next) => {
  console.log('sign in');

}

const secret = async (req, res, next) => {
  console.log('secret');

}

module.exports = {
  getAll,
  insertUser,
  getOneUser,
  replaceUser,
  updateUser,
  getUserDesks,
  newUserDesks,
  signIn,
  signUp,
  secret
};
