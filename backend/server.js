const express = require("express");
const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const config = require('./config.json');
const { v4: uuidv4 } = require('uuid');

const nodeMailer = require('nodemailer');

const app = express();

const storage = new Storage({
    projectId: config.projectId, // Replace with your Google Cloud project ID
    keyFilename: 'key.json', // Replace with the path to your service account key JSON file
  });

const bucketName = config.bucketName;

const cors = require('cors');
const multerStorage = multer.memoryStorage(); // You can change this to store files on disk
const upload = multer({ storage: multerStorage });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = config.mongoURI;

const client = new MongoClient(uri);

const database = client.db("EAH_db");
const logintab = database.collection("EAH_login");
const otptab = database.collection("EAH_otp")
const alerttable = database.collection("EAH_alerts")
const timetable = database.collection("EAH_timetable")
const adminrequest = database.collection("EAH_adminrequest")
const facultyrequest = database.collection("EAH_facultyrequest")

const faculty_list = ["Pradeep Karthik M","Sabarish B","Jayandar S","Logeswaran S R","Kishore S","Aaditya S"]
const hall_list = ["A101","A102","A103","B103","C101","A104"]

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: config.emailSender,
      pass: config.emailPassword,
      authType: "plain"
    }   
  });


  async function enterintoalert(alertstring)
  {
        let alertobject = {}

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;   

        alertobject.date = formattedDate
        alertobject.description = alertstring

        const result = await alerttable.insertOne(alertobject)

  }

  async function sendemail(subject,content,name)
  {
    //use the name to find the email and send the content

    console.log("Got SendMail",name)

    const query = {
        name: name
    }

    const result = await logintab.findOne(query);

    if(result !== null && result.email_sub)
    {
        const email = result.email;

        const mailOptions = {
            from: config.emailSender, // sender address
            to: email,
            subject: subject, // Subject line
            text: content, // plain text body
        };

        console.log("Going to send email")

        await transporter.sendMail(mailOptions,async function(err, info) {
        if (err) {
        // handle error
        console.log(err);
        }
        else{
            console.log("Mail sent")
        }
        })
    }

    else {
    }

  }

