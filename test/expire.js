var exhale = require("../")()
var should = require("should")

describe("expires", function(){

  var id;
  it("should set token", function(done){
    exhale.set({ type: "password_reset", expire: 2 }, function(errors, token){
      should.not.exist(errors)
      should.exist(token)
      token.should.have.property("id")
      token.should.have.property("type", "password_reset")
      id = token.id
      done()
    })
  })

  it("should get token", function(done){
    exhale.get(id, function(token){
      should.exist(token)
      token.should.have.property("id", id)
      token.should.have.property("type", "password_reset")
      done()
    })
  })

  it("should get token", function(done){
    exhale.get(id, function(token){
      should.exist(token)
      token.should.have.property("id", id)
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
    }, 3000)
  })

})