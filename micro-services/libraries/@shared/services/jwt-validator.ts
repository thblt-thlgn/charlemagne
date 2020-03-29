import * as jwt from 'jsonwebtoken';

export class JWTValidator {
  public jwtOptions = {
    issuer: 'Charlemagne',
    algorithm: 'RS256',
    audience: 'localhost',
    expiresIn: '5m',
  };

  constructor(public publicKey: string) {}

  verify(token: string) {
    return jwt.verify(token, this.publicKey, this.jwtOptions);
  }

  decode(token: string) {
    return jwt.decode(token, { complete: true });
  }
}
