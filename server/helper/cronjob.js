var CronJob = require('cron').CronJob
var kue = require('kue')
    , queue = kue.createQueue()
const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = {
  createCronJob: (user)=>{
    console.log(user.createdAt);
    var createAt = user.createdAt;
    var second = createAt.getSeconds()
    var minute = createAt.getMinutes()+1
    var hours = createAt.getHours()
    var date = createAt.getDate()
    var month = create.getMonth()

    new CronJob(`${second} ${minute} ${hours} ${date} ${month} *`, function(){
      console.log('You will see this every minutes');
      var job = queue.create('email', {
        title: `Welcome to My WebApp`,
        to: user.email,
        message: `Hi ${user.name}, If you receive this email, because you have registration on My WebApp,
        Thank You for your time and enjoy my WebApp`
      }).save((err)=>{
        if(!err){
          console.log(`cronjob success`);
        } else {
          console.log(err);
        }
      })

      queue.process('email', function(job, done){
        email(job.data, done);
      });

      function email(job, done){
        console.log(job.to);
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
          }
        });

        let mailOptions = {
          from: '"News team 👻" <derikurniawan11d88@gmail.com>',
          to: job.to,
          subject: job.title,
          text: job,message,
        };
        transporter.sendMail(mailOptions, (err, info)=>{
          if(err){
            console.log(err)
            return err;
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
        });
        done();
      }
    }, null, true, 'Asia/Jakarta')

  }
}
