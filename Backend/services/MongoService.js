const fs = require('fs');
const path = require('path');

const mongo = require('mongodb');
const Client = mongo.MongoClient;

class MongoService {
    constructor() {
        console.log("Initializing database...");

        try {
            fs.open(path.join(__dirname, '../credentials.json'), "a+", (err, fd) => {
                if(err) throw new Error("You need to create a credentials.json file in the Backend folder.")

                const data = fs.readFileSync(path.join(__dirname, '../credentials.json'), 'utf-8');
                const connectionString = JSON.parse(data)['connectionString'];

                if(!connectionString) {
                    throw new Error("You need to create a credentials.json file in the Backend folder, this needs a property called 'connectionString' with the value of a MongoDB connection string in order for this application to function.")
                } else {
                    this.client = new Client(connectionString);
                    console.log("Successfully connected!");
                }
            })
        } catch(e) {
            throw new Error("You need to create a credentials.json file in the Backend folder, this needs a property called 'connectionString' with the value of a MongoDB connection string in order for this application to function.")
        }
    }

    findStudentById(studentId) {
        return this.client.db("SMDemo").collection("Students").findOne({studentId: studentId});
    }

    getAllStudentRecords() {
        return this.client.db("SMDemo").collection("Students").find().toArray();
    }

    enrolNewStudent(studentId, studentName, classCode, carerName, carerEmail) {
        this.client.db("SMDemo").collection("Students").insertOne({
            studentId: studentId,
            studentName: studentName,
            classCode: classCode,
            carerName: carerName,
            carerEmail: carerEmail
        })
    }

    updateStudentRecord(studentId, studentName, classCode, carerName, carerEmail) {
        this.client.db("SMDemo").collection("Students").findOneAndUpdate({studentId: studentId}, {
            $set: {
                studentName: studentName,
                classCode: classCode,
                carerName: carerName,
                carerEmail: carerEmail
            }
        })
    }

    removeStudentRecord(studentId) {
        this.client.db("SMDemo").collection("Students").deleteOne({studentId: studentId})
    }
}

module.exports = new MongoService();