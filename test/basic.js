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



})