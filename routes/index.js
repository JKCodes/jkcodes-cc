var express = require('express');
var router = express.Router();
var sha = require('sha.js');
var HashController = require('../controllers/HashController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/messages/:hash', function(req, res, next) {

  console.log(req.params.hash)

  HashController.find({hash: req.params.hash}, (err, results) => {
    if (err) {
      res.json({
        message: 'A server related error has occurred.  Please try again.'
      })

      return
    } 

    if (results.length === 0) {
      res.status(404).send({status: '404', err_msg: "Message not found. Check nodemon output for the '404' routing"})

      return
    }



    res.json({
      message: results[0].word
    })
  })
});

router.post('/messages', function(req, res, next) {

  const digest = sha('sha256').update(req.body.message).digest('hex');

  HashController.find({word: req.body.message}, (err, results) => {
    if (err) {
      res.json({
        message: 'A server related error has occurred.  Please try again.'
      })

      return
    } 

    if (results.length !== 0) {
      res.json({
        digest: results[0].hash
      })

      return
    }

    HashController.create({word: req.body.message, hash: digest}, (err, result) => {
      if (err) {
        res.json({
          message: 'A server related error has occurred. Please try again.'
        })

        return
      }

      res.json({
        digest: result.hash
      })
    })
  })
});


module.exports = router;
