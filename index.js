const express = require("express");
const app = express();
const port = 5000;
//const bodyParser = require("body-parser"); // client에서 받은 데이터를 서버로 처리하여 보내는 역할
const { User } = require("./models/User");

const config = require("./config/key");

//application/x-www-form-urlendcoded 형식인 data를 가져오기 위함
app.use(express.urlencoded({ extended: true }));
//application/json 형식인 data를 가져오기 위함
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! Nice to meet you.");
});

app.post("/register", async (req, res) => {
  //회원 가입 시 필요한 정보들을 client에서 가져오면
  //그것들을 DB에 넣어준다

  const user = new User(req.body);

  try {
    await user.save();
    res.status(200).send("회원 가입 완료");
  } catch (err) {
    console.log(err);
    res.status(500).send("회원 가입 실패");
  }
  // 정보들이 user 모델에 저장하게하는 mongoose 내장 함수
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
