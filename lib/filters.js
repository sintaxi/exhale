
exports.id = function(obj, next){
  obj.id = "my-id"
  next(obj)
}