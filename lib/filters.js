var uuid = require("node-uuid")

exports.id = function(obj, next){
  obj.id = uuid.v4()
  next(obj)
}