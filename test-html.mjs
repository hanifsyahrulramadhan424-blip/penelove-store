async function testHtml() {
  const res = await fetch("http://localhost:3000");
  const html = await res.text();
  console.log("Status:", res.status);
  console.log("HTML length:", html.length);
  console.log("Has 'Penelove Pricelist':", html.includes("Penelove"));
  console.log("Has 'AI &amp; Productivity' or 'AI & Productivity':", html.includes("AI &") || html.includes("AI &amp;"));
  console.log("Has 'Netflix':", html.includes("Netflix"));
  console.log("Has 'Pesan via WhatsApp':", html.includes("Pesan via WhatsApp") || html.includes("Pricelist"));
  console.log("Has Security Headers:");
  for (const [key, value] of res.headers.entries()) {
    if (key.toLowerCase().includes("x-") || key.toLowerCase().includes("strict") || key.toLowerCase().includes("referrer")) {
      console.log(`  ${key}: ${value}`);
    }
  }
}

testHtml().catch(console.error);
