const nodemailer = require("nodemailer");


exports.finduserdetail = (req, res) => {
    // const name = req.body.name;
    // const email = req.body.email;
    // const message = req.body.message;
    const mail = {
        from: "sureshkumara6868@gmail.com",
        to: "sureshkumar.cricnote@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: jkkkkk</p>
             <p>Email: jkkjl</p>
             <p>Message:bjjj</p>`,
    };


    var smtpConfig = {

        service:"gmail",
        auth: {
           
            user: "sureshkumara6868@gmail.com",
            pass: "sureshkumara7388",
        }
        
    }
    const contactEmail = nodemailer.createTransport(smtpConfig);

    contactEmail.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Ready to Send");
        }
    });


    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
}
