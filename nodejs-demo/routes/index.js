var express = require('express');
var router = express.Router();
var XLSX= require('xlsx');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});
router.route('/login')
    .get(function(req, res) {
        res.render('login', { title: '用户登录' });
    })
    .post(function(req, res) {
        var user={
          username: 'admin',
          password: '123456'
        }
        if(req.body.username === user.username && req.body.password === user.password){
          res.redirect('/home');
        }
        res.redirect('/login');
    });
// interview-mobile  登录接口测试
router.route('/api/user/login')
    .get(function(req, res) {
        res.json({ token: "get-kdjskdjfj" })
    })
    .post(function(req, res) {
        var user={
          username: 'admin',
          password: '123456'
        }
        res.json({ token: "post-kdjskdjfj" })
    });

router.get('/logout', function(req, res) {
  res.redirect('/');
});
router.get('/home', function(req, res) {
  var user={
    username:'admin',
    password:'123456'
  }
  res.render('home', { title: 'Home', user: user });
});
router.get('/file', function (req, res) {
  res.render('file', { title: 'Express' });
});
router.post('/file_upload', function (req, res) {
  console.log(req.files[0]);  // 上传的文件信息
  var des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      }else{
        response = {
          message:'File uploaded successfully',
          filename:req.files[0].originalname
        };
      }
      console.log( response );
      res.end( JSON.stringify( response ) );
    });
  });
});

// 表单提交
router.get('/index1.html', function (req, res) {
  res.render('index1', { title: 'Express' });
});
//node.js 解析excel表格
let excelData = [];
let paramsArr = [];
// let nowTime = parseInt(moment().format('X'));
// let username = res.locals.username;
// let excelFile = req.files.file.data;
// cellDates = true 可读取日期，false则会将日期格式化
const workbook = XLSX.readFile('./public/excel/excel-test.xlsx', { type: 'string', cellDates: true });
// const workbook = XLSX.read(excelFile);
const sheetNames = workbook.SheetNames;
const sheet2JSONOpts = {
    /** Default value for null/undefined values */
    defval: ''//给defval赋值为空的字符串
}
for (var sheet in workbook.Sheets) {
  if (workbook.Sheets.hasOwnProperty(sheet)) {
    // fromTo = workbook.Sheets[sheet]['!ref'];
    //   console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
      //解析excel文件得到数据
    excelData = excelData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], sheet2JSONOpts));
      console.log('excelData', excelData);
  }
}
// let sheetsData = Collect(excelData).map(item => {
//   return {
//     a        : item['SN'],
//     d: item['x'x'x'],
//   b       : item['PN'],
//       c  : item['xxx'],
//       e : item['xxx'],
//       g : '',
//       Ctime : nowTime,
//       Uptime : nowTime,
//       u : username
// }
// }).all();

// app.use(FileUpload());
router.get('/process_get', function (req, res) {
  // console.log(JSON.stringify(user));
  res.json({ user: excelData })
  // res.end(JSON.stringify(response));
});

router.get('/arry', function (req, res) {
  // console.log(JSON.stringify(user));
  res.json(['hmk', 'zhangsan', 'lisi'])
  // res.end(JSON.stringify(response));
});
router.get('/mobileLogin', function (req, res) {
  // console.log(JSON.stringify(user));
  res.json(['hmk', 'zhangsan'])
  // res.end(JSON.stringify(response));
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
// express.get('/ab*cd', function(req, res) {
//   console.log("/ab*cd GET 请求");
//   res.send('正则匹配');
// })

module.exports = router;
