import { z } from "zod";
import { NextResponse } from "next/server";

// ==========================================
// 1. ZOD VALIDATION SCHEMAS
// ==========================================

export const InquirySchema = z.object({
  productId: z.string().max(100).optional().nullable(),
  variantId: z.string().max(100).optional().nullable(),
  productName: z
    .string()
    .min(1, "Nama produk wajib diisi")
    .max(100, "Nama produk terlalu panjang")
    .trim(),
  variantDuration: z
    .string()
    .min(1, "Durasi varian wajib diisi")
    .max(50, "Durasi varian terlalu panjang")
    .trim(),
  price: z
    .number({ invalid_type_error: "Harga harus berupa angka" })
    .int("Harga harus bilangan bulat")
    .positive("Harga harus lebih besar dari 0")
    .max(10000000, "Harga melebihi batas wajar"),
  accountType: z.string().max(50).optional().nullable(),
});

export const ProductQuerySchema = z.object({
  category: z.string().max(50).optional(),
  search: z.string().max(100).optional(),
  sort: z.enum(["popular", "price-asc", "price-desc", "name-asc"]).optional().default("popular"),
});

// ==========================================
// 2. IP MASKING & DATA PRIVACY
// ==========================================

/**
 * Mask an IP address to preserve privacy in compliance with data privacy best practices.
 * IPv4 e.g. 192.168.1.45 -> 192.168.xxx.xxx
 * IPv6 e.g. 2001:db8:3333:4444:5555:6666:7777:8888 -> 2001:db8:****:****
 */
export function maskIpAddress(ip: string | null | undefined): string {
  if (!ip || ip.trim() === "" || ip === "::1" || ip === "127.0.0.1") {
    return "127.0.xxx.xxx";
  }

  // Clean proxy headers list (take first client IP)
  const clientIp = ip.split(",")[0].trim();

  // IPv4 check
  if (clientIp.includes(".")) {
    const parts = clientIp.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
  }

  // IPv6 check
  if (clientIp.includes(":")) {
    const parts = clientIp.split(":");
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}:****:****`;
    }
  }

  return "anon.xxx.xxx";
}

// ==========================================
// 3. IN-MEMORY SLIDING-WINDOW RATE LIMITER
// ==========================================

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    const windowMs = 60 * 1000;
    rateLimitStore.forEach((record, key) => {
      record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
}

/**
 * Rate limit requests per client IP within a sliding window.
 * @param identifier Client IP or unique client identifier
 * @param maxRequests Maximum allowed requests in the window
 * @param windowMs Window duration in milliseconds (default: 60s)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 15,
  windowMs = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  let record = rateLimitStore.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Remove timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const resetTimeMs = Math.max(0, windowMs - (now - oldestTimestamp));
    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      resetTimeMs,
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    limit: maxRequests,
    remaining: maxRequests - record.timestamps.length,
    resetTimeMs: windowMs,
  };
}

// ==========================================
// 4. SAFE ERROR RESPONDER (NO STACK TRACE LEAKS)
// ==========================================

export function safeErrorResponse(
  message: string,
  statusCode = 500,
  details?: unknown
) {
  // In production, never expose internal database errors or stack traces
  const payload: { success: false; error: string; details?: unknown } = {
    success: false,
    error: message,
  };

  if (process.env.NODE_ENV === "development" && details) {
    payload.details = details;
  }

  return NextResponse.json(payload, { status: statusCode });
}

export function safeSuccessResponse<T>(data: T, message?: string, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
}
