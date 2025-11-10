import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const niches = pgTable("niches", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  number: text("number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
});

export const insertNicheSchema = createInsertSchema(niches).omit({
  id: true,
});

export type InsertNiche = z.infer<typeof insertNicheSchema>;
export type Niche = typeof niches.$inferSelect;

export const websites = pgTable("websites", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  nicheId: integer("niche_id").notNull().references(() => niches.id, { onDelete: "cascade" }),
  order: integer("order").notNull().default(0),
  screenshotUrl: text("screenshot_url"),
});

export const insertWebsiteSchema = createInsertSchema(websites).omit({
  id: true,
  screenshotUrl: true,
});

export type InsertWebsite = z.infer<typeof insertWebsiteSchema>;
export type Website = typeof websites.$inferSelect;

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  suggestedNiche: text("suggested_niche").notNull(),
  email: text("email"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  status: true,
  createdAt: true,
}).extend({
  email: z.string().email().optional(),
});

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;
