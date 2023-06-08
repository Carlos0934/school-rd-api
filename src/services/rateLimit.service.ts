import { KvRepository, RateLimitEntry } from "../types.ts";

export class RateLimitService {
  private readonly MAX_REQUESTS_PER_MINUTE = 100;
  constructor(
    private readonly rateLimitEntryRepository: KvRepository<RateLimitEntry>
  ) {}

  async consume(ip: string): Promise<boolean> {
    const entry = await this.getRateLimitEntry(ip);

    if (!entry) {
      await this.createRateLimitEntry(ip);
      return true;
    }

    const { requests, timestamp } = entry;
    const now = Date.now();

    const isExpired = now - timestamp > 60 * 1000;

    if (requests >= this.MAX_REQUESTS_PER_MINUTE && isExpired) {
      await this.updateRateLimitEntry(ip, 1, now);
      return true;
    }

    if (requests >= this.MAX_REQUESTS_PER_MINUTE && !isExpired) {
      return false;
    }

    await this.updateRateLimitEntry(ip, requests + 1, timestamp);
    return true;
  }

  private async getRateLimitEntry(
    ip: string
  ): Promise<RateLimitEntry | undefined> {
    return await this.rateLimitEntryRepository.get(ip);
  }

  private async createRateLimitEntry(ip: string): Promise<void> {
    const key = {
      id: ip,
    };
    const entry: RateLimitEntry = {
      id: ip,
      requests: 1,
      timestamp: Date.now(),
    };

    await this.rateLimitEntryRepository.set(key, entry);
  }

  private async updateRateLimitEntry(
    ip: string,
    requests: number,
    timestamp: number
  ): Promise<void> {
    const key = {
      id: ip,
    };

    const entry: RateLimitEntry = {
      id: ip,
      requests,
      timestamp,
    };

    await this.rateLimitEntryRepository.set(key, entry);
  }
}
