if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}

// process.env.NODE_ENV는 개발 모드일 때는 "development" , 배포 후에는 "production" 을 반환한다. 
// 따라서 각 모드에 따라 어떤 외부 모듈을 참조할 것인지 결정해주는 것. 