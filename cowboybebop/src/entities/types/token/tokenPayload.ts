export interface TokenPayload {
  userId: string;
  issuedAt: number; // Unix timestamp em segundos
  expiresAt: number; // Unix timestamp em segundos
}
