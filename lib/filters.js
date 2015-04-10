var uuid = require("node-uuid")

exports.uuid = function(obj, next){
  obj.uuid = uuid.v4()
  next(obj)
}