import {IsNotEmpty } from 'class-validator';
import isEitherEmailOrMobileNo from './sign-in-custom-validator'
export class SignInDto {
    @isEitherEmailOrMobileNo()
    id: string;
    @IsNotEmpty()
    password: string;
}  