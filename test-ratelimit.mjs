async function testRateLimit() {
  console.log("🔍 Testing Rate Limiting on POST /api/inquiries (18 rapid requests)...");
  let rejectedCount = 0;
  let successCount = 0;

  for (let i = 0; i < 18; i++) {
    const res = await fetch("http://localhost:3000/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: "prod-netflix",
        variantId: "v-nf-1m-1p",
        productName: "Netflix Premium 4K UHD",
        variantDuration: "1 Bulan",
        price: 28000,
      }),
    });

    if (res.status === 429) {
      rejectedCount++;
      const data = await res.json();
      console.log(`🔒 Request #${i + 1} blocked by Rate Limiter: status 429, retry-after: ${res.headers.get("retry-after")}s, message: "${data.error}"`);
    } else if (res.status === 200) {
      successCount++;
    }
  }

  console.log(`\n📊 Result: ${successCount} allowed, ${rejectedCount} blocked by Rate Limiter.`);
  if (rejectedCount > 0) {
    console.log("✅ Rate Limiter is strictly protecting the endpoint!");
  } else {
    console.log("⚠️ No requests blocked.");
  }
}

testRateLimit().catch(console.error);
