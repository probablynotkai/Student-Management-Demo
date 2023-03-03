// Prerequisites
const bodyParser = require('body-parser');
const cors = require('cors');

// Application setup
const express = require('express');
const app = express();
const port = 8080;

// Extra services
const mongo = require('./services/MongoService.js');

// Allow application to parse 
// application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let studentData = [];

app.get('/v1/getHelloWorld', (req, res) => {
    console.log("Received");
    res.send(JSON.stringify({status: 1, message: 'Hello World'}));
})

app.get('/v1/getAllStudentRecords', (req, res) => {
    mongo.getAllStudentRecords().then((records) => {
        res.send(JSON.stringify(records))
    })
})

app.post('/v1/enrolNewStudent', (req, res) => {
    let data = {
        studentId: generateId(),
        studentName: req.body['studentName'],
        classCode: req.body['classCode'],
        carerName: req.body['carerName'],
        carerEmail: req.body['carerEmail']
    }

    if(!data.studentName || !data.classCode || !data.carerName || !data.carerEmail) {
        res.send(JSON.stringify({status: -1, message: "Invalid POST data"}));
    } else {
        let matches = studentData.filter((student) => {
            return student.studentName == data.studentName && student.carerName == data.carerName
        });

        if(matches.length > 0) {
            res.send(JSON.stringify({status: 0, message: "Student already exists"}));
        } else {
            studentData.push(data);
            mongo.enrolNewStudent(data.studentId, data.studentName, data.classCode, data.carerName, data.carerEmail)

            res.send(JSON.stringify({status: 1, message: "Student enrolled", id: data.studentId}));
        }
    }
})

app.post('/v1/updateStudentRecord', (req, res) => {
    let data = {
        studentId: req.body['studentId'],
        studentName: req.body['studentName'],
        classCode: req.body['classCode'],
        carerName: req.body['carerName'],
        carerEmail: req.body['carerEmail']
    }

    if(!data.studentId || !data.studentName || !data.classCode || !data.carerName || !data.carerEmail) {
        res.send(JSON.stringify({status: -1, message: "Invalid POST data"}));
    } else {
        mongo.findStudentById(data.studentId).then((match) => {
            if(!match) {
                res.send(JSON.stringify({status: 0, message: "Student not found"}));
            } else {
                studentData[studentData.indexOf(match)] = {
                    ...match,
                    ...data
                }

                mongo.updateStudentRecord(data.studentId, data.studentName, data.classCode, data.carerName, data.carerEmail);
    
                res.send(JSON.stringify({status: 1, message: "Student updated"}));
            }
        });
    }
})

app.post('/v1/removeStudentRecord', (req, res) => {
    let data = {
        studentId: req.body['studentId']
    }

    if(!data.studentId) {
        res.send(JSON.stringify({status: -1, message: "Invalid POST data"}));
    } else {
        mongo.findStudentById(data.studentId).then((match) => {
            if(!match) {
                res.send(JSON.stringify({status: 0, message: "Student not found"}));
            } else {
                let updatedList = [];
                for(let student of studentData) {
                    if(student.studentId != data.studentId) {
                        updatedList.push(student);
                    }
                }
                studentData = updatedList;
    
                mongo.removeStudentRecord(data.studentId)
    
                res.send(JSON.stringify({status: 1, message: "Student deleted"}));
            }
        });
    }
})

app.listen(port, () => {
    console.log(`Application is live and listening on port ${port}.`)

    if(mongo) {
        // If your database connection is slow, increase the timeout
        setTimeout(() => {
            mongo.getAllStudentRecords().then((records) => {
                if(records) {
                    studentData = records;
                }
            })
        }, 1500)
    }
})

let generateId = () => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for(let i = 0; i < 10; i++) {
        id += chars.charAt(Math.random() * chars.length);
    }
    
    let idExists = false;
    for(let student of studentData) {
        if(student.studentId == id) {
            idExists = true;
            break;
        }
    }
    return (idExists ? generateId() : id);
}