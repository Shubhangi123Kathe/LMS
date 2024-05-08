const nodemailer=require("nodemailer");


module.exports.sendMail=async function (str, data){
    let transporter=nodemailer.createTransport({
        host: "smtp.gmail.com", 
        port: 587,
        secure: false,
        auth: {
            user: "sharmaniteshramchandra@gmail.com",
            pass: "qpyi tpun ztmo huhq"
        },
    })

    var Osubject, Ohtml;

    if(str=="signup"){
        Osubject=`Thankyou for creating an account at Qwings ${data.name}`;

        Ohtml=`
            <h1>Welcome to Qwings</h1>
            Hope you have a good time !
            Keep teaching, keep learning and keep enjoying what you do!
        `;
    }
    else if(str=="resetPassword"){
        Osubject=`Reset Password: `;
        Ohtml=`
            <h1>Qwings reset password link</h1>

            Here is your reset link: ${data.resetPasswordLink}
        `
    }
    else if(str=="accessRequest"){
        Osubject=`Do you want to give access to Mr/Ms ${data.name} having mail Id ${data.uEmail} requesting to be ${data.role}`;
        Ohtml=`
            <h1>Following will give permission to access account</h1>

            Here is your reset link: ${data.accessLink}
        `
    }

    let info=await transporter.sendMail({
        from: `"Qwings" <sharmaniteshramchandra@gmail.com>`,
        to: data.email,
        subject: Osubject,
        html: Ohtml
    })
}




