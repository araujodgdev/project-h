import { genTemporaryCode } from "../lib/utils";
import RedisClient from "../redis/Redis";
import { MailService } from "./Mail.service";

export class AuthService {
    private mailService: MailService;

    public constructor() {
        this.mailService = new MailService();
    }

    public async sendVerificationCode(email: string): Promise<void> {
        const randomCode = genTemporaryCode();
        const hashCode = await Bun.password.hash(randomCode, {
            algorithm: 'bcrypt'
        })
        const mailOptions = {
            from: 'araujodgdev@gmail.com',
            to: email,
            subject: 'Seu código de login - Project H',
            text: `Olá, seu código único de login é ${randomCode}`
        }
        const result = await this.mailService.sendVerificationCode(mailOptions);

        if (result === 'OK') {
            const redis = await RedisClient.getInstance();
            const key = `login_code:${email}`;
            await redis.set(key, hashCode, {
                EX: 300, // Expira em 5 minutos
            });

        } else {
            throw new Error('Erro ao enviar código de verificação');
        }
    }

}