import { registerAs } from '@nestjs/config';

export default registerAs('agent', () => ({
  registrationSecret:
    process.env.AGENT_REGISTRATION_SECRET ?? process.env.JWT_SECRET!,
  tokenSecret: process.env.AGENT_JWT_SECRET ?? process.env.JWT_SECRET!,
  tokenExpiresIn: process.env.AGENT_JWT_EXPIRES_IN ?? '15m',
}));

export interface AgentConfig {
  registrationSecret: string;
  tokenSecret: string;
  tokenExpiresIn: string;
}
