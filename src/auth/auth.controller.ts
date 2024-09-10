import { Body, Request, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  connecter(@Body() body: Record<string, any>) {
    return this.authService.connecter(body.pseudo, body.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
