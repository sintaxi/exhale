var Thug = require("thug")
var redis = require("redis")

var filters     = require("./filters")
var validations = require("./validations")

module.exports = function(config){
  config = config || {}

  // take redis client or create one.
  if (config.hasOwnProperty.set) client = config

  var client = redis.createClient(config)

  var store = new Thug({
    filters: { in : [filters.id] },
    validations: {
      "payload": [validations.exist],
      "type": [validations.exist]
    }
  })

  store.constructor.prototype.write = function(identifier, record, callback){
    var expire = record.expire || 60 * 60 * 24 * 7
    delete record.expire
    var multi = client.multi()
    multi.set(record.id, JSON.stringify(record))
    multi.expire(record.id, expire)
    multi.exec(function(err, replies){
      callback(record)
    })
  }

  store.constructor.prototype.read = function(identifier, callback){
    client.get(identifier, function(err, reply){
      callback(JSON.parse(reply || null))
    })
  }

  store.constructor.prototype.remove = function(identifier, record, callback){
    client.del(identifier, function(err){
      if (err) return callback(err)
      return callback(null)
    })
  }

  return store

}