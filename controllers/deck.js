/**
 * co the tuong tac voi mongo voi 3 cach
 * 1: callback
 * 2: promises
 * 3: async/await(promises)
 */
const User = require("../models/User");
const Deck = require("../models/Deck");
const { findByIdAndUpdate } = require("../models/User");

const getAll = async (req, res, next) => {
  const decks = await Deck.find({});
  return res.status(200).json({ decks });
};

const insertDeck = async (req, res, next) => {
    // tim user de them
    const owner = await User.findById(req.value.body.owner)
    // lay du lieu gui len
    const deck = req.value.body
    // xoa cai deck owner hien co
    // delete deck.owner
    // truyen deck owner vua gui len ne
    deck.owner = owner._id
    // tao deck moi
    const newDeck = new Deck(deck)
    await newDeck.save()
    // console.log('owner', deck);
    // cap nhat deck vao mang deck cua user
    owner.desk.push(newDeck._id)
    await owner.save()
    return res.status(200).json({deck: newDeck})
}

const getDeck = async (req, res, next) => {
  const deck = await Deck.findById(req.params.deckID);
  return res.status(200).json({deck})
}

const replaceDeck = async (req, res, next) => {
  const {deckID} = await req.value.params;
  const deckReplace = req.value.body;
  const updateDeck = await  Deck.findByIdAndUpdate(deckID, deckReplace);
  return res.status(201).json({success: true})
  console.log(deckID);
}

const updateDeck = async (req, res, next) => {
  const {deckID} = req.value.params
  const deckupdate = req.value.body

  //neu thay doi owner thi vao deck cua user xoa thg do di
  if(req.value.body.owner)
  {
    const deck = await Deck.findById(deckID)
    const ownerID = deck.owner
    // lay owner
    const ownerold = await User.findById(ownerID)

    ownerold.desk.pull(deck)
    await ownerold.save()

    const ownernew = await User.findById(deckupdate.owner)
    ownernew.desk.push(deck._id)
    await ownernew.save()
    console.log(ownernew.desk);
  }
  else
  {
    const updateDeck = await Deck.findByIdAndUpdate(deckID, deckupdate)
  }
  return res.status(201).json({success: true})
}

const deleteDeck = async (req, res, next) => {
  const {deckID} = req.value.params
  // lay deck tim dc
  const deck = await Deck.findById(deckID)
  const ownerID = deck.owner
  // lay owner
  const owner = await User.findById(ownerID)
  // xoa deck
  await deck.remove()
  // xoa deck  trong owner deck list
  owner.desk.pull(deck)
  await owner.save()
  return res.status(200).json({success: true})
}



module.exports = {
  getAll,
  insertDeck,
  getDeck,
  replaceDeck,
  updateDeck,
  deleteDeck
};
