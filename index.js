const express = require("express");
require('dotenv').config();
var bodyParser = require('body-parser') // dùng để gửi API từ FE lên BE 
var flash = require('express-flash'); //dùng để in ra câu thông báo
var cookieParser = require('cookie-parser') //nhung theo thang flash
var session = require('express-session') //nhúng theo thang flash
var methodOverride = require('method-override') // dùng để cho thẻ form có các phương thức khác ngoài phương thức (GET, POST)
const path = require('path');


const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");
const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method')) // dùng để cho thẻ form có các phương thức khác ngoài phương thức (GET, POST)

// //////////////////////
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/your-database' }) // sử dụng MongoDB để lưu trữ session
// }));
// /////////////////////


app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce'))); // tinymce là công cụ soạn thảo văn bản

// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }})); //dùng để thời gian hiển thị cái flash (thông báo)
app.use(flash());
// END Flash

// parse application/json
app.use(bodyParser.json()) // liên kết giữa BE và FE (nếu ông FE gửi data lên ở dạng js)
app.use(bodyParser.urlencoded({ extended: false }))  // liên kết giữa BE và FE (nếu ông FE gửi data lên ở dạng form)


app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));
// App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin; // chi dung` cho file pug

routeClient.index(app);
routeAdmin.index(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});