import { Body, Request, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { Auth } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  connecter(@Body() auth: Auth) {
    return this.authService.connecter(auth.email, auth.password);
  }

  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}
