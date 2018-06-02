const SmartContract = require('models/SmartContract')

exports.getSmartContracts = async (ctx, next) => {
  const smartcontract = await SmartContract.find({})
  if (!smartcontract) {
    ctx.throw('There was an error retrieving your smartcontract tasks.')
  } else {
    ctx.state.smartcontract = smartcontract
    return next()
  }
}

exports.getSmartContract = async (ctx, next) => {
  try {
    const smartcontract = await SmartContract.findById(ctx.params.id)
    if (!smartcontract) {
      ctx.throw(404)
    }

    ctx.state.smartcontract = smartcontract
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }

  return next()
}

exports.createSmartContract = async (ctx, next) => {
  const result = await SmartContract.create({
    name: ctx.request.body.name,
    desription: ctx.request.body.desription,
    assign_to: ctx.request.body.assign_to,
    reward: ctx.request.body.reward,
    creationdate: ctx.request.body.creationdate,
    expirydate: ctx.request.body.expirydate,
    status: ctx.request.body.status,
    approved: ctx.request.body.approved

  })
  if (!result) {
    ctx.throw('Smartcontract task failed to create.')
  } else {
    ctx.body = {message: 'Smartcontract task created!', data: result}
  }
}

exports.updateSmartContract = async (ctx, next) => {
  const searchByName = {name: ctx.request.body.name}
  const update = {name: ctx.request.body.newName, desription: ctx.request.body.newDesription, assign_to: ctx.request.body.newAssign_to, reward: ctx.request.body.newReward, creationdate: ctx.request.body.newCreationdate, expirydate: ctx.request.body.newExpirydate, status: ctx.request.body.newStatus, approved: ctx.request.body.newApproved}
  const result = await SmartContract.findOneAndUpdate(searchByName, update)
  if (!result) {
    ctx.throw('smartcontract task failed to update.')
  } else {
    console.log(result)
    const smartcontract = await SmartContract.findById(result.id)
    ctx.body = {message: 'Smartcontract task updated!', data: smartcontract}
  }
}

exports.deleteSmartContract = async (ctx, next) => {
  const smartcontract = await SmartContract.findById(ctx.params.id)
  if (smartcontract) { await smartcontract.remove() }
  if (!smartcontract) {
    ctx.throw('Smartcontract task failed to delete.')
  } else {
    ctx.status = 200
    ctx.body = {message: 'success!'}
  }
}

exports.createConcurrenSmartContracts = async (ctx) => {
  const smartcontractOne = SmartContract.create({
    name: ctx.request.body.nameSmartContractOne,
    desription: ctx.request.body.desriptionSmartContractOne,
    assign_to: ctx.request.body.assign_toSmartContractOne,
    reward: ctx.request.body.rewardSmartContractOne,
    creationdate: ctx.request.body.creationdateSmartContractOne,
    expirydate: ctx.request.body.expirydateSmartContractOne,
    status: ctx.request.body.statusSmartContractOne,
    approved: ctx.request.body.approvedSmartContractOne

  })
  const smartcontractTwo = SmartContract.create({
    name: ctx.request.body.nameSmartContractTwo,
    desription: ctx.request.body.desriptionSmartContractTwo,
    assign_to: ctx.request.body.assign_toSmartContractTwo,
    reward: ctx.request.body.rewardSmartContractTwo,
    creationdate: ctx.request.body.creationdateSmartContractTwo,
    expirydate: ctx.request.body.expirydateSmartContractTwo,
    status: ctx.request.body.statusSmartContractTwo,
    approved: ctx.request.body.approvedSmartContractTwo
  })
  const [t1, t2] = await Promise.all([smartcontractOne, smartcontractTwo])
  if (!t1 || !t2) {
    ctx.throw('Smartcontract tasks failed to be created.')
  } else {
    ctx.body = {message: 'Smartcontract tasks created!', smartcontractOne: t1, smartcontractTwo: t2}
  }
}

exports.deleteConcurrentSmartContracts = async (ctx) => {
  const smartcontractOne = SmartContract.findOneAndRemove({name: ctx.request.body.nameSmartcontractOne})
  const smartcontractTwo = SmartContract.findOneAndRemove({name: ctx.request.body.nameSmartcontractTwo})
  const [t1, t2] = await Promise.all([smartcontractOne, smartcontractTwo])
  if (!t1 || !t2) {
    ctx.throw('Smartcontract tasks failed to delete.')
  } else {
    ctx.body = {message: 'Smartcontract tasks deleted successfully!'}
  }
}
