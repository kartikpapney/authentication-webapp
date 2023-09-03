import {IsNotEmpty } from 'class-validator';
export class ResetDto {
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    token: string;
}  