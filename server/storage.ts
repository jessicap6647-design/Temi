import { 
  type User, 
  type InsertUser,
  type Niche,
  type InsertNiche,
  type Website,
  type InsertWebsite,
  type Submission,
  type InsertSubmission,
  type ContactSubmission,
  type InsertContactSubmission,
  users,
  niches,
  websites,
  submissions,
  contactSubmissions
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllNiches(): Promise<Niche[]>;
  getNicheById(id: number): Promise<Niche | undefined>;
  getNicheBySlug(slug: string): Promise<Niche | undefined>;
  createNiche(niche: InsertNiche): Promise<Niche>;
  updateNiche(id: number, niche: Partial<InsertNiche>): Promise<Niche | undefined>;
  deleteNiche(id: number): Promise<boolean>;
  
  getAllWebsites(): Promise<Website[]>;
  getWebsitesByNiche(nicheId: number): Promise<Website[]>;
  getWebsiteById(id: number): Promise<Website | undefined>;
  createWebsite(website: InsertWebsite): Promise<Website>;
  updateWebsite(id: number, website: Partial<InsertWebsite>): Promise<Website | undefined>;
  deleteWebsite(id: number): Promise<boolean>;
  
  getAllSubmissions(): Promise<Submission[]>;
  getSubmissionById(id: number): Promise<Submission | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmission(id: number, data: Partial<Submission>): Promise<Submission | undefined>;
  deleteSubmission(id: number): Promise<boolean>;
  
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionById(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(contactSubmission: InsertContactSubmission): Promise<ContactSubmission>;
}

class MemoryStorage implements IStorage {
  private contactSubmissions: ContactSubmission[] = [];
  private nextContactId = 1;
  
  private niches: Niche[] = [
    { id: 1, slug: "photography", number: "01", title: "Photography Websites", description: "Photography portfolios need stunning visuals and elegant galleries.", order: 1 },
    { id: 2, slug: "roofing", number: "02", title: "Roofing & Contractors", description: "Roofing sites must build trust and convert visitors.", order: 2 },
    { id: 3, slug: "realestate", number: "03", title: "Real Estate", description: "Real estate sites balance aesthetics with functionality.", order: 3 },
    { id: 4, slug: "coaching", number: "04", title: "Coaching & Personal Development", description: "Coaching websites inspire and connect.", order: 4 },
  ];
  
  private websites: Website[] = [
    { id: 1, name: "Wiven Studio", url: "https://wiven-128.webflow.io/", nicheId: 1, order: 1, screenshotUrl: null },
    { id: 2, name: "Ariana Jordan", url: "https://www.arianajordan.com/", nicheId: 1, order: 2, screenshotUrl: null },
    { id: 3, name: "Matt Porteous", url: "https://www.mattporteous.co.uk/", nicheId: 1, order: 3, screenshotUrl: null },
    { id: 4, name: "Jennifer Perkins", url: "https://www.jenniferperkins.co/", nicheId: 1, order: 4, screenshotUrl: null },
    { id: 5, name: "Lara Jade", url: "https://www.larajade.com/", nicheId: 1, order: 5, screenshotUrl: null },
    { id: 6, name: "Sanz Lena", url: "https://www.sanzlena.com/", nicheId: 1, order: 6, screenshotUrl: null },
    { id: 7, name: "Brady Roofing", url: "https://www.bradyroofing.com/", nicheId: 2, order: 1, screenshotUrl: null },
    { id: 8, name: "Newman Roofing", url: "https://newmanroofing.com/", nicheId: 2, order: 2, screenshotUrl: null },
    { id: 9, name: "Voyager Exteriors", url: "https://voyagerexteriors.com/", nicheId: 2, order: 3, screenshotUrl: null },
    { id: 10, name: "Good Roofing Company", url: "https://www.goodroofingcompany.com/", nicheId: 2, order: 4, screenshotUrl: null },
    { id: 11, name: "Heritage Roofing", url: "https://www.heritageroofing.com/portfolio", nicheId: 2, order: 5, screenshotUrl: null },
    { id: 12, name: "D&L Roofing", url: "https://www.dandlroofing.com/", nicheId: 2, order: 6, screenshotUrl: null },
    { id: 13, name: "Luxury Presence", url: "https://www.luxurypresence.com/best-real-estate-agent-websites/", nicheId: 3, order: 1, screenshotUrl: null },
    { id: 14, name: "Jardine Estates", url: "https://jardineestates.co.uk/", nicheId: 3, order: 2, screenshotUrl: null },
    { id: 15, name: "Janet McAfee", url: "https://janetmcafee.com/", nicheId: 3, order: 3, screenshotUrl: null },
    { id: 16, name: "LL Estates", url: "http://llestates.co.uk/", nicheId: 3, order: 4, screenshotUrl: null },
    { id: 17, name: "Proprio Direct", url: "https://propriodirect.com/en/", nicheId: 3, order: 5, screenshotUrl: null },
    { id: 18, name: "Preston Smiles", url: "https://prestonsmiles.com/", nicheId: 4, order: 1, screenshotUrl: null },
    { id: 19, name: "Marie Forleo", url: "https://marieforleo.com/", nicheId: 4, order: 2, screenshotUrl: null },
    { id: 20, name: "Light Peak Coaching", url: "https://lightpeakcoaching.com/", nicheId: 4, order: 3, screenshotUrl: null },
  ];

  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    throw new Error("User operations not supported in memory storage");
  }

  async getAllNiches(): Promise<Niche[]> {
    return this.niches;
  }

  async getNicheById(id: number): Promise<Niche | undefined> {
    return this.niches.find(n => n.id === id);
  }

  async getNicheBySlug(slug: string): Promise<Niche | undefined> {
    return this.niches.find(n => n.slug === slug);
  }

  async createNiche(niche: InsertNiche): Promise<Niche> {
    const newNiche: Niche = {
      id: this.niches.length + 1,
      ...niche,
      order: niche.order ?? 0,
    };
    this.niches.push(newNiche);
    return newNiche;
  }

  async updateNiche(id: number, niche: Partial<InsertNiche>): Promise<Niche | undefined> {
    const index = this.niches.findIndex(n => n.id === id);
    if (index === -1) return undefined;
    this.niches[index] = { ...this.niches[index], ...niche };
    return this.niches[index];
  }

  async deleteNiche(id: number): Promise<boolean> {
    const index = this.niches.findIndex(n => n.id === id);
    if (index === -1) return false;
    this.niches.splice(index, 1);
    return true;
  }

  async getAllWebsites(): Promise<Website[]> {
    return this.websites;
  }

  async getWebsitesByNiche(nicheId: number): Promise<Website[]> {
    return this.websites.filter(w => w.nicheId === nicheId);
  }

  async getWebsiteById(id: number): Promise<Website | undefined> {
    return this.websites.find(w => w.id === id);
  }

  async createWebsite(website: InsertWebsite): Promise<Website> {
    const newWebsite: Website = {
      id: this.websites.length + 1,
      ...website,
      order: website.order ?? 0,
      screenshotUrl: null,
    };
    this.websites.push(newWebsite);
    return newWebsite;
  }

  async updateWebsite(id: number, website: Partial<InsertWebsite>): Promise<Website | undefined> {
    const index = this.websites.findIndex(w => w.id === id);
    if (index === -1) return undefined;
    this.websites[index] = { ...this.websites[index], ...website };
    return this.websites[index];
  }

  async deleteWebsite(id: number): Promise<boolean> {
    const index = this.websites.findIndex(w => w.id === id);
    if (index === -1) return false;
    this.websites.splice(index, 1);
    return true;
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return [];
  }

  async getSubmissionById(id: number): Promise<Submission | undefined> {
    return undefined;
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    throw new Error("Submission operations not supported in memory storage");
  }

  async updateSubmission(id: number, data: Partial<Submission>): Promise<Submission | undefined> {
    throw new Error("Submission operations not supported in memory storage");
  }

  async deleteSubmission(id: number): Promise<boolean> {
    throw new Error("Submission operations not supported in memory storage");
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return this.contactSubmissions;
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.find(s => s.id === id);
  }

  async createContactSubmission(contactSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = {
      id: this.nextContactId++,
      ...contactSubmission,
      createdAt: new Date(),
    };
    this.contactSubmissions.push(newSubmission);
    return newSubmission;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllNiches(): Promise<Niche[]> {
    return db.select().from(niches).orderBy(niches.order);
  }

  async getNicheById(id: number): Promise<Niche | undefined> {
    const [niche] = await db.select().from(niches).where(eq(niches.id, id));
    return niche || undefined;
  }

  async getNicheBySlug(slug: string): Promise<Niche | undefined> {
    const [niche] = await db.select().from(niches).where(eq(niches.slug, slug));
    return niche || undefined;
  }

  async createNiche(niche: InsertNiche): Promise<Niche> {
    const [created] = await db.insert(niches).values(niche).returning();
    return created;
  }

  async updateNiche(id: number, niche: Partial<InsertNiche>): Promise<Niche | undefined> {
    const [updated] = await db.update(niches).set(niche).where(eq(niches.id, id)).returning();
    return updated || undefined;
  }

  async deleteNiche(id: number): Promise<boolean> {
    const result = await db.delete(niches).where(eq(niches.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getAllWebsites(): Promise<Website[]> {
    return db.select().from(websites).orderBy(websites.nicheId, websites.order);
  }

  async getWebsitesByNiche(nicheId: number): Promise<Website[]> {
    return db.select().from(websites).where(eq(websites.nicheId, nicheId)).orderBy(websites.order);
  }

  async getWebsiteById(id: number): Promise<Website | undefined> {
    const [website] = await db.select().from(websites).where(eq(websites.id, id));
    return website || undefined;
  }

  async createWebsite(website: InsertWebsite): Promise<Website> {
    const [created] = await db.insert(websites).values(website).returning();
    return created;
  }

  async updateWebsite(id: number, website: Partial<InsertWebsite>): Promise<Website | undefined> {
    const [updated] = await db.update(websites).set(website).where(eq(websites.id, id)).returning();
    return updated || undefined;
  }

  async deleteWebsite(id: number): Promise<boolean> {
    const result = await db.delete(websites).where(eq(websites.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return db.select().from(submissions).orderBy(desc(submissions.createdAt));
  }

  async getSubmissionById(id: number): Promise<Submission | undefined> {
    const [submission] = await db.select().from(submissions).where(eq(submissions.id, id));
    return submission || undefined;
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [created] = await db.insert(submissions).values(submission).returning();
    return created;
  }

  async updateSubmission(id: number, data: Partial<Submission>): Promise<Submission | undefined> {
    const [updated] = await db.update(submissions).set(data).where(eq(submissions.id, id)).returning();
    return updated || undefined;
  }

  async deleteSubmission(id: number): Promise<boolean> {
    const result = await db.delete(submissions).where(eq(submissions.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    const [contactSubmission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return contactSubmission || undefined;
  }

  async createContactSubmission(contactSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [created] = await db.insert(contactSubmissions).values(contactSubmission).returning();
    return created;
  }
}

export const storage = process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0 
  ? new DatabaseStorage() 
  : new MemoryStorage();
