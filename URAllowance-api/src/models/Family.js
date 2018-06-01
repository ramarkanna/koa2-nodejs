
import mongoose from 'mongoose'

const familySchema = new mongoose.Schema({
  family_name: { type: String, required: true },
  family_pic: { type: String, required: true },
  family_admin: { type: String, required: true }
})
module.exports = mongoose.model('family', familySchema)
