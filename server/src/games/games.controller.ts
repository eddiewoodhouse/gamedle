import {
  BadRequestException,
  ConflictException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { GamesService } from './games.service';
import { MAX_GUESSES_PER_GAME, SessionService } from './session.service';
import { scoreGuess } from './guess-scoring';

const SESSION_COOKIE = 'gamedle_session';
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

@Controller('api')
export class GamesController {
  constructor(
    private readonly games: GamesService,
    private readonly sessions: SessionService
  ) {}

  @Get('games/search')
  search(@Query('q') q = '') {
    return this.games.search(q);
  }

  @Post('game/new')
  newGame(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const previous = this.sessions.get(req.cookies?.[SESSION_COOKIE]);
    const answer = this.games.pickRandom(previous?.answerId);
    const { sessionId } = this.sessions.create(answer.id);
    res.cookie(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_MS,
    });
    return {
      maxGuesses: MAX_GUESSES_PER_GAME,
      guessesRemaining: MAX_GUESSES_PER_GAME,
    };
  }

  @Post('game/guess')
  guess(@Body('gameId') gameId: number, @Req() req: Request) {
    const sessionId = req.cookies?.[SESSION_COOKIE];
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new BadRequestException('No active game. Start a new game first.');
    }
    if (session.isOver) {
      throw new BadRequestException('Game is already over. Start a new game.');
    }

    const guessedGame = this.games.findById(Number(gameId));
    if (!guessedGame) {
      throw new BadRequestException('Unknown game.');
    }
    if (session.guessedIds.includes(guessedGame.id)) {
      throw new ConflictException('You already guessed this game.');
    }

    const answer = this.games.findById(session.answerId)!;
    const comparison = scoreGuess(guessedGame, answer);
    const isCorrect = guessedGame.id === answer.id;

    session.guessedIds.push(guessedGame.id);
    session.guessesRemaining -= 1;
    session.won = isCorrect;
    session.isOver = isCorrect || session.guessesRemaining <= 0;

    return {
      guess: guessedGame,
      comparison,
      isCorrect,
      guessesRemaining: session.guessesRemaining,
      isGameOver: session.isOver,
      answer: session.isOver ? answer : undefined,
    };
  }
}
