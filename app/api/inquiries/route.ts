import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  InquirySchema,
  checkRateLimit,
  maskIpAddress,
  safeErrorResponse,
  safeSuccessResponse,
} from "@/lib/security";

export const dynamic = "force-dynamic";

const TARGET_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6289501485483";

export async function POST(request: NextRequest) {
  try {
    // 1. Extract Client IP & Security Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const remoteIp = forwardedFor || realIp || "127.0.0.1";
    const clientIpIdentifier = remoteIp.split(",")[0].trim();

    // Rate Limit: Max 15 inquiries per 60s per client IP
    const rateLimit = checkRateLimit(clientIpIdentifier, 15, 60 * 1000);
    if (!rateLimit.allowed) {
      const response = safeErrorResponse(
        "Terlalu banyak permintaan. Mohon tunggu beberapa saat sebelum mencoba lagi.",
        429
      );
      response.headers.set("Retry-After", Math.ceil(rateLimit.resetTimeMs / 1000).toString());
      return response;
    }

    // 2. Parse & Validate Payload with Zod
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return safeErrorResponse("Format payload JSON tidak valid", 400);
    }

    const parseResult = InquirySchema.safeParse(body);
    if (!parseResult.success) {
      return safeErrorResponse(
        "Data formulir pesanan tidak valid",
        400,
        parseResult.error.flatten().fieldErrors
      );
    }

    const { productId, variantId, productName, variantDuration, price, accountType } =
      parseResult.data;

    // 3. Privacy Masking on IP & Metadata
    const maskedIp = maskIpAddress(clientIpIdentifier);
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const referrer = request.headers.get("referer") || "Direct";

    // 4. Save to Database via Prisma ORM
    let savedInquiryId = `inq-${Date.now()}`;
    try {
      const inquiry = await prisma.inquiry.create({
        data: {
          productId: productId || undefined,
          variantId: variantId || undefined,
          productName,
          variantDuration,
          price,
          accountType: accountType || undefined,
          maskedIp,
          userAgent: userAgent.slice(0, 255),
          referrer: referrer.slice(0, 255),
          status: "CLICKED_WA",
        },
      });
      savedInquiryId = inquiry.id;
    } catch (dbErr) {
      // Non-blocking: If DB write fails, don't block customer from reaching WhatsApp
      console.warn("Could not log inquiry to database:", dbErr);
    }

    // 5. Generate formatted WhatsApp direct URL
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

    const nowStr = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const waMessage = [
      `Halo Kak Admin *Penelove Pricelist*! 💖✨`,
      ``,
      `Saya mau order aplikasi premium berikut:`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📦 *Aplikasi:* ${productName}`,
      `⏱️ *Durasi:* ${variantDuration}`,
      ...(accountType ? [`🏷️ *Tipe:* ${accountType}`] : []),
      `💰 *Harga:* ${formattedPrice}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `⏰ _Waktu Order: ${nowStr} WIB_`,
      `🆔 _Ref: ${savedInquiryId.slice(-6).toUpperCase()}_`,
      ``,
      `Apakah stok akun masih ready? Mohon info metode pembayarannya ya kak. Terima kasih! 🙏🌸`,
    ].join("\n");

    const waUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    return safeSuccessResponse(
      {
        inquiryId: savedInquiryId,
        whatsappUrl: waUrl,
        targetPhone: TARGET_WHATSAPP_NUMBER,
        formattedPrice,
        summary: {
          productName,
          variantDuration,
          price,
          accountType,
        },
      },
      "Inquiry berhasil diproses"
    );
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return safeErrorResponse("Terjadi kesalahan pada sistem pemesanan", 500);
  }
}
