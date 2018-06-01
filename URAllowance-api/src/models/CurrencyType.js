import mongoose from 'mongoose'

/*
CurrencyType Schema
*/
const CurrnencySchema = mongoose.Schema = {
  name: String,
  symbol: String
}

module.exports = mongoose.model('Currency', CurrnencySchema)
