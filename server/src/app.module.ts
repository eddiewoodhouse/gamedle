import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { SessionService } from './games/session.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'dist', 'gamedle', 'browser'),
    }),
  ],
  controllers: [GamesController],
  providers: [GamesService, SessionService],
})
export class AppModule {}
