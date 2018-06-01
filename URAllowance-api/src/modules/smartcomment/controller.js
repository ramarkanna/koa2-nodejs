const SmartComment = require('models/SmartComment')

exports.getSmartComments = async (ctx, next) => {
  const smartcomment = await SmartComment.find({})
  if (!smartcomment) {
    ctx.throw('There was an error retrieving your smartcomment tasks.')
  } else {
    ctx.state.smartcomment = smartcomment
    return next()
  }
}

exports.getSmartComment = async (ctx, next) => {
  try {
    const smartcomment = await SmartComment.findById(ctx.params.id)
    if (!smartcomment) {
      ctx.throw(404)
    }

    ctx.state.smartcomment = smartcomment
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }

  return next()
}

exports.createSmartComment = async (ctx, next) => {
  const result = await SmartComment.create({
    taskid: ctx.request.body.taskid,
    comment: ctx.request.body.comment,
    commentedby: ctx.request.body.commentedby,
    commentdate: ctx.request.body.commentdate

  })
  if (!result) {
    ctx.throw('smartcomment task failed to create.')
  } else {
    ctx.body = {message: 'smartcomment task created!', data: result}
  }
}

exports.updateSmartComment = async (ctx, next) => {
  const searchByTaskid = {taskid: ctx.request.body.taskid}
  const update = {taskid: ctx.request.body.newTaskid, comment: ctx.request.body.newComment, commentedby: ctx.request.body.newCommentedby, commentdate: ctx.request.body.newCommentdate}
  const result = await SmartComment.findOneAndUpdate(searchByTaskid, update)
  if (!result) {
    ctx.throw('smartcontract task failed to update.')
  } else {
    console.log(result)
    const smartcomment = await SmartComment.findById(result.id)
    ctx.body = {message: 'smartcomment task updated!', data: smartcomment}
  }
}

exports.deleteSmartComment = async (ctx, next) => {
  const smartcomment = await SmartComment.findById(ctx.params.id)
  if (smartcomment) { await smartcomment.remove() }
  if (!smartcomment) {
    ctx.throw('smartcomment task failed to delete.')
  } else {
    ctx.status = 200
    ctx.body = {message: 'success!'}
  }
}

exports.createConcurrenSmartComments = async (ctx) => {
  const smartcommentOne = SmartComment.create({
    taskid: ctx.request.body.taskidSmartCommentOne,
    comment: ctx.request.body.commentSmartCommentOne,
    commentedby: ctx.request.body.commentedbySmartCommentOne,
    commentdate: ctx.request.body.commentdateSmartCommentOne

  })
  const smartcommentTwo = SmartComment.create({
    taskid: ctx.request.body.taskidSmartCommentTwo,
    comment: ctx.request.body.commentSmartCommentTwo,
    commentedby: ctx.request.body.commentedbySmartCommentTwo,
    commentdate: ctx.request.body.commentdateSmartCommentTwo

  })
  const [t1, t2] = await Promise.all([smartcommentOne, smartcommentTwo])
  if (!t1 || !t2) {
    ctx.throw('smartcomment tasks failed to be created.')
  } else {
    ctx.body = {message: 'smartcomment tasks created!', smartcontractOne: t1, smartcontractTwo: t2}
  }
}

exports.deleteConcurrentSmartComments = async (ctx) => {
  const smartcommentOne = SmartComment.findOneAndRemove({taskid: ctx.request.body.taskidSmartCommenttOne})
  const smartcommentTwo = SmartComment.findOneAndRemove({taskid: ctx.request.body.taskidSmartCommentTwo})
  const [t1, t2] = await Promise.all([smartcommentOne, smartcommentTwo])
  if (!t1 || !t2) {
    ctx.throw('smartcomment tasks failed to delete.')
  } else {
    ctx.body = {message: 'smartcomment tasks deleted successfully!'}
  }
}
