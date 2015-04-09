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

  it("should require type", function(done){
    exhale.set({ type: "password_reset" }, function(errors, token){
      should.not.exist(errors)
      should.exist(token)
      token.should.have.property("id")
      token.should.have.property("type")
      done()
    })
  })

})