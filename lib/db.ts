// =============================================================================
// RIXVEN — lib/db.ts
// Cloudflare D1 Database Configuration & Typed Query Layer.
//
// Architecture:
//   - D1Database binding from Cloudflare Workers environment
//   - Typed wrappers for all RIXVEN data models
//   - Migration runner utility
//   - Connection singleton for request lifecycle
//
// Usage in Edge API Routes (with @cloudflare/next-on-pages):
//   import { getRequestContext } from '@cloudflare/next-on-pages';
//   import { getDatabase } from '@/lib/db';
//
//   const { env } = getRequestContext();
//   const db      = getDatabase(env.DB);
//   const result  = await db.contactSubmissions.findById('...');
//
// wrangler.toml binding:
//   [[d1_databases]]
//   binding      = "DB"
//   database_name = "rixven-db"
//   database_id  = "YOUR_D1_DATABASE_ID_HERE"
// =============================================================================

// ---------------------------------------------------------------------------
// TYPE DECLARATIONS — Cloudflare D1 types
// Install: npm install @cloudflare/workers-types
// ---------------------------------------------------------------------------

/** The raw D1Database interface provided by Cloudflare Workers runtime. */
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  raw<T = unknown[]>(): Promise<T[]>;
}

export interface D1Result<T = Record<string, unknown>> {
  results:  T[];
  success:  boolean;
  meta:     D1Meta;
  error?:   string;
}

export interface D1Meta {
  changed_db:   boolean;
  changes:      number;
  duration:     number;
  last_row_id:  number;
  rows_read:    number;
  rows_written: number;
  size_after:   number;
}

export interface D1ExecResult {
  count:    number;
  duration: number;
}

// ---------------------------------------------------------------------------
// RIXVEN CLOUDFLARE ENVIRONMENT BINDINGS
// Extend this interface as you add more bindings (KV, R2, Queues, etc.)
// ---------------------------------------------------------------------------
export interface RixvenEnv {
  /** Cloudflare D1 — primary relational database */
  DB: D1Database;

  /** Cloudflare KV — for caching, sessions, feature flags */
  CACHE_KV?: KVNamespace;

  /** Cloudflare R2 — for file storage (docs, assets, uploads) */
  ASSETS_R2?: R2Bucket;

  /** Environment identifier */
  ENVIRONMENT: 'development' | 'staging' | 'production';

  /** Secret keys — set via `wrangler secret put` */
  INTERNAL_API_KEY: string;
  NOTIFICATION_EMAIL_FROM?: string;
}

// KV and R2 type stubs (provided by @cloudflare/workers-types in production)
interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream' }): Promise<string | null>;
  put(key: string, value: string | ReadableStream | ArrayBuffer | FormData, options?: { expiration?: number; expirationTtl?: number; metadata?: unknown }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{ keys: { name: string; expiration?: number; metadata?: unknown }[]; list_complete: boolean; cursor?: string }>;
}

interface R2Bucket {
  get(key: string): Promise<R2Object | null>;
  put(key: string, value: ReadableStream | ArrayBuffer | string, options?: Record<string, unknown>): Promise<R2Object>;
  delete(key: string): Promise<void>;
}

interface R2Object {
  key: string;
  size: number;
  body: ReadableStream;
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
  json<T>(): Promise<T>;
}

// ---------------------------------------------------------------------------
// DATA MODELS — TypeScript interfaces for all RIXVEN D1 tables
// ---------------------------------------------------------------------------

/** A contact form submission stored in D1. */
export interface ContactSubmission {
  id:           string;   // UUID v4 — primary key
  first_name:   string;
  last_name:    string;
  email:        string;
  company:      string | null;
  job_title:    string | null;
  category:     'enterprise' | 'partnership' | 'developer' | 'press' | 'support' | 'general';
  message:      string;
  product:      'rixven-os' | 'rixven-ai' | 'rixven-lang' | 'all' | null;
  submitter_ip: string;
  user_agent:   string;
  status:       'pending' | 'read' | 'replied' | 'closed';
  created_at:   string;   // ISO 8601
  updated_at:   string;   // ISO 8601
}

