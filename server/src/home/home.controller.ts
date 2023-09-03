import { Body, Controller, Get, Inject } from '@nestjs/common';
import { HomeService } from './home.service';
import { User } from 'src/orm/User';

@Controller('/')
export class HomeController {
    constructor(@Inject('HOME_SERVICE') private readonly homeService: HomeService)
    {}

    @Get('/')
    async home(@Body() b: User) {
        return await this.homeService.homePage(b);
    }
}
