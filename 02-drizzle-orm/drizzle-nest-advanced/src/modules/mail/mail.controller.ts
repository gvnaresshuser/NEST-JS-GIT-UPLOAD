import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('send')
  3(@Body() body) {
    return this.mailService.sendMail(body.to, body.subject, body.text);
  }
}
/*
✅ Step 1: Go to Google Account

Open 👉 https://myaccount.google.com

✅ Step 2: Enable 2-Step Verification (Required)
Go to Security
Find 2-Step Verification
Turn it ON (use phone OTP)

👉 Without this, App Password option won’t appear.

✅ Step 3: Open App Passwords
In Security
Click App passwords
✅ Step 4: Generate Password
Select app → Mail
Select device → Other (Custom name) → type Nodemailer
Click Generate
✅ Step 5: Copy the Password

You will get something like:

nlhv hyxq gqta qeiz

👉 Remove spaces and use in .env:

EMAIL=yourgmail@gmail.com
EMAIL_PASS=nlhvhyxqgqtaqeiz
*/