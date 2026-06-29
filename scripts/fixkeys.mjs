import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function rndKey() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
}

function addKeys(value) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === "object") {
        const fixed = {};
        for (const k of Object.keys(item)) fixed[k] = addKeys(item[k]);
        if (!fixed._key) fixed._key = rndKey();
        return fixed;
      }
      return item;
    });
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value)) out[k] = addKeys(value[k]);
    return out;
  }
  return value;
}

const types = ["siteSettings","homePage","page","project","teamMember","pillar","methodologyStep","stat"];
const docs = await client.fetch("*[_type in $types]", { types });
const tx = client.transaction();
for (const d of docs) tx.createOrReplace(addKeys(d));
await tx.commit();
console.log("Listo: keys arregladas en " + docs.length + " documentos.");
