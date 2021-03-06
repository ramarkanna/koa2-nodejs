const Family = require('models/Family')

exports.getFamilies = async (ctx, next) => {
  const families = await Family.find({})
  if (!families) {
    ctx.throw('There was an error retrieving your Family.')
  } else {
    ctx.state.families = families
    return next()
  }
}

exports.getFamily = async (ctx, next) => {
  try {
    const family = await Family.findById(ctx.params.id)
    if (!family) {
      ctx.throw(404)
    }

    ctx.state.family = family
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }

  return next()
}

exports.createFamily = async (ctx, next) => {
  const result = await Family.create({
    family_name: ctx.request.body.family_name,
    family_pic: ctx.request.body.family_pic,
    family_admin: ctx.request.body.family_admin
  })
  if (!result) {
    ctx.throw('Family failed to create.')
  } else {
    ctx.body = {message: 'Family created!', data: result}
  }
}

export async function updateFamily (ctx) {
  const family = ctx.state.family

  Object.assign(family, ctx.request.body.family)

  await family.save()

  ctx.body = {
    family
  }
}

exports.deleteFamily = async (ctx, next) => {
  const family = await Family.findById(ctx.params.id)
  if (family) { await family.remove() }
  if (!family) {
    ctx.throw('Failed to delete.')
  } else {
    ctx.status = 200
    ctx.body = {message: 'success!'}
  }
}
