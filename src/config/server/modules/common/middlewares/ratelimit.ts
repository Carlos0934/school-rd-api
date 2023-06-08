import { MiddlewareHandler } from "hono";
import { RateLimitEntry } from "../../../../../types.ts";
import { RateLimitService } from "../../../../../services/rateLimit.service.ts";
import { DynamoDbRepository } from "../../../../../infrastructure/dynamodbRepository.ts";

const kvRepository = new DynamoDbRepository<RateLimitEntry>("rate-limits");
export const rateLimitService = new RateLimitService(kvRepository);

export const rateLimitMiddleware: MiddlewareHandler = async (ctx, next) => {
  const remoteAddr: Deno.NetAddr = ctx.env.remoteAddr;

  const ip = remoteAddr.hostname;

  const isAllowed = await rateLimitService.consume(ip);

  if (!isAllowed) return ctx.json({ message: "Too many requests" }, 429);

  return next();
};
