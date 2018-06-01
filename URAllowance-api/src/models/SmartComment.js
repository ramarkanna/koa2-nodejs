
import mongoose from 'mongoose'

/*
SmartComment Schema
*/

const SmartCommentSchema = mongoose.Schema = {

  taskid: { type: String, required: true },
  comment: { type: String },
  commentedby: { type: String, required: true },
  commentdate: { type: Date }
}

module.exports = mongoose.model('SmartComment', SmartCommentSchema)