/** An early-access application for RIXVEN products. */
export interface EarlyAccessApplication {
  id:           string;
  email:        string;
  full_name:    string;
  organization: string;
  product:      'rixven-os' | 'rixven-ai' | 'rixven-lang';
  use_case:     string;
  approved:     boolean;
  access_token: string | null;
  created_at:   string;
  updated_at:   string;
}

/** A newsletter subscriber. */
export interface NewsletterSubscriber {
  id:            string;
  email:         string;
  name:          string | null;
  interests:     string | null;  // JSON array: ["os", "ai", "lang"]
  confirmed:     boolean;
  confirm_token: string | null;
  unsubscribed:  boolean;
  created_at:    string;
  updated_at:    string;
}

// ---------------------------------------------------------------------------
// TYPED QUERY REPOSITORIES — Domain-driven query wrappers
// ---------------------------------------------------------------------------

/** Repository for contact_submissions table. */
class ContactRepository {
  constructor(private readonly db: D1Database) {}

  /** Insert a new contact submission. */
  async create(data: Omit<ContactSubmission, 'created_at' | 'updated_at'>): Promise<void> {
    const now = new Date().toISOString();
    await this.db
      .prepare(`
        INSERT INTO contact_submissions (
          id, first_name, last_name, email, company, job_title,
          category, message, product, submitter_ip, user_agent,
          status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        data.id, data.first_name, data.last_name, data.email,
        data.company ?? null, data.job_title ?? null,
        data.category, data.message, data.product ?? null,
        data.submitter_ip, data.user_agent, data.status,
        now, now,
      )
      .run();
  }

  /** Find a submission by ID. */
  async findById(id: string): Promise<ContactSubmission | null> {
    return this.db
      .prepare('SELECT * FROM contact_submissions WHERE id = ?')
      .bind(id)
      .first<ContactSubmission>();
  }

  /** Find all submissions by email address. */
  async findByEmail(email: string): Promise<ContactSubmission[]> {
    const result = await this.db
      .prepare('SELECT * FROM contact_submissions WHERE email = ? ORDER BY created_at DESC')
      .bind(email)
      .all<ContactSubmission>();
    return result.results;
  }

  /** Count submissions from an IP address within a time window. */
  async countByIpSince(ip: string, since: Date): Promise<number> {
    const result = await this.db
      .prepare(`
        SELECT COUNT(*) as count
        FROM contact_submissions
        WHERE submitter_ip = ? AND created_at > ?
      `)
      .bind(ip, since.toISOString())
      .first<{ count: number }>();
    return result?.count ?? 0;
  }

  /** Update the status of a submission (for CRM workflow). */
  async updateStatus(
    id: string,
    status: ContactSubmission['status'],
  ): Promise<void> {
    await this.db
      .prepare(`
        UPDATE contact_submissions
        SET status = ?, updated_at = ?
        WHERE id = ?
      `)
      .bind(status, new Date().toISOString(), id)
      .run();
  }

  /** List recent submissions with pagination. */
  async list(options: {
    limit?:    number;
    offset?:   number;
    status?:   ContactSubmission['status'];
    category?: ContactSubmission['category'];
  } = {}): Promise<{ results: ContactSubmission[]; total: number }> {
    const {
      limit    = 20,
      offset   = 0,
      status,
      category,
    } = options;

    // Build dynamic WHERE clause
    const conditions: string[] = [];
    const params:     unknown[] = [];

    if (status)   { conditions.push('status = ?');   params.push(status);   }
    if (category) { conditions.push('category = ?'); params.push(category); }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const [results, countResult] = await Promise.all([
      this.db
        .prepare(`SELECT * FROM contact_submissions ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
        .bind(...params, limit, offset)
        .all<ContactSubmission>(),
      this.db
        .prepare(`SELECT COUNT(*) as count FROM contact_submissions ${where}`)
        .bind(...params)
        .first<{ count: number }>(),
    ]);

