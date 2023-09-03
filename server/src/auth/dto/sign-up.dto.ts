import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';
export class SignUpDto {
    @IsNotEmpty()
    @MaxLength(15)
    fname: string;
    @MaxLength(15)
    lname: string;
    @MaxLength(320)
    @IsEmail()
    email: string;
    @MaxLength(15)
    @IsPhoneNumber()
    mobileNo: string;
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(8)
    password: string;
}  