// import { NoAuth } from '@decorators/no.auth.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    // @NoAuth()
    @Post('sendCode')
    async sendEmailCode(@Body() data) {
        
        return this.emailService.sendEmailCode(data);
    }
}