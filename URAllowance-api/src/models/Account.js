import mongoose from 'mongoose'
import CurrencyType from 'models/CurrencyType'

/*
Account Schema
*/
const AccountSchema = mongoose.Schema = {
  userid: { type: String },
  acc_number: { type: String, required: true },
  curr_balance: { type: Number },
  lock: { type: Boolean, required: true, default: false },
  currencyType: [ CurrencyType ]
}

module.exports = mongoose.model('Account', AccountSchema)
