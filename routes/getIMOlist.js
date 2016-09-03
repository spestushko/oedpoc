var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var htmlToJson = require('html-to-json');
var router = express.Router();

/* GET imo listing. */
// .
router.get('/imo', function (req, res) {
  console.log('[getIMOlist.js] - (router.get:/imo) - Route call started');

  // NOTE: When using the URL concatenate the page number as well
  // 0 - is the start page
  var url = 'http://www.vesseltracker.com/en/VesselArchive/All/Oil_and_chemical_tanker.html?tablePage=';
  var pageNum = 0;
  var resArrayPager;
  var resArray;

  request(url+pageNum, function(error, response, html){
    if (!error){
      //console.log(html);
      //console.log(response);
      var $ = cheerio.load(html);
      var resStr = '';
      console.log($);
      var promise = htmlToJson.parse(html, {
        'text': function ($doc) {
          resStr = $doc.find('.table_values').text();
          resStr = resStr.replace('\\n', '');
          resStr = resStr.replace('\\t', '');
          var formatStr = '';
          var imoLen = 0;
          var nextImo = true;
          var tempShipName = '';
          var resShipArray;
          var tempImoNum = '';
          var resArray;
          var nameArray;
          var foundDelim = true;
          var resObj = [];
          for (var i = 0; i < resStr.length; ++i){
            if (parseInt(resStr.charAt(i)) >= 0 && parseInt(resStr.charAt(i)) <= 9 && nextImo){
              formatStr += resStr.charAt(i);
              imoLen++;
            }

            if ((resStr.charCodeAt(i) >= 65 && resStr.charCodeAt(i) <= 90) ||
                 resStr.charCodeAt(i) >= 97 && resStr.charCodeAt(i) <= 122){
                nextImo = true;
                if (foundDelim == true)
                  tempShipName += resStr.charAt(i);
            }

            if (resStr.charAt(i) == '>'){
              tempShipName += ' ';
              foundDelim = false;
            }

            if (imoLen == 7){
              formatStr += ' ';
              imoLen = 0;
              nextImo = false;
              foundDelim = true;
            }
          }
          // At this point res string becmes a res array
          resArray = formatStr.split(" ");
          resShipArray = tempShipName.split(" ");

          console.log(formatStr);
          console.log(tempShipName);

          res.send({state:'SUCCESS', dataArray:resArray, dataShipArray:resShipArray});
          return resArray;
        }
      }, function (err, result) {
      console.log(result.length);
      //res = result.text();
      //console.log(res);
      for (var i = 0; result.length; ++i){
        console.log(result[i]);
      }
      });
    }
  });
});

/* POST */
router.post('/newCard', function (req, res) {

});

// Exporting router
module.exports = router;
