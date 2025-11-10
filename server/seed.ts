import { db } from "./db";
import { niches, websites } from "@shared/schema";

const nicheData = [
  {
    slug: "photography",
    number: "01",
    title: "Photography Websites",
    description: "Photography portfolios need stunning visuals and elegant galleries. These examples showcase photographers who've mastered clean layouts and seamless user experiences.",
    order: 1,
  },
  {
    slug: "roofing",
    number: "02",
    title: "Roofing & Contractors",
    description: "Roofing sites must build trust and convert visitors. These examples show professional designs with strong calls-to-action and credibility.",
    order: 2,
  },
  {
    slug: "realestate",
    number: "03",
    title: "Real Estate",
    description: "Real estate sites balance aesthetics with functionality. These examples show intuitive property search and compelling agent branding.",
    order: 3,
  },
  {
    slug: "coaching",
    number: "04",
    title: "Coaching & Personal Development",
    description: "Coaching websites inspire and connect. These examples showcase authentic storytelling and emotional engagement.",
    order: 4,
  },
];

const websiteData = [
  { nicheSlug: "photography", name: "Wiven Studio", url: "https://wiven-128.webflow.io/", order: 1 },
  { nicheSlug: "photography", name: "Ariana Jordan", url: "https://www.arianajordan.com/", order: 2 },
  { nicheSlug: "photography", name: "Matt Porteous", url: "https://www.mattporteous.co.uk/", order: 3 },
  { nicheSlug: "photography", name: "Jennifer Perkins", url: "https://www.jenniferperkins.co/", order: 4 },
  { nicheSlug: "photography", name: "Lara Jade", url: "https://www.larajade.com/", order: 5 },
  { nicheSlug: "photography", name: "Sanz Lena", url: "https://www.sanzlena.com/", order: 6 },
  
  { nicheSlug: "roofing", name: "Brady Roofing", url: "https://www.bradyroofing.com/", order: 1 },
  { nicheSlug: "roofing", name: "Newman Roofing", url: "https://newmanroofing.com/", order: 2 },
  { nicheSlug: "roofing", name: "Voyager Exteriors", url: "https://voyagerexteriors.com/", order: 3 },
  { nicheSlug: "roofing", name: "Good Roofing Company", url: "https://www.goodroofingcompany.com/", order: 4 },
  { nicheSlug: "roofing", name: "Heritage Roofing", url: "https://www.heritageroofing.com/portfolio", order: 5 },
  { nicheSlug: "roofing", name: "D&L Roofing", url: "https://www.dandlroofing.com/", order: 6 },
  
  { nicheSlug: "realestate", name: "Luxury Presence", url: "https://www.luxurypresence.com/best-real-estate-agent-websites/", order: 1 },
  { nicheSlug: "realestate", name: "Jardine Estates", url: "https://jardineestates.co.uk/", order: 2 },
  { nicheSlug: "realestate", name: "Janet McAfee", url: "https://janetmcafee.com/", order: 3 },
  { nicheSlug: "realestate", name: "LL Estates", url: "http://llestates.co.uk/", order: 4 },
  { nicheSlug: "realestate", name: "Proprio Direct", url: "https://propriodirect.com/en/", order: 5 },
  
  { nicheSlug: "coaching", name: "Preston Smiles", url: "https://prestonsmiles.com/", order: 1 },
  { nicheSlug: "coaching", name: "Marie Forleo", url: "https://marieforleo.com/", order: 2 },
  { nicheSlug: "coaching", name: "Light Peak Coaching", url: "https://lightpeakcoaching.com/", order: 3 },
];

async function seed() {
  console.log("Starting database seed...");
  
  try {
    console.log("Inserting niches...");
    const insertedNiches = await db.insert(niches).values(nicheData).returning();
    console.log(`Inserted ${insertedNiches.length} niches`);
    
    const nicheMap = new Map(insertedNiches.map(n => [n.slug, n.id]));
    
    console.log("Inserting websites...");
    const websitesWithIds = websiteData.map(w => ({
      name: w.name,
      url: w.url,
      nicheId: nicheMap.get(w.nicheSlug)!,
      order: w.order,
    }));
    
    const insertedWebsites = await db.insert(websites).values(websitesWithIds).returning();
    console.log(`Inserted ${insertedWebsites.length} websites`);
    
    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed().then(() => {
  console.log("Seed script finished");
  process.exit(0);
}).catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
