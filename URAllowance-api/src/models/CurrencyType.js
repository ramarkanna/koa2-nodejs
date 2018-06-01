import mongoose from 'mongoose'
import config from 'config'

/*
	CurrencyType Schema
*/
const CurrnencySchema = mongoose.Schema = {
	name: String,
	symbol: String
}

module.exports = mongoose.model("Currency", CurrnencySchema)