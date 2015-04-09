var Thug = require("thug")
var redis = require("redis")

var filters     = require("./filters")
var validations = require("./validations")

module.exports = function(config){
  var client = redis.createClient()

  var store = new Thug({
    filters: { in : [filters.id] }
  })

  store.constructor.prototype.write = function(identifier, record, callback){
    client.set(record.id, JSON.stringify(record), function(err, reply){
      callback(record)
    })
  }

  store.constructor.prototype.read = function(identifier, callback){
    client.get(identifier, function(err, reply){
      callback(JSON.parse(reply))
    })
  }

  return store

}