async function deleteExpired()
{
    console.log("delete expired called")

    try{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`; 

        const result = await timetable.deleteMany({ date: { $lt: formattedDate } });

        console.log(`${result.deletedCount} exams deleted.`);
    }

    catch(err)
    {
        console.log(err)
    }
}

    async function deleteAdminRequest(id){
        try{

            const result = await adminrequest.deleteOne({_id: new ObjectId(id)});
            console.log("DeleteAdminRequest",id)
        }

        catch(err)
        {
            console.log(err)
        }

    }

    async function deleteFacultyRequest(id){
        try{

            const result = await facultyrequest.deleteOne({_id: new ObjectId(id)});
            console.log("DeleteFacultyRequest",id)
        }

        catch(err)
        {
            console.log(err)
        }

    }

app.post("/loginuser",async (req, res) => {
   

    const query = {
        email: req.body.email,
        password: req.body.password
    }

    console.log("Got login",query)

    const result = await logintab.findOne(query);

    if(result !== null)
    {
        const objToSend = {
            name: result.name,
            email: result.email,
            userType: result.userType
        }
        console.log(objToSend)
        res.status(200).send(JSON.stringify(objToSend))
    }

    else {
        res.status(404).send()
    }

    console.log("received login")
});

function generateRandomNumber() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  app.post('/update_image', upload.single('image'), async (req, res) => {

    try {
        if (!req.file) {
          return res.status(400).json({ error: 'No file provided' });
        }

        const filter = {email: req.body.email };
    
        const fileBuffer = req.file.buffer;
    
        // Generate a unique filename for the uploaded image
        const filename = `${uuidv4()}-${req.file.originalname}`;
    
        // Upload the image to Google Cloud Storage
        const file = storage.bucket(bucketName).file(filename);
        await file.save(fileBuffer);
    
        // Get the access URL of the uploaded image
        const accessUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
    
        // Process the image or save information to the database, etc.

        let objtoUpdate = {}

        objtoUpdate.profile_img = accessUrl;
        
        const update = { $set:objtoUpdate };

        const result = await logintab.updateOne(filter, update);

        // console.log(accessUrl);
    
        // Respond with success and the access URL
        res.send({ success: true, imageUrl: accessUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

  });

app.post("/forget_email",async (req, res) => {
    console.log("Got forget_email")

    const query = {
        email: req.body.email
    }

    const result = await logintab.findOne(query);

    if(result !== null)
    {
        email_id = req.body.email;

        otp = generateRandomNumber()

        const mailOptions = {
            from: config.emailSender, // sender address
            to: email_id,
            subject: "OTP Verification for Exam Alteration Helper", // Subject line
            text: "Hello,\n Your generated OTP for login is: "+otp+"\nThanks!!!", // plain text body
        };

        await transporter.sendMail(mailOptions,async function(err, info) {
        if (err) {
        // handle error
        console.log(err);
        }
        else{
            console.log("Mail sent")

            const filter = { email: email_id };
            const update = { $set: { otp: otp } };
            const options = { upsert: true };

            const result = await otptab.updateOne(filter, update, options);

            res.status(200).send()
        }
        })

    }
    else {
        res.status(404).send()
    }

    console.log("received forget_email")
});

app.post("/otp_handle",async (req,res) => {

    email_id = req.body.email;

    const result = await otptab.findOne({email: email_id})

    if(result != null)
    {
        otp_default = result.otp

        const resulter = await logintab.findOne({email: email_id})

        if((req.body.otp+"") == (otp_default+""))
        {
            res.status(200).send({email: resulter.email,name: resulter.name})
        }
        else{
            res.status(404).send()
        }
    }
    else{
        res.status(404).send()
    }
})

app.post("/fetch_faculty_alerts",async (req,res) => {
    
    console.log("Got request for faculty alert fetch")

    await deleteExpired();

    const result = await alerttable.find({}).toArray()

    if(result != null)
    {
        res.status(200).send({"alertrecords": result})
    }
    else{
        res.status(404).send()
    }

})

app.post("/fetch_faculty_sched",async (req,res) => 
{
    const name = req.body.name

    console.log("Got request for faculty schedule fetch",name)

    const result = await timetable.find({Invigilator: name}).toArray()

    console.log(result)

    if(result != null)
    {
        res.status(200).send({"schedulerecords": result})
    }
    else{
        res.status(200).send({"schedulerecords": []})
    }
})

app.post("/fetch_view_table",async (req,res) => 
{

    console.log("Got request for faculty schedule fetch")

    const result = await timetable.find({}).toArray()

    console.log(result)

    if(result != null)
    {
        res.status(200).send({"schedulerecords": result})
    }
    else{
        res.status(404).send()
    }
})


app.post("/fetch_edit_profile",async (req,res) => 
{

    console.log("Got request for faculty profile fetch")

    email = req.body.email

    const result = await logintab.findOne({email: email})

    var img_url = result.profile_img;

    var username =result.name  

    var nameArray = username.split(' ');

    var fname = nameArray[0];

    var lname = nameArray.slice(1).join(' ');
    
    const objToSend = {
        fname: fname,
        lname: lname,
        email: result.email,
        mobile: result.mobile,
        designation: result.designation,
        department: result.department,
        email_sub: result.email_sub,
        img_url: img_url
    }

    if(result != null)
    {
        res.status(200).send({"editrecords": objToSend})
    }
    else{
        res.status(404).send()
    }
})

app.post("/update_edit_profile",async (req,res) => 
{

    console.log("Got request for faculty profile edit")

    email = req.body.email

    let objtoUpdate = {}

    objtoUpdate.name = req.body.fname +" "+req.body.lname 
    objtoUpdate.email = req.body.email
    if(req.body.password != "")
    {
        objtoUpdate.password = req.body.password 
    }
    objtoUpdate.mobile = req.body.mobile 
    objtoUpdate.designation = req.body.designation
    objtoUpdate.department = req.body.department
    objtoUpdate.email_sub = req.body.email_sub

    const result = await logintab.findOne({email: email})

    if(result != null)
    {
        const filter = {email: req.body.email };
        const update = { $set:objtoUpdate };

        const result = await logintab.updateOne(filter, update);

        console.log(result)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/update_admin_profile",async (req,res) => 
{

    console.log("Got request for admin profile edit")

    email = req.body.email

    let objtoUpdate = {}

    objtoUpdate.name = req.body.fname +" "+req.body.lname 
    objtoUpdate.email = req.body.email
    if(req.body.password != "")
    {
        objtoUpdate.password = req.body.password 
    }
    objtoUpdate.mobile = req.body.mobile 
    objtoUpdate.email_sub = req.body.email_sub

    const result = await logintab.findOne({email: email})

    if(result != null)
    {
        const filter = {email: req.body.email };
        const update = { $set:objtoUpdate };

        const result = await logintab.updateOne(filter, update);

        console.log(result)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/edit_exam",async (req,res) => 
{

    console.log("Got request for editing an exam")

    id = req.body.formdata._id

    let objecttoupdate = req.body.formdata

    // console.log(id)
    console.log("Formdata",objecttoupdate)

    const result = await timetable.findOne( {_id: new ObjectId(id)})

    if(result != null)
    {
        const filter =  {_id: new ObjectId(id)};

        const objtoUpdate = {}

        objtoUpdate.date = objecttoupdate.date
        objtoUpdate.TimeSlot = objecttoupdate.TimeSlot
        objtoUpdate.Invigilator = objecttoupdate.Invigilator
        objtoUpdate.Hall = objecttoupdate.Hall 
        objtoUpdate.course = objecttoupdate.course 

        const update = { $set: objtoUpdate};

        const result = await timetable.updateOne(filter, update);

        await enterintoalert("The exam: "+objtoUpdate.course+" has been changed to "+objtoUpdate.date+" "+objtoUpdate.TimeSlot+" in "+objtoUpdate.Hall+" invigilated by "+objtoUpdate.Invigilator)

        await sendemail("Re: "+objtoUpdate.course+" has been updated","Hi,\nThe exam: "+objtoUpdate.course+" you were assigned to invigilate has been updated. Kindly note the following details:\nDate: "+objtoUpdate.date+"\nTime: "+objtoUpdate.TimeSlot+"\nHall: "+objtoUpdate.Hall+"\nKidly be there on time!!!\nThank You.",objtoUpdate.Invigilator)

        console.log("editresult",result)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/request_admin",async (req,res) => 
{

    console.log("Got request for Requesting Admin an exam")

    let reqobj = req.body.formdata
    let objecttoupdate = {}

    objecttoupdate.rowid = reqobj._id
    objecttoupdate.date = reqobj.date 
    objecttoupdate.TimeSlot = reqobj.TimeSlot
    objecttoupdate.Invigilator = reqobj.Invigilator
    objecttoupdate.Hall = reqobj.Hall
    objecttoupdate.course = reqobj.course
    objecttoupdate.Reason = reqobj.Reason 

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;   

    objecttoupdate.reqdate = formattedDate
    
    console.log("Formdata",objecttoupdate)

    const result = await adminrequest.insertOne(objecttoupdate)

    await sendemail("Re: Received Request from "+objecttoupdate.Invigilator,"Hi,\nThe exam: "+objecttoupdate.course+" has been requested for a reschedule by"+objecttoupdate.Invigilator+"\nHere's the description for the request:\n"+objecttoupdate.Reason+"\nKindly Visit the Website to reschedule the exam\nThank You!","Rajesh M")

    res.status(200).send()
})

app.post("/request_faculty",async (req,res) => 
{

    console.log("Got request for Requesting Faculty an exam")

    let reqobj = req.body.formdata
    let objecttoupdate = {}

    objecttoupdate.rowid = reqobj._id
    objecttoupdate.date = reqobj.date 
    objecttoupdate.TimeSlot = reqobj.TimeSlot
    objecttoupdate.Invigilator = reqobj.Invigilator
    objecttoupdate.Hall = reqobj.Hall
    objecttoupdate.course = reqobj.course
    objecttoupdate.Reason = reqobj.Reason
    objecttoupdate.src_invigilator = reqobj.src_invigilator

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;   

    objecttoupdate.reqdate = formattedDate
    
    console.log("Formdata",objecttoupdate)

    const result = await facultyrequest.insertOne(objecttoupdate)

    await sendemail("Re: Received Request from "+objecttoupdate.src_invigilator+" for Alternate Invigilation","Hi,\nThe exam: "+objecttoupdate.course+" has been requested for an Alternate Invigilator by "+objecttoupdate.src_invigilator+"\nHere's the description for the request:\n"+objecttoupdate.Reason+"\nKindly Visit the Website to swap the invigilation!\nThank You!",objecttoupdate.Invigilator)

    res.status(200).send()
})

app.post("/fetch_admin_requests",async (req,res)=>{

    const result = await adminrequest.find({}).toArray()

    if(result != null)
    {
        res.status(200).send({"requestrecords": result})
    }
    else{
        res.status(404).send()
    }
})


app.post("/fetch_faculty_requests",async (req,res)=>{

    console.log("Get faculty requests fetcher")

    name = req.body.name

    const result = await facultyrequest.find({Invigilator: name}).toArray()

    if(result != null)
    {
        res.status(200).send({"requestrecords": result})
    }
    else{
        res.status(404).send()
    }
})

app.post("/fetch_old_values",async (req,res) => 
{

    console.log("Got request for fetching old values")

    id = req.body._id

    const result = await timetable.findOne( {_id: new ObjectId(id)})

    if(result!=null)
    {
        res.status(200).send({"oldvalue": result})
    }
    else{
        res.status(400).send()
    }
})

app.post("/accept_request",async (req,res) => 
{
    console.log("Got request for accepting a request")

    id = req.body.formdata.rowid
    deleteid = req.body.formdata._id

    let objecttoupdate = req.body.formdata

    // console.log(id)
    console.log("Formdata",objecttoupdate)

    const result = await timetable.findOne( {_id: new ObjectId(id)})

    if(result != null)
    {
        const filter =  {_id: new ObjectId(id)};

        const objtoUpdate = {}

        objtoUpdate.date = objecttoupdate.date
        objtoUpdate.TimeSlot = objecttoupdate.TimeSlot
        objtoUpdate.Invigilator = objecttoupdate.Invigilator
        objtoUpdate.Hall = objecttoupdate.Hall 
        objtoUpdate.course = objecttoupdate.course
        objtoUpdate.remarks = objecttoupdate.remarks

        const update = { $set: objtoUpdate};

        const result = await timetable.updateOne(filter, update);

        await enterintoalert("The exam: "+objtoUpdate.course+" has been changed to "+objtoUpdate.date+" "+objtoUpdate.TimeSlot+" in "+objtoUpdate.Hall+" invigilated by "+objtoUpdate.Invigilator)

        await deleteAdminRequest(deleteid)

        await sendemail("Re: Request for"+objtoUpdate.course+" Accepted","Hi,\nYour Reschedule request for "+objtoUpdate.course+" has been accepted by the admin.\nHere's the Remarks given by him:\n"+objtoUpdate.remarks+"\nKindly note the following details:\nDate: "+objtoUpdate.date+"\nTime: "+objtoUpdate.TimeSlot+"\nHall: "+objtoUpdate.Hall+"\nKidly be there on time!!!\nThank You.",objtoUpdate.Invigilator)

        console.log("accept request",result)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/reject_request",async (req,res) => 
{
    console.log("Got request for rejecting a request")

    id = req.body.formdata.rowid
    deleteid = req.body.formdata._id

    let objecttoupdate = req.body.formdata

    // console.log(id)
    console.log("Formdata",objecttoupdate)

    const result = await timetable.findOne( {_id: new ObjectId(id)})

    if(result != null)
    {
        // const filter =  {_id: new ObjectId(id)};

        const objtoUpdate = {}

        // objtoUpdate.date = objecttoupdate.date
        // objtoUpdate.TimeSlot = objecttoupdate.TimeSlot
        objtoUpdate.Invigilator = objecttoupdate.Invigilator
        // objtoUpdate.Hall = objecttoupdate.Hall 
        objtoUpdate.course = objecttoupdate.course
        objtoUpdate.remarks = objecttoupdate.remarks

        // const update = { $set: objtoUpdate};

        // const result = await timetable.updateOne(filter, update);

        // await enterintoalert("The exam: "+objtoUpdate.course+" has been changed to "+objtoUpdate.date+" "+objtoUpdate.TimeSlot+" in "+objtoUpdate.Hall+" invigilated by "+objtoUpdate.Invigilator)

        await deleteAdminRequest(deleteid)

        await sendemail("Re: Request for"+objtoUpdate.course+" Rejected","Hi,\nYour Reschedule request for "+objtoUpdate.course+" has been rejected by the admin.\nHere's the Remarks given by him:\n"+objtoUpdate.remarks+"\nThank You.",objtoUpdate.Invigilator)

        console.log("reject request",result)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/accept_faculty_request",async (req,res) => 
{
    console.log("Got request for accepting a faculty request")

    id = req.body.formdata.rowid
    deleteid = req.body.formdata._id

    let objecttoupdate = req.body.formdata

    src_invigilator = objecttoupdate.src_invigilator
    remarks = objecttoupdate.remarks

    // console.log(id)
    console.log("Formdata",objecttoupdate)

    const result = await timetable.findOne( {_id: new ObjectId(id)})

    if(result != null)
    {
        const filter =  {_id: new ObjectId(id)};

        const objtoUpdate = {}

        objtoUpdate.date = objecttoupdate.date
        objtoUpdate.TimeSlot = objecttoupdate.TimeSlot
        objtoUpdate.Invigilator = objecttoupdate.Invigilator
        objtoUpdate.Hall = objecttoupdate.Hall 
        objtoUpdate.course = objecttoupdate.course
        objtoUpdate.remarks = objecttoupdate.remarks

        const update = { $set: objtoUpdate};

        const result = await timetable.updateOne(filter, update);

        await enterintoalert("The exam: "+objtoUpdate.course+" has been changed to "+objtoUpdate.date+" "+objtoUpdate.TimeSlot+" in "+objtoUpdate.Hall+" invigilated by "+objtoUpdate.Invigilator)

        await deleteFacultyRequest(deleteid)

        await sendemail("Re: Request for"+objtoUpdate.course+" Accepted","Hi,\nYour Swap request for "+objtoUpdate.course+" has been accepted by "+objecttoupdate.Invigilator+"\nHere's the Remarks given by him:\n"+remarks+"\nThank You.",src_invigilator)

        console.log("accept request",result)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/reject_faculty_request",async (req,res) => 
{
    console.log("Got request for rejecting a faculty request")

    id = req.body.formdata.rowid
    deleteid = req.body.formdata._id

    let objecttoupdate = req.body.formdata

    // console.log(id)
    console.log("Formdata",objecttoupdate)

    const result = await timetable.findOne( {_id: new ObjectId(id)})

    if(result != null)
    {
        // const filter =  {_id: new ObjectId(id)};

        const objtoUpdate = {}

        objtoUpdate.date = objecttoupdate.date
        objtoUpdate.TimeSlot = objecttoupdate.TimeSlot
        objtoUpdate.Invigilator = objecttoupdate.Invigilator
        objtoUpdate.Hall = objecttoupdate.Hall 
        objtoUpdate.course = objecttoupdate.course
        objtoUpdate.remarks = objecttoupdate.remarks
        objtoUpdate.src_invigilator = objecttoupdate.src_invigilator

        // const update = { $set: objtoUpdate};

        // const result = await timetable.updateOne(filter, update);

        // await enterintoalert("The exam: "+objtoUpdate.course+" has been changed to "+objtoUpdate.date+" "+objtoUpdate.TimeSlot+" in "+objtoUpdate.Hall+" invigilated by "+objtoUpdate.Invigilator)

        await deleteFacultyRequest(deleteid)

        await sendemail("Re: Request for"+objtoUpdate.course+" Rejected","Hi,\nYour Reschedule request for "+objtoUpdate.course+" has been rejected by "+objtoUpdate.Invigilator+"\nHere's the Remarks given by him:\n"+objtoUpdate.remarks+"\nThank You.",objtoUpdate.src_invigilator)

        console.log("reject request",result)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/delete_exam",async (req,res) => 
{

    console.log("Got request for deleting an exam")

    id = req.body._id

    const result = await timetable.findOne( {_id: new ObjectId(id)})

    const date = result.date 
        const timeslot = result.TimeSlot
        const invigilator = result.Invigilator
        const hall = result.Hall
        const course = result.course

    if(result != null)
    {

        const result = await timetable.deleteOne({_id: new ObjectId(id)});

        await enterintoalert("The exam: "+course+" suppose to happen on "+date+" "+timeslot+" in "+hall+" invigilated by "+invigilator+" has been cancelled")
        
        await sendemail("Re: "+course+" has been cancelled.","Hi,\nThe exam: "+course+" you were assigned to invigilate has been cancelled. Kindly check the details of the cancelled exam:\nDate: "+date+"\nTime: "+timeslot+"\nHall: "+hall+"\nSorry for the inconvinience!!!\nThank You.",invigilator)

        res.status(200).send()
    }
    else{
        res.status(404).send()
    }
})

app.post("/add_exam",async (req,res) => 
{

    let tempdata = req.body.formdata

    console.log("Got request for adding exam")

    const objtoUpdate = {}

        objtoUpdate.date = tempdata.date
        objtoUpdate.TimeSlot = tempdata.TimeSlot
        objtoUpdate.Invigilator = tempdata.Invigilator
        objtoUpdate.Hall = tempdata.Hall 
        objtoUpdate.course = tempdata.course 

    try {
        const result = await timetable.insertOne(objtoUpdate);
        await enterintoalert("A new exam: "+objtoUpdate.course+" happening on "+objtoUpdate.date+" "+objtoUpdate.TimeSlot+" in "+objtoUpdate.Hall+" invigilated by "+objtoUpdate.Invigilator+" has been added to the schedule")
        await sendemail("Re: "+objtoUpdate.course+" has been Added","Hi,\nYou are assigned to invigilate for the exam: "+objtoUpdate.course+" Kindly note the following details:\nDate: "+objtoUpdate.date+"\nTime: "+objtoUpdate.TimeSlot+"\nHall: "+objtoUpdate.Hall+"\nKidly be there on time!!!\nThank You.",objtoUpdate.Invigilator)
        res.status(200).send()
      } catch (err) {
        console.log(err)
        res.status(404).send();
      }

    res.status(404).send()
})

app.post("/fetch_available",async (req,res) => {

    date = req.body.date 
    time = req.body.TimeSlot
    _id = req.body._id

    const array = await timetable.find({date: date,TimeSlot: time}).toArray()

    console.log("GOT REQUEST FOR FETCH AVAILABLE",array)

    const facultyarr = [];
    const hallarr = [];

    array.forEach((obj) => {
        let faculty = obj.Invigilator 
        let hall = obj.Hall

        facultyarr.push(faculty);
        hallarr.push(hall);

      });

      const faculty_send = faculty_list.filter((value) => !facultyarr.includes(value));
      const hall_send = hall_list.filter((value) => !hallarr.includes(value));

      try{

      const same_row_arr = await timetable.findOne({date: date,TimeSlot: time,_id: new ObjectId(_id)})

      if(same_row_arr != null)
      {
        console.log("Hi")
        faculty_send.push(same_row_arr.Invigilator);
        hall_send.push(same_row_arr.Hall);
      }
    }catch(err){}

    res.status(200).send({"Invigilators":faculty_send,"Halls":hall_send});
    
})

app.listen(5000, () => {
    console.log("Listening on port 5000...")
})
