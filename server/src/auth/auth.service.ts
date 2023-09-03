import { BadRequestException, ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/orm/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/jwt.strategy';
import { VerifyDto } from './dto/verify.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotDto } from './dto/forgot.dto';
import { isEmail } from 'class-validator';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService) {

    }
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(
        providedPassword: string,
        storedPasswordHash: string,
    ): Promise<boolean> {
        return await bcrypt.compare(providedPassword, storedPasswordHash);
    }

    async verifyUser(verifyDto: VerifyDto) {
        const { token, password } = verifyDto;
        const value = await this.jwtService.decodeToken(token);

        if (value) {
            const { type, email } = value;

            if (type === 'newUser') {
                await this.userRepository.update({ email }, { verified: true });
                return {
                    status: HttpStatus.OK,
                    message: 'User verified successfully.'
                };
            } else if (type === 'resetPassword') {
                if (password) {
                    const hashedPassword = await this.hashPassword(password);
                    await this.userRepository.update({ email }, { password: hashedPassword });
                    return {
                        status: HttpStatus.OK,
                        message: 'Password updated successfully.'
                    };
                } else {
                    throw new BadRequestException({ message: 'Invalid request: Missing password for password update.' })
                }
            } else {
                throw new BadRequestException({ message: 'Bad Token' })
            }
        } else {
            throw new UnauthorizedException("Invalid Token");
        }
    }

    async createUser(signUpDto: SignUpDto) {
        if (signUpDto.password.length < 8) {
            throw new BadRequestException({
                message: {
                    password: 'Password must be atleast 8 characters'
                }
            })
        } else {
            signUpDto.password = await this.hashPassword(signUpDto.password);
            try {
                const newUser = this.userRepository.create(signUpDto);
                const savedUser = await this.userRepository.save(newUser);
                const token = this.jwtService.generateToken({ email: savedUser.email, type: "newUser", random: Math.random(), time: '1m' });
                return {
                    message: { token: token },
                    status: HttpStatus.CREATED
                }
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    if (error.message.includes(signUpDto.mobileNo)) {
                        throw new ConflictException({
                            message: {
                                mobileNo: 'Mobile number already exists'
                            }
                        });
                    } else if (error.message.includes(signUpDto.email)) {
                        throw new ConflictException({
                            message: {
                                email: 'Email address already exists'
                            }
                        });
                    }
                } else {
                    throw new InternalServerErrorException({
                        message: 'Error creating user'
                    });
                }
            }
        }

    }

    async signInUser(signInDto: SignInDto) {
        try {
            const { id, password } = signInDto;
            let user: User;
            if (isEmail(id)) {
                user = await this.userRepository.findOne({
                    where: {
                        email: id,
                        verified: true
                    }
                })
                if (!user) {
                    throw new NotFoundException({
                        message: {
                            id: "Sorry! This email is not registered."
                        }
                    })
                }
            } else {
                user = await this.userRepository.findOne({
                    where: {
                        mobileNo: id,
                        verified: true
                    }
                })
                if (!user) {
                    throw new NotFoundException({
                        message: {
                            id: "Sorry! This mobile number is not registered."
                        }
                    })
                }
            }
            try {
                const checkPasssword = await this.comparePasswords(password, user.password);
                if (checkPasssword) {
                    const token = this.jwtService.generateToken({ fname: user.fname, lname: user.lname, type: "session", random: Math.random(), time: '1m' });
                    return {
                        message: { token: token },
                        status: HttpStatus.OK
                    };
                } else {
                    throw new UnauthorizedException({
                        message: {
                            password: 'Sorry! Password entered is incorrect'
                        }
                    });
                }
            } catch (e) {
                throw e;
            }
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword(forgotDto: ForgotDto) {
        const { email } = forgotDto;
        const user = await this.userRepository.exist({ where: { email } });
        if (user) {
            const token = this.jwtService.generateToken(
                { email: email, type: "resetPassword", random: Math.random(), time: '1m' }
            );
            return {
                message: { token: token },
                status: HttpStatus.OK
            }
        } else {
            throw new NotFoundException({ message: {
                email: "Sorry! This email is not registered"
            } })
        }
    }
}
