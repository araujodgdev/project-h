import nodemailer from 'nodemailer'

export class MailService {
    private nm: typeof nodemailer;
    private transporter: any;

    public constructor() {
        this.nm = nodemailer;
        this.transporter = this.nm.createTransport({
            service: 'gmail',
            auth: {
                user: 'araujodgdev@gmail.com',
                pass: 'vvfo twcl akxi fxns'
            }
        });
    }


    public async sendVerificationCode(mailOptions: {from: string, to: string, subject: string, text: string}): Promise<string> {
        try {
            await this.transporter.sendMail(mailOptions);
            return 'OK'
        } catch (error) {
            console.log(error)
            return 'ERROR'
        }
    }
    
}