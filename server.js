var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  let fileProperties = req.file;
  if (fileProperties != undefined) {
    res.json({
      name: fileProperties.originalname,
      type: fileProperties.mimetype,
      size: fileProperties.size
    });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
