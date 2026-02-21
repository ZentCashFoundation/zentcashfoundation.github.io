document.addEventListener("DOMContentLoaded", function () {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zent Cash",
    "url": "https://www.zent.cash",
    "logo": "https://www.zent.cash/path-to-logo.png",
    "sameAs": [
      "https://twitter.com/ZentCash",
      "https://www.facebook.com/Zent-Cash-Foundation-108069958362688",
      "https://www.youtube.com/channel/UCRF0KXM-0UbovyGLpusYjVA",
      "https://t.me/zentcash_eng",
      "https://bitcointalk.org/index.php?topic=5112797.0",
      "https://www.reddit.com/r/ZentCash",
      "https://github.com/ZentCashFoundation",
      "https://discord.gg/3cNhReZ9wC"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Valencia",
      "postalCode": "46001",
      "addressCountry": "ES"
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(schemaData);

  document.body.appendChild(script);
});