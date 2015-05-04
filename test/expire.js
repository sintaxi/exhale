var exhale = require("../")()
var should = require("should")

describe("expires", function(){

  var id;
  it("should set token", function(done){
    exhale.set({ type: "password_reset", expire: 1, payload: {} }, function(errors, token){
      should.not.exist(errors)
      should.exist(token)
      token.should.have.property("uuid")
      token.should.have.property("type", "password_reset")
      id = token.uuid
      done()
    })
  })

  it("should get token", function(done){
    exhale.get(id, function(token){
      should.exist(token)
      token.should.have.property("uuid", id)
      token.should.have.property("type", "password_reset")
      token.should.not.have.property("expire")
      done()
    })
  })

  it("should get token", function(done){
    exhale.get(id, function(token){
      should.exist(token)
      token.should.have.property("uuid", id)
      token.should.have.property("type", "password_reset")
      done()
    })
  })

  it("should expire", function(done){
    setTimeout(function(){
      exhale.get(id, function(token){
        should.not.exist(token)
        done()
      })
    }, 1100)
  })

})