    return {
      results: results.results,
      total:   countResult?.count ?? 0,
    };
  }
}

/** Repository for early_access_applications table. */
class EarlyAccessRepository {
  constructor(private readonly db: D1Database) {}

  async create(data: Omit<EarlyAccessApplication, 'created_at' | 'updated_at' | 'approved' | 'access_token'>): Promise<void> {
    const now = new Date().toISOString();
    await this.db
      .prepare(`
        INSERT INTO early_access_applications (
          id, email, full_name, organization, product, use_case,
          approved, access_token, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, false, null, ?, ?)
      `)
      .bind(data.id, data.email, data.full_name, data.organization, data.product, data.use_case, now, now)
      .run();
  }

  async findByEmail(email: string): Promise<EarlyAccessApplication | null> {
    return this.db
      .prepare('SELECT * FROM early_access_applications WHERE email = ?')
      .bind(email)
      .first<EarlyAccessApplication>();
  }

  async approve(id: string, accessToken: string): Promise<void> {
    await this.db
      .prepare(`
        UPDATE early_access_applications
        SET approved = true, access_token = ?, updated_at = ?
        WHERE id = ?
      `)
      .bind(accessToken, new Date().toISOString(), id)
      .run();
  }
}

/** Repository for newsletter_subscribers table. */
class NewsletterRepository {
  constructor(private readonly db: D1Database) {}

  async subscribe(data: {
    id: string; email: string; name?: string; interests?: string[];
    confirmToken: string;
  }): Promise<void> {
    const now = new Date().toISOString();
    await this.db
      .prepare(`
        INSERT INTO newsletter_subscribers (
          id, email, name, interests, confirmed, confirm_token, unsubscribed, created_at, updated_at
        ) VALUES (?, ?, ?, ?, false, ?, false, ?, ?)
        ON CONFLICT(email) DO UPDATE SET
          name         = excluded.name,
          interests    = excluded.interests,
          unsubscribed = false,
          updated_at   = excluded.updated_at
      `)
      .bind(
        data.id, data.email, data.name ?? null,
        data.interests ? JSON.stringify(data.interests) : null,
        data.confirmToken, now, now,
      )
      .run();
  }

  async confirm(token: string): Promise<boolean> {
    const result = await this.db
      .prepare(`
        UPDATE newsletter_subscribers
        SET confirmed = true, confirm_token = null, updated_at = ?
        WHERE confirm_token = ? AND confirmed = false
      `)
      .bind(new Date().toISOString(), token)
      .run();
    return result.meta.changes > 0;
  }

  async unsubscribe(email: string): Promise<void> {
    await this.db
      .prepare(`
        UPDATE newsletter_subscribers
        SET unsubscribed = true, updated_at = ?
        WHERE email = ?
      `)
      .bind(new Date().toISOString(), email)
      .run();
  }
}

// ---------------------------------------------------------------------------
// DATABASE CLASS — Unified access point for all repositories
// ---------------------------------------------------------------------------

/** The RIXVEN database client. Wraps D1Database with typed repositories. */
export class RixvenDatabase {
  /** Direct D1Database reference for raw queries when needed. */
  public readonly raw: D1Database;

  /** Typed repository for contact form submissions. */
  public readonly contactSubmissions: ContactRepository;

  /** Typed repository for early access applications. */
  public readonly earlyAccess: EarlyAccessRepository;

  /** Typed repository for newsletter subscribers. */
  public readonly newsletter: NewsletterRepository;

  constructor(d1: D1Database) {
    this.raw                = d1;
    this.contactSubmissions = new ContactRepository(d1);
    this.earlyAccess        = new EarlyAccessRepository(d1);
    this.newsletter         = new NewsletterRepository(d1);
  }

  /**
   * Executes multiple statements as an atomic D1 batch transaction.
   * All statements succeed or all fail together.
   */
  async transaction<T>(
    fn: (db: D1Database) => D1PreparedStatement[],
  ): Promise<D1Result<T>[]> {
    const statements = fn(this.raw);
    return this.raw.batch<T>(statements);
  }

