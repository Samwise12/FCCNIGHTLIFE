'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _yelpFusion = require('yelp-fusion');

var _yelpFusion2 = _interopRequireDefault(_yelpFusion);

var _Venue = require('../models/Venue');

var _Venue2 = _interopRequireDefault(_Venue);

var _authenticate = require('../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authNoUser = require('../middlewares/authNoUser');

var _authNoUser2 = _interopRequireDefault(_authNoUser);

var _parseErrors = require('../utils/parseErrors');

var _parseErrors2 = _interopRequireDefault(_parseErrors);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// var ObjectId = require('mongodb').ObjectID;


var router = _express2.default.Router();
// router.use(authenticate);

router.post('/', function (req, res) {
  // console.log('req:',req.body)
  // console.log('worked??');
  var locationName = req.body.locationName;

  _yelpFusion2.default.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET).then(function (response) {
    // const accessToken = response.jsonBody.access_token;
    // console.log(accessToken);
    var client = _yelpFusion2.default.client(response.jsonBody.access_token);
    // console.log(client)
    if (locationName === '') {
      res.status(404).json({ no: 'no!' });
    }
    client.search({
      term: 'bars',
      location: locationName, //'New York, NY',
      limit: 30
    }).then(function (response) {
      var test = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var arr5;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  /*      const arr4 = [];
                        for (let [index, h] of arr3.entries()) {
                         await client.reviews(h).then(response2 => {
                          // console.log(index, response2.jsonBody.reviews[0].text)
                          // console.log(index)
                          // console.log(arr3)
                          arr4.push(response2.jsonBody.reviews[0].text)
                        // res.status(200).json({data: response.jsonBody.businesses, reviews: arr3 })
                        })
                        };*/
                  // console.log(await arr4 )        
                  arr5 = []; // REMOVE WAITING FOR LOAD TIME SEARCH LOCATION USE ARR4 REVIEWS BELOW TO USE REVIEWS

                  res.status(200).json({ data: response.jsonBody.businesses, reviews: arr5, regionCenter: regionCenter });

                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function test() {
          return _ref.apply(this, arguments);
        };
      }();

      // console.log(response.jsonBody.region.center)
      // console.log('response.body:',response.jsonBody.businesses)
      var arr3 = [],
          arr4 = [],
          regionCenter = response.jsonBody.region.center;
      response.jsonBody.businesses.forEach(function (res2) {
        return arr3.push(res2.id);
      });
      ;
      test();

      /*client.reviews('the-dead-rabbit-new-york').then(response2 => {
        // console.log(response2.jsonBody.reviews[0].text)
        // console.log(arr3)
      res.status(200).json({data: response.jsonBody.businesses, reviews: arr3 })
      }).catch(e => console.log(e));*/
    }).catch(function (err) {
      return console.log(err);
    });
  }).catch(function (err) {
    console.log(err);
  });

  // res.status(200).json({data: response.jsonBody.businesses, reviews: arr3 })
  // res.status(200).json({success: 'success'})
});

router.post('/userGoing', _authNoUser2.default, function (req, res) {
  // console.log(req.body.data[0].id)
  // console.log(req.currentUser.id)
  // console.log('req.currentUser:', req.currentUser)
  if (!req.currentUser) {
    res.status(200).json({ message: 'noArrNecessary' });
  } else if (req.currentUser) {
    var asyncForEach = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(array, callback) {
        var index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                index = 0;

              case 1:
                if (!(index < array.length)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return callback(array[index], index, array);

              case 4:
                index++;
                _context2.next = 1;
                break;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function asyncForEach(_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    var arr = [];
    ;
    var start = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return asyncForEach(req.body.data, function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(num, i) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _Venue2.default.count({ id: req.body.data[i].id, userId: req.currentUser.id }, function (err, c) {
                              // console.log('count:', c)
                              arr.push(c);
                              // console.log(arr)
                            });

                          case 2:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, undefined);
                  }));

                  return function (_x3, _x4) {
                    return _ref4.apply(this, arguments);
                  };
                }());

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function start() {
        return _ref3.apply(this, arguments);
      };
    }();
    start().then(function (response) {
      res.status(200).json({ userList: arr });
    }).catch(function (err) {
      return console.log(err);
    });
    /*  Venue.find({"userId" : ObjectId(req.currentUser.id)})
      .then(venues => {
        console.log('arr:',arr);
        res.json({ venues })}
        )  */
  }
});

router.post('/showGoing', function (req, res) {
  var asyncForEach = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(array, callback) {
      var index;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              index = 0;

            case 1:
              if (!(index < array.length)) {
                _context5.next = 7;
                break;
              }

              _context5.next = 4;
              return callback(array[index], index, array);

            case 4:
              index++;
              _context5.next = 1;
              break;

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function asyncForEach(_x5, _x6) {
      return _ref5.apply(this, arguments);
    };
  }();

  // const { id } = req.body.cache[2]
  //console.log(req.body.cache[0].id)
  // console.log(req.body.cache)  
  var arr = [];
  ;
  var start = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return asyncForEach(req.body.cache, function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(num, i) {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return _Venue2.default.count({ id: req.body.cache[i].id }, function (err, c) {
                            // console.log('count:', c)
                            arr.push(c);
                            // console.log(arr)
                          });

                        case 2:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  }, _callee6, undefined);
                }));

                return function (_x7, _x8) {
                  return _ref7.apply(this, arguments);
                };
              }());

            case 2:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function start() {
      return _ref6.apply(this, arguments);
    };
  }();

  // console.log('route showGoing')
  start().then(function (response) {
    return res.status(200).json({ getList: arr });
  }).catch(function (err) {
    return console.log(err);
  });
});

router.post('/going', _authenticate2.default, function (req, res) {
  var id = req.body.data.thing.id;
  // console.log(req.currentUser._id);
  // console.log(req.body)
  // console.log('id:', id);
  /*  Venue.findOrCreate({ id, "userId": ObjectId(req.currentUser.id) }, function(err, venue) {
      if(err) throw err;
      console.log('Found or Created: ', venue);
    });*/
  // res.json({success: true}).end();

  _Venue2.default.findOne({ "userId": (0, _mongodb.ObjectId)(req.currentUser.id), "id": id }).then(function (response) {
    if (response) {
      _Venue2.default.remove({ userId: req.currentUser.id, id: id }).then(res.status(200).json({ error: "can\'t vote twice" })).catch(function (err) {
        return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
      });
    } else if (!response) {
      console.log('id:', id);
      console.log("userId: ", (0, _mongodb.ObjectId)(req.currentUser.id));
      /*    Venue.create({ userId: req.currentUser.id, id: id }) //test save()
            .then(venue => res.status(200).json({ venue: id }) )
            .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));      */
      _Venue2.default.findOrCreate({ id: id, "userId": (0, _mongodb.ObjectId)(req.currentUser.id) }, function (err, venue) {
        if (err) console.log('err33:', err); //throw err;
        console.log('Found or Created: ', venue);
      }); //.then(res.json({success: true}).end());  
    }
  });
});

exports.default = router;