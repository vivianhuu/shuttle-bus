var mongojs=require('mongojs');
var db = mongojs('localhost/bus');
var admin = db.collection('admins');
var routes = db.collection('routes');
module.exports = function(app){
  app.get('/login/:username/:password',function (req,res){
    console.log(req.params);
    db.admin.findOne({"username": req.params.username, "password": req.params.password}, function(err,doc){
      if (err) {
       res.status(404);
      } else {
       console.log(req.params.password);
       res.status(200).json(doc);
      };
    });
  });

// search routes
app.get('/searchResults/:start/:end', function (req, res){
  console.log(req.params);
  db.routes.findOne({"start": req.params.start, "end": req.params.end}, function (err, doc){
    if (err) {
      res.status(404);
    } else {
      console.log(doc);
      return res.status(200).json(doc);
    };
  });
});

// get all relative routes of one station
app.get('/relativeRoutes/:station', function (req, res){
  console.log(req.params.station);
  db.routes.find({$or: [{"start": req.params.station}, {"end": req.params.station}]}, function (err, routes){
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      console.log(routes);
      return res.status(200).json(routes);
    };
  });
});

// get all routes info
app.get('/admin/allRoutes', function (req, res) {       
  console.log('I received a GET request');
  db.routes.find(function (err, docs) {        
    console.log(docs);
    if (err) {
      res.status(404);
    } else {
      res.status(200).json(docs);
    };
  });
});

// delete doc(s) from url "admin/allRoutes"
// if you want to use app.delete, you have to pass the id in the url,
// like app.delete('/admin/allRoutes/:id', function(req, res){...});
// the code below can delete multiple docs or doc from the url without id.
app.post('/admin/allRoutes', function (req, res){
  console.log(req.body);
  db.routes.remove({_id: mongojs.ObjectId(req.body.id)}, function (err, doc){
    if (err) {
      res.status(404);
    } else {
      console.log(req.body.id);
      res.status(200).json(doc);
    };
  });
});

// create a new route
app.post('/admin/new', function (req, res){
  console.log("I get a post request.");
  console.log(req.body);
  db.routes.findOne({start: req.body.start, end: req.body.end}, function (err, doc){
    if (err) {
      res.status(404);
    } else if (doc != null) {
      res.status(202).json({message: "You have create this route!"});
    } else {
      db.routes.insert(req.body, {w: 1}, function (err, doc){
        if (err) {
          res.status(404);
        } else {
          res.status(201).json(doc);
        };
      });
    };
  });
});

// get a specific route info
app.get('/admin/allRoutes/:id', function (req,res){
  console.log("i received a get request");  
  //var route_id=reg.params.getroute_id;
  console.log(req.params.id);
  db.routes.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err,doc){
    if (err) {
      res.status(404);
    } else {
      console.log(doc);
      res.status(200).json(doc);
    };
  });
}); 
 // update specific route
app.post('/admin/allRoutes/:id', function (req, res){
  db.routes.findAndModify({
    query: {_id: mongojs.ObjectId(req.params.id)},
    update: {$set: {start: req.body.start, end: req.body.end, timetables: req.body.timetables}},
    new: true,
  }, function (err, doc){
    if (err) {
      res.status(403);
    } else {
      console.log(doc);
      res.status(201).json(doc);
    };
  });
});
};
