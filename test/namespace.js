var exhale = require("../")()
var should = require("should")

describe("namespace", function(){

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

  it("should error without payload or type", function(done){
    exhale.with({ namespace: "surge.sh" }).set({}, function(errors, token){
      should.not.exist(token)
      should.exist(errors)
      errors.should.have.property("details")
      errors.should.have.property("messages")
      errors.messages.should.have.lengthOf(2)
      errors.details.should.have.property("payload", "must be present")
      errors.details.should.have.property("type", "must be present")
      done()
    })
  })

  var id;
  it("should set token", function(done){
    exhale.with({ namespace: "surge.sh" }).set({ type: "password_reset", payload: {} }, function(errors, token){
      should.not.exist(errors)
      should.exist(token)
      token.should.have.property("uuid")
      token.should.have.property("type", "password_reset")
      token.should.have.property("payload")
      id = token.uuid
      done()
    })
  })

  it("should get token", function(done){
    exhale.with({ namespace: "surge.sh" }).get(id, function(token){
      should.exist(token)
      token.should.have.property("uuid", id)
      token.should.have.property("type", "password_reset")
      token.should.not.have.property("expire")
      done()
    })
  })

  it("should remove token", function(done){
    exhale.with({ namespace: "surge.sh" }).del(id, function(errors){
      exhale.with({ namespace: "surge.sh" }).get(id, function(token){
        should.not.exist(token)
        done()
      })
    })
  })

})