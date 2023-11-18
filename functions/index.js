/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin=require("firebase-admin");
const nodemailer =require("nodemailer");
admin.initializeApp();


// eslint-disable-next-line max-len
exports.sendEmailNotification=functions.firestore.document("companies/{docId}")
    .onCreate((snap)=>{
      const data=snap.data();
      const authData=nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "danielguesh8888@gmail.com",
          pass: "xlekpisiooeahdsf",
        },
      });
      const email= data.email;
      // const name= data.name;
      const password= data.id.substring(0, 6);
      // admin.auth().createUser({
      //   email: email,
      //   emailVerified: false,
      //   phoneNumber: "",
      //   password: password,
      //   displayName: name,
      //   photoURL: "",
      //   disabled: false,
      // })
      admin.auth().createUser({
        email: email,
        password: password,
      }).then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
      })
          .catch((error) => {
            console.log("Error creating new user:", error);
          });


      authData.sendMail({
        from: "info.itrains@makethatapp.com",
        to: `${data.email}`,
        subject: "Your New Account Information of It Rains Food Donation Bank",
        text: `Your New Account Information of It Rains Food Donation Bank`,
        html: `<div style="margin:0; padding:10px;">
        <div style="font-size:17;color:#5A5A5A; margin-bottom:30px;">Dear ${data.name},</div>
         <div style="font-size:17;color:#5A5A5A; margin-bottom:20px;">
           Your account creation has finished processing.
          </div>
          <div style="font-size:17;color:#5A5A5A; margin-bottom:30px;">Your account has been created. Please sign in using the detail below to          manage your new Account.</div>
          <div style="font-size:17;color:#5A5A5A;">
           Best Regards,
          </div>
            <div style="font-size:17;color:#5A5A5A;">
           Zenawi Gebretnasay,
          </div>

          <div style="height:1px;width:100%;background-color:#5A5A5A; margin-top:20px; margin-bottom:20px;"></div>
        <h3>Login details: It Rains App<h3>
        <h4>Username: ${data.email}<h4>
        <h4>Password: ${data.id.substring(0, 6)}<h4>
        </div>`,
      // eslint-disable-next-line max-len
      }).then((res)=>console.log("successfully sent that mail")).catch((err)=>console.log(err));
    });
