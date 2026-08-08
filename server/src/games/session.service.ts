import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface GameSession {
  answerId: number;
  guessedIds: number[];
  guessesRemaining: number;
  isOver: boolean;
  won: boolean;
  lastActivity: number;
}

export const MAX_GUESSES_PER_GAME = 8;
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class SessionService {
  private readonly sessions = new Map<string, GameSession>();

  constructor() {
    setInterval(() => this.sweepExpired(), 60 * 60 * 1000).unref();
  }

  create(answerId: number): { sessionId: string; session: GameSession } {
    const sessionId = randomUUID();
    const session: GameSession = {
      answerId,
      guessedIds: [],
      guessesRemaining: MAX_GUESSES_PER_GAME,
      isOver: false,
      won: false,
      lastActivity: Date.now(),
    };
    this.sessions.set(sessionId, session);
    return { sessionId, session };
  }

  get(sessionId: string | undefined): GameSession | undefined {
    if (!sessionId) return undefined;
    const session = this.sessions.get(sessionId);
    if (session) session.lastActivity = Date.now();
    return session;
  }

  private sweepExpired(): void {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      if (now - session.lastActivity > SESSION_TTL_MS) {
        this.sessions.delete(id);
      }
    }
  }
}
