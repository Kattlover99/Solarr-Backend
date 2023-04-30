import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { JsonWebTokenStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.jwtSecret,
          signOptions: { expiresIn: config.jwtExpiry }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [JsonWebTokenStrategy],
  exports: [JwtModule]
})
export class AuthModule {}
