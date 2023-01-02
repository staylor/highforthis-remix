import type { Express } from 'express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default function addPassport(app: Express) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          (req) => {
            let token = null;
            if (req && req.cookies && process.env.TOKEN_KEY) {
              token = req.cookies[process.env.TOKEN_KEY];
            }
            return token;
          },
        ]),
        secretOrKey: process.env.TOKEN_SECRET,
      },
      (jwtPayload, done) => {
        console.log('jwtPayload', jwtPayload);
        if (!jwtPayload.userId) {
          done(new Error('No userId in JWT'), false);
        } else {
          done(null, jwtPayload);
        }
      }
    )
  );

  app.use(passport.initialize());
}
