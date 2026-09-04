async function test() {
  console.log("🔍 Testing GET /api/products...");
  const getRes = await fetch("http://localhost:3000/api/products");
  const getData = await getRes.json();
  console.log("✅ Products status:", getRes.status);
  console.log("✅ Total products:", getData.data?.total);
  console.log("✅ Categories:", getData.data?.categories?.map((c) => c.name));
  console.log("✅ Sample product 1:", getData.data?.products[0]?.name);
  console.log("✅ Sample product 1 variants:", getData.data?.products[0]?.variants?.map((v) => `${v.duration} (Rp ${v.price})`));

  console.log("\n🔍 Testing POST /api/inquiries (Valid payload)...");
  const postRes = await fetch("http://localhost:3000/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: "prod-claude",
      variantId: "v-claude-1m-sh",
      productName: "Claude AI Pro",
      variantDuration: "1 Bulan",
      price: 65000,
      accountType: "Sharing Hemat",
    }),
  });
  const postData = await postRes.json();
  console.log("✅ Inquiry status:", postRes.status);
  console.log("✅ Success:", postData.success);
  console.log("✅ WhatsApp URL:", postData.data?.whatsappUrl);

  console.log("\n🔍 Testing POST /api/inquiries (Invalid payload - Zod rejection)...");
  const badRes = await fetch("http://localhost:3000/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productName: "",
      variantDuration: "",
      price: -50,
    }),
  });
  const badData = await badRes.json();
  console.log("✅ Invalid payload status:", badRes.status, "(Expected 400)");
  console.log("✅ Safe error response:", badData.error);
}

test().catch(console.error);