  /**
   * Health check — verifies D1 connectivity.
   * Call from /api/health endpoint to confirm DB is reachable.
   */
  async ping(): Promise<{ ok: boolean; latency: number }> {
    const start = Date.now();
    try {
      await this.raw.prepare('SELECT 1 as ok').first();
      return { ok: true, latency: Date.now() - start };
    } catch {
      return { ok: false, latency: Date.now() - start };
    }
  }
}

// ---------------------------------------------------------------------------
// FACTORY FUNCTION — Instantiates the database with a D1 binding
// ---------------------------------------------------------------------------

/**
 * Returns a typed RIXVEN database client from a Cloudflare D1 binding.
 *
 * In production (Cloudflare Workers via @cloudflare/next-on-pages):
 * ```ts
 * import { getRequestContext } from '@cloudflare/next-on-pages';
 * import { getDatabase } from '@/lib/db';
 *
 * const { env } = getRequestContext();
 * const db      = getDatabase(env.DB);
 * ```
 *
 * In unit tests (mock):
 * ```ts
 * const db = getDatabase(mockD1Database);
 * ```
 */
export function getDatabase(d1Binding?: D1Database): RixvenDatabase {
  if (!d1Binding) {
    // In development without a D1 binding, throw a clear error
    // rather than silently using a null object
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[RIXVEN DB] No D1 binding provided. Run `wrangler pages dev` to ' +
        'use a local D1 instance, or configure CLOUDFLARE_D1_TOKEN for remote dev.',
      );
    }
    throw new Error(
      'D1 database binding is not available. ' +
      'Ensure DB is bound in wrangler.toml and @cloudflare/next-on-pages is configured.',
    );
  }

  return new RixvenDatabase(d1Binding);
}

// ---------------------------------------------------------------------------
// SQL MIGRATION DEFINITIONS
// Run via: wrangler d1 execute rixven-db --file=migrations/001_schema.sql
// ---------------------------------------------------------------------------

/**
 * Database schema for reference. Execute via Wrangler CLI or D1 API.
 * See migrations/ directory for versioned migration files.
 */
export const SCHEMA_SQL = `
-- ============================================================
-- RIXVEN Database Schema — v1
-- Run: wrangler d1 execute rixven-db --file=migrations/001_schema.sql
-- ============================================================

-- Contact form submissions from rixven.com
CREATE TABLE IF NOT EXISTS contact_submissions (
  id             TEXT PRIMARY KEY NOT NULL,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  company        TEXT,
  job_title      TEXT,
  category       TEXT NOT NULL CHECK(category IN ('enterprise','partnership','developer','press','support','general')),
  message        TEXT NOT NULL,
  product        TEXT CHECK(product IN ('rixven-os','rixven-ai','rixven-lang','all')),
  submitter_ip   TEXT NOT NULL,
  user_agent     TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','read','replied','closed')),
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_email      ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_ip_time    ON contact_submissions(submitter_ip, created_at);
CREATE INDEX IF NOT EXISTS idx_contact_status     ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created    ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_category   ON contact_submissions(category);

-- Early access applications for RIXVEN products
CREATE TABLE IF NOT EXISTS early_access_applications (
  id             TEXT PRIMARY KEY NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  full_name      TEXT NOT NULL,
  organization   TEXT NOT NULL,
  product        TEXT NOT NULL CHECK(product IN ('rixven-os','rixven-ai','rixven-lang')),
  use_case       TEXT NOT NULL,
  approved       INTEGER NOT NULL DEFAULT 0,
  access_token   TEXT UNIQUE,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_early_access_email   ON early_access_applications(email);
CREATE INDEX IF NOT EXISTS idx_early_access_product ON early_access_applications(product, approved);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id             TEXT PRIMARY KEY NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  name           TEXT,
  interests      TEXT,   -- JSON array
  confirmed      INTEGER NOT NULL DEFAULT 0,
  confirm_token  TEXT UNIQUE,
  unsubscribed   INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email     ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_confirmed ON newsletter_subscribers(confirmed, unsubscribed);
` as const;
