import { 
  type User, 
  type InsertUser,
  type Niche,
  type InsertNiche,
  type Website,
  type InsertWebsite,
  type Submission,
  type InsertSubmission,
  users,
  niches,
  websites,
  submissions
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
}

export const storage = new DatabaseStorage();
