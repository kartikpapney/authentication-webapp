import {IsNotEmpty } from 'class-validator';

export class VerifyDto {
    password: string;
    @IsNotEmpty()
    token: string;
}  