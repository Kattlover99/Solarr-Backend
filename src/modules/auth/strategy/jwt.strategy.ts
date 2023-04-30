import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from 'src/config/config.service';
import { AuthPayload } from 'src/modules/auth/interface/auth-payload.interface';

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret
    });
  }

  async validate(payload: AuthPayload) {
    return { id: payload.id, address: payload.address };
  }
}
