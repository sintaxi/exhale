# exhale

> expiring token system for ephemeral tasks such as email verification and password reset

    var exhale = require("exhale")(redisClientOrConfig)

## basic usage

    var obj = { type: "password_reset", payload: { account: "abc" }}

    exhale.set(obj, function(errors, token){
      console.log(token)
      // returns...
      {
        uuid: "18b65620-ce44-47bc-81b7-c7a96d8e6516",
        type: "password_reset",
        payload: { account: "abc" }
      }
    })

    exhale.get("18b65620-ce44-47bc-81b7-c7a96d8e6516", function(token){
      console.log(token)
      // returns...
      {
        uuid: "18b65620-ce44-47bc-81b7-c7a96d8e6516",
        type: "password_reset",
        payload: { account: "abc" }
      }
    })

    exhale.del("18b65620-ce44-47bc-81b7-c7a96d8e6516", new Function)
