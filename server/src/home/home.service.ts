import { Body, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/orm/User';

@Injectable()
export class HomeService {
    
    async homePage(b: User) {
        return {
            message: `Welcome ${b.fname} ${b.lname}`,
            status: 200
        };
    }

}
