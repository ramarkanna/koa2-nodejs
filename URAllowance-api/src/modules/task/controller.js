const Task = require('models/Task')

exports.getTasks = async (ctx, next) => {
	const tasks = await Task.find({})
	if (!tasks) {
		ctx.throw("There was an error retrieving your tasks.")
	} else {
		ctx.state.tasks = tasks
		return next()
	}
}

exports.getTask = async (ctx, next) => {

 try {
    const task = await Task.findById(ctx.params.id)
    if (!task) {
      ctx.throw(404)
    }

    ctx.state.task = task
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }

  return next()

}

exports.createTask = async (ctx, next) => {
	const result = await Task.create({
		name: ctx.request.body.name,
		urgency: ctx.request.body.urgency
	})
	if (!result) {
		ctx.throw('Task failed to create.')
	} else {
		ctx.body = {message: 'Task created!', data: result}
	}
}

exports.updateTask = async (ctx, next) => {
	const searchByName = {name: ctx.request.body.name}
	const update = {name: ctx.request.body.newName, urgency: ctx.request.body.newUrgency}
	const result = await Task.findOneAndUpdate(searchByName, update)
	if (!result) {
		ctx.throw('Task failed to update.')
	} else {
		console.log(result)
	    const task = await Task.findById(result.id)
		ctx.body = {message: 'Task updated!', data: task}
	}
}

exports.deleteTask = async (ctx, next) => {
	    const task = await Task.findById(ctx.params.id)
	    if(task ) { await task.remove() }
	if (!task) {
		ctx.throw('Task failed to delete.')
	} else {
		ctx.status = 200
		ctx.body = {message: 'success!'}
	}
}

exports.createConcurrentTasks = async (ctx) => {
	const taskOne = Task.create({
		name: ctx.request.body.nameTaskOne,
		urgency: ctx.request.body.urgencyTaskOne
	})
	const taskTwo = Task.create({
		name: ctx.request.body.nameTaskTwo,
		urgency: ctx.request.body.urgencyTaskTwo
	})
	const [t1, t2] = await Promise.all([taskOne, taskTwo])
	if (!t1 || !t2) {
		ctx.throw('Tasks failed to be created.')
	} else {
		ctx.body = {message: 'Tasks created!', taskOne: t1, taskTwo: t2}
	}
}

exports.deleteConcurrentTasks = async (ctx) => {
	const taskOne = Task.findOneAndRemove({name: ctx.request.body.nameTaskOne})
	const taskTwo = Task.findOneAndRemove({name: ctx.request.body.nameTaskTwo})
	const [t1, t2] = await Promise.all([taskOne, taskTwo])
	if (!t1 || !t2) {
		ctx.throw('Tasks failed to delete.')
	} else {
		ctx.body = {message: 'Tasks deleted successfully!'}
	}
}