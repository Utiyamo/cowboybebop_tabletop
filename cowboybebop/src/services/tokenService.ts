import { TokenPayload, TokenResult } from "@/entities/types/token";
import { ApplicationProps } from "@/entities/applicationProps";

export class TokenService {
  private secret: string | null = null;
  private ttlSeconds: number | null = null;
  private cryptoKey: CryptoKey | null = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  /** Construtor vazio para deferred initialization */
  constructor() {}

  /**
   * Inicializa o gerador com a chave secreta e TTL.
   * @param secret - Chave HMAC (mínimo 16 caracteres)
   * @param ttlMinutes - Validade em minutos (padrão: 60)
   */
  async init(secret: string, ttlMinutes: number = 60): Promise<void> {
    if (this.initialized) return; // Idempotente
    
    if (!this.initPromise) {
      this.initPromise = this._loadCredentials(secret, ttlMinutes);
    }
    await this.initPromise;
  }

  private async _loadCredentials(secret: string, ttlMinutes: number): Promise<void> {
    if (!secret || secret.length < 16) {
      throw new Error('Secret must be at least 16 characters for security');
    }

    this.secret = secret;
    this.ttlSeconds = ttlMinutes * 60;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(this.secret);

    this.cryptoKey = await globalThis.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify']
    );

    this.initialized = true;
  }

  /** Garante que init() foi chamado antes de qualquer operação */
  private async ensureReady(): Promise<void> {
    if (!this.initialized) {
      throw new Error('TokenGenerator not initialized. Call .init(secret, ttlMinutes) first.');
    }
  }

  async generate(userId: string): Promise<TokenResult> {
    await this.ensureReady();
    const now = Math.floor(Date.now() / 1000);
    const payload: TokenPayload = {
      userId,
      issuedAt: now,
      expiresAt: now + this.ttlSeconds!,
    };

    const payloadB64 = this.toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
    const signature = await globalThis.crypto.subtle.sign(
      'HMAC',
      this.cryptoKey!,
      new TextEncoder().encode(payloadB64)
    );

    return {
      token: `${payloadB64}.${this.toBase64Url(signature)}`,
      payload,
    };
  }

  async validate(token: string): Promise<TokenPayload | null> {
    try {
      await this.ensureReady();
      const [payloadB64, providedSig] = token.split('.');
      if (!payloadB64 || !providedSig) return null;

      const expectedSigBuffer = await globalThis.crypto.subtle.sign(
        'HMAC',
        this.cryptoKey!,
        new TextEncoder().encode(payloadB64)
      );
      const expectedSig = this.toBase64Url(expectedSigBuffer);

      if (!this.constantTimeCompare(providedSig, expectedSig)) return null;

      const payload: TokenPayload = JSON.parse(
        new TextDecoder().decode(new Uint8Array(this.fromBase64Url(payloadB64)))
      );

      if (!payload.userId || !payload.issuedAt || !payload.expiresAt) return null;
      if (Math.floor(Date.now() / 1000) > payload.expiresAt) return null;

      return payload;
    } catch {
      return null; // Fail-safe
    }
  }

  async isExpiringSoon(token: string, thresholdMinutes = 10): Promise<boolean> {
    const payload = await this.validate(token);
    return !!payload && (payload.expiresAt - Math.floor(Date.now() / 1000)) <= thresholdMinutes * 60;
  }

  // 🔽 Utilitários internos (URL-safe Base64)
  private toBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return globalThis.btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private fromBase64Url(base64url: string): ArrayBuffer {
    let b64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    if (pad) b64 += '='.repeat(4 - pad);
    const bin = globalThis.atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }

  private constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let res = 0;
    for (let i = 0; i < a.length; i++) res |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return res === 0;
  }

  /** Gera secret seguro (apenas para setup/dev) */
  static generateSecret(bytes = 32): string {
    if (!globalThis.crypto?.getRandomValues) {
      throw new Error('Web Crypto API unavailable in this environment');
    }
    const arr = new Uint8Array(bytes);
    globalThis.crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /** Factory para inicialização imediata e segura */
  static async create(secret: string, ttlMinutes = 60): Promise<TokenService> {
    const instance = new TokenService();
    await instance.init(secret, ttlMinutes);
    return instance;
  }
}

const tokenService = new TokenService();
export default tokenService;