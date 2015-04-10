var Thug = require("thug")
var redis = require("redis")

var filters     = require("./filters")
var validations = require("./validations")

module.exports = function(config){
  config = config || {}

  client = config.hasOwnProperty["set"]
    ? config
    : redis.createClient(config)

  var store = new Thug({
    locals: {
      namespace: "exhale:",
      client: client
    },
    filters: {
      in : [filters.uuid]
    },
    validations: {
      "payload": [validations.exist],
      "type": [validations.exist]
    }
  })

  store.constructor.prototype.write = function(identifier, record, callback){
    var expire = record.expire || 60 * 60 * 24 * 7
    delete record.expire
    var multi = this.locals.client.multi()
    var key = this.locals.namespace + record.uuid
    multi.set(key, JSON.stringify(record))
    multi.expire(key, expire)
    multi.exec(function(err, replies){
      callback(record)
    })
  }

  store.constructor.prototype.read = function(identifier, callback){
    var key = this.locals.namespace + identifier
    this.locals.client.get(key, function(err, reply){
      callback(JSON.parse(reply || null))
    })
  }

  store.constructor.prototype.remove = function(identifier, record, callback){
    var key = this.locals.namespace + identifier
    this.locals.client.del(key, function(err){
      if (err) return callback(err)
      return callback(null)
    })
  }

  return store

}