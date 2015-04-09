var exhale = require("../")()
var should = require("should")

describe("basic", function(){

  it("should exist", function(done){
    should.exist(exhale)
    done()
  })

  it("should have Create Read Delete methods", function(done){
    exhale.should.have.property("get")
    exhale.should.have.property("set")
    exhale.should.have.property("del")
    done()
  })

  it("should error without payload", function(done){
    exhale.set({}, function(errors, token){
      should.not.exist(token)
      should.exist(errors)
      errors.should.have.property("details")
      errors.should.have.property("messages")
      errors.messages.should.have.lengthOf(1)
      errors.details.should.have.property("payload", "must be present")
      done()
    })
  })

  var id;
  it("should set token", function(done){
    exhale.set({ type: "password_reset", payload: {} }, function(errors, token){
      should.not.exist(errors)
      should.exist(token)
      token.should.have.property("id")
      token.should.have.property("type", "password_reset")
      token.should.have.property("payload")
      id = token.id
      done()
    })
  })

  it("should get token", function(done){
    exhale.get(id, function(token){
      should.exist(token)
      token.should.have.property("id", id)
      token.should.have.property("type", "password_reset")
      token.should.not.have.property("expire")
      done()
    })
  })

  it("should remove token", function(done){
    exhale.del(id, function(errors){
      exhale.get(id, function(token){
        should.not.exist(token)
        done()
      })
    })
  })

})