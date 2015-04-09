exports.exist = function(field, obj, errors, next){
  if (!obj.hasOwnProperty(field)) errors.push("must be present")
  next()
}