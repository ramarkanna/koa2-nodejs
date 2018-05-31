//const mongoose = require('mongoose')

import mongoose from 'mongoose'
//import bcrypt from 'bcrypt'
//import jwt from 'jsonwebtoken'
import config from 'config'

/*
	Task Schema
*/
const TaskSchema = mongoose.Schema = {
	name: String,
	urgency: String
}

module.exports = mongoose.model("Task", TaskSchema)