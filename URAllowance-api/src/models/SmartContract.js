
import mongoose from 'mongoose'

/*
SmartContract Schema
*/

const SmartContractSchema = mongoose.Schema = {

  name: { type: String, required: true, unique: true },
  desription: { type: String, required: true },
  assign_to: { type: String },
  reward: { type: Number },
  creationdate: { type: Date },
  expirydate: { type: Date },
  status: { type: String },
  approved: { type: String }
}

module.exports = mongoose.model('SmartContract', SmartContractSchema)
