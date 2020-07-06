let mock = require('mockjs')
mock.mock("", {
        "code": 200,
        "msg": "q请求接口成功",
        "data": [{
            "id": 1,
            "word": "apple"
        }]
    })
    //