// Simple in-memory submission guard for idempotency and rate limiting.
// Note: This is per-process memory; for serverless/scale, use a shared store (Redis).

type SubmissionRecord = { timestamp: number };
type RateRecord = { count: number; resetAt: number };

const submissionMap: Map<string, SubmissionRecord> = new Map();
const rateMap: Map<string, RateRecord> = new Map();

const DEFAULT_IDEMPOTENCY_TTL_MS = 5 * 60 * 1000; // 5 minutes
const DEFAULT_RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const DEFAULT_RATE_LIMIT = 5; // max 5 submissions per window

export function isDuplicateSubmission(
  submissionId: string,
  ttlMs = DEFAULT_IDEMPOTENCY_TTL_MS
): boolean {
  const rec = submissionMap.get(submissionId);
  if (!rec) return false;
  const now = Date.now();
  if (now - rec.timestamp <= ttlMs) return true;
  submissionMap.delete(submissionId);
  return false;
}

export function markSubmission(submissionId: string): void {
  submissionMap.set(submissionId, { timestamp: Date.now() });
}

export function isRateLimited(
  key: string,
  limit = DEFAULT_RATE_LIMIT,
  windowMs = DEFAULT_RATE_WINDOW_MS
): boolean {
  const now = Date.now();
  const rec = rateMap.get(key);
  if (!rec) return false;
  if (now > rec.resetAt) {
    // window expired
    rateMap.delete(key);
    return false;
  }
  return rec.count >= limit;
}

export function recordAttempt(
  key: string,
  windowMs = DEFAULT_RATE_WINDOW_MS
): RateRecord {
  const now = Date.now();
  const rec = rateMap.get(key);
  if (!rec || now > rec.resetAt) {
    const newRec: RateRecord = { count: 1, resetAt: now + windowMs };
    rateMap.set(key, newRec);
    return newRec;
  }
  rec.count += 1;
  return rec;
}

export function getClientKeyFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for") || headers.get("X-Forwarded-For");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (ip) return ip;
  }
  const ua = headers.get("user-agent") || headers.get("User-Agent") || "unknown";
  return `ua:${ua}`; // fallback if IP isn't available
}

export const GuardDefaults = {
  IDEMPOTENCY_TTL_MS: DEFAULT_IDEMPOTENCY_TTL_MS,
  RATE_WINDOW_MS: DEFAULT_RATE_WINDOW_MS,
  RATE_LIMIT: DEFAULT_RATE_LIMIT,
};