let mock = require('mockjs')
mock.mock(" http://localhost:8081/QAmanager", {
        "code": 200,
        "msg": "q请求接口成功",
        "data": [{
            "id": 1,
            "word": "apple"
        }]

    })
    //