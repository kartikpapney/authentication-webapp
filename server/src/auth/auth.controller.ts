import { Controller, Post, Get, Body, Inject, Param, Put, HttpCode } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';
import { AuthService } from './auth.service';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService)
    {}

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.createUser(signUpDto);
    }

    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signInUser(signInDto);
    }

    @Post('forgot')
    @HttpCode(200)
    async forgot(@Body() forgotDto: ForgotDto) {
        return await this.authService.forgotPassword(forgotDto);
    }

    @Put('verify')
    async verify(@Body() verifyDto: VerifyDto) {
        const result = await this.authService.verifyUser(verifyDto);
        return result;
    }   
}