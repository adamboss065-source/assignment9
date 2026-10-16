export async function findonedoc({ model, filter = {}, projection = {} } = {}) {
  return await model.findOne(filter, projection);
}
export async function findonebyid({ model, id, projection = {} } = {}) {
  return await model.findById(id, projection);
}

export async function createdoc({ model, inserteddata, options } = {}) {
  return await model.create(inserteddata, options);
}
