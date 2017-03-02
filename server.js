var express = require('express');
var MongoClient = require('mongodb').MongoClient
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyparser = require('body-parser');
app.use(express.static('public'))
app.use(express.static('rest-api/practice'))


app.use(bodyparser.urlencoded({ extended: false }))
var db = mongoose.connect("mongodb://brandon:password@ds113580.mlab.com:13580/apipractice", null, function (err) {
    if (err) {
        res.status(500);
        console.log(err);
        res.send("you have an error");
        return;
    } else {
        app.listen(3000, function () {
            console.log('Server running on port 3000')
        })
    }
})
var teacherSchema = new Schema({
    name: String,
    email: String
})
var studentSchema = new Schema({
    name: String,
    email: String
})
var classSchema = new Schema({
    code: String,
    name: String
})

var Teachers = db.model('Teachers', teacherSchema);
var Classes = db.model('Classes', classSchema);
var Students = db.model('Students', studentSchema);

app.get('/', function(req, res) {
    res.render('index');
})
app.post('/', function(req, res) {
    console.log(req.body);
})

app.get('/api/teachers', function (req, res) {
    console.log('hitting')
    Teachers.find().exec(function (err, teachers) {
        if (err) {
            console.log(err);
            res.status(500);
            res.end();
            return;
        } else {
            res.status(200);
            res.json(teachers);
            return;
        }
    })
})

app.get('/api/teachers/:id', function (req, res) {
    var id = req.param('id');
    Teachers.findOne({ "_id": id }).exec(function (err, teachers) {
        if (err) {
            console.log(err);
            res.status(500);
            res.end();
            return;
        } else {
            res.status(200);
            res.json(teachers);
            return;
        }
    })
})

app.post('/api/teachers', function (req, res) {
    var teacher = new Teachers({ name: req.body.name, email: req.body.email });
    teacher.save(function (err, result) {
        if (err) {
            console.log(err);
            res.status(400);
            res.end();
            return;
        }
        res.status(201);
        res.send(result);
        return;
    })
})

app.get('/api/students', function (req, res) {
    Students.find().exec(function (err, students) {
        students.reverse();
        res.json(students);
    })
})

app.get('/api/students/:id', function (req, res) {
    var id = req.param('id');
    Students.findOne({ "_id": id }).exec(function (err, students) {
        if (err) {
            console.log(err);
            res.status(500);
            res.end();
            return;
        } else {
            res.status(200);
            res.json(students);
            return;
        }
    })
})

app.post('/api/students', function (req, res) {
    var student = new Students({ name: req.body.name, email: req.body.email });
    student.save(function (err, result) {
        if (err) {
            console.log(err);
            res.status(400);
            res.end();
            return;
        }
        res.status(201);
        res.send(result);
        return;
    })
})

app.get('/api/classes', function (req, res) {
    Classes.find().exec(function (err, classes) {
        classes.reverse();
        res.json(classes);
    })
})

app.get('/api/classes/:id', function (req, res) {
    var id = req.param('id');
    Classes.findOne({ "_id": id }).exec(function (err, classes) {
        if (err) {
            console.log(err);
            res.status(500);
            res.end();
            return;
        } else {
            res.status(200);
            res.json(classes);
            return;
        }
    })
})

app.post('/api/classes', function (req, res) {
    var course = new Classes({ name: req.body.name, code: req.body.code });
    course.save(function (err, result) {
        if (err) {
            console.log(err);
            res.status(400);
            res.end();
            return;
        }
        res.status(201);
        res.send(result);
        return;
    })
})


