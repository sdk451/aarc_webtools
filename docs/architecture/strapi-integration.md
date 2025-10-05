# AARC Capital Platform - Strapi CMS Integration

## Overview

This document details the Strapi CMS integration for the AARC Capital Investor Confidence Platform, including content models, ISR strategy, and webhook revalidation patterns.

---

## 1. Architecture Decision

### 1.1 Why Strapi?
- **Cost Control**: Self-hosted OSS core with no per-API-call limits
- **Content Flexibility**: Full control over content model and database
- **Low Churn Content**: Perfect for educational pathways with infrequent updates
- **Integration Freedom**: Easy integration with AARC proprietary tools
- **ISR Compatibility**: Works seamlessly with Next.js ISR and webhook revalidation

### 1.2 Hosting Strategy
- **Self-Hosted**: Deploy on Fly.io, Render, or Railway
- **Database**: PostgreSQL (shared with user data or separate instance)
- **Cost**: $5-30/month for small to medium traffic
- **Scaling**: Can upgrade to Strapi Cloud or enterprise if needed

---

## 2. Content Model

### 2.1 Content Hierarchy
```
Pathway (Learning Track)
├── Module (Course Section)
│   ├── Lesson (Individual Content)
│   └── Lesson
└── Module
    └── Lesson
```

### 2.2 Content Types

#### Pathway
- **Purpose**: Top-level learning tracks (e.g., "Options Trading Basics", "Portfolio Optimization")
- **Fields**:
  - `title` (string, required)
  - `slug` (uid, unique)
  - `summary` (text)
  - `order` (integer)
  - `tier` (enum: free/premium)
  - `modules` (relation: oneToMany)
  - `seoTitle`, `seoDescription`, `ogImage`

#### Module
- **Purpose**: Course sections within pathways
- **Fields**:
  - `title` (string, required)
  - `slug` (uid, unique)
  - `order` (integer)
  - `pathway` (relation: manyToOne)
  - `lessons` (relation: oneToMany)

#### Lesson
- **Purpose**: Individual educational content pieces
- **Fields**:
  - `title` (string, required)
  - `slug` (uid, unique)
  - `module` (relation: manyToOne)
  - `tier` (enum: free/premium)
  - `estimatedTimeMins` (integer)
  - `body` (richtext)
  - `assets` (media, multiple)
  - `seoTitle`, `seoDescription`, `ogImage`

#### Announcement
- **Purpose**: Site-wide announcements and promotions
- **Fields**:
  - `title` (string, required)
  - `body` (richtext)
  - `active` (boolean)
  - `startsAt`, `endsAt` (datetime)
  - `tier` (enum: all/free/premium)

---

## 3. Strapi Schema Files

### 3.1 Pathway Schema
**File**: `strapi/src/api/pathway/content-types/pathway/schema.json`
```json
{
  "collectionName": "pathways",
  "info": {
    "singularName": "pathway",
    "pluralName": "pathways",
    "displayName": "Pathway",
    "description": "Top-level learning track"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true,
      "unique": true
    },
    "summary": {
      "type": "text"
    },
    "order": {
      "type": "integer",
      "default": 1
    },
    "tier": {
      "type": "enumeration",
      "enum": ["free", "premium"],
      "default": "free",
      "required": true
    },
    "modules": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::module.module",
      "mappedBy": "pathway"
    },
    "seoTitle": {
      "type": "string"
    },
    "seoDescription": {
      "type": "string"
    },
    "ogImage": {
      "type": "media",
      "multiple": false
    }
  }
}
```

### 3.2 Module Schema
**File**: `strapi/src/api/module/content-types/module/schema.json`
```json
{
  "collectionName": "modules",
  "info": {
    "singularName": "module",
    "pluralName": "modules",
    "displayName": "Module",
    "description": "Module within a Pathway"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true,
      "unique": true
    },
    "order": {
      "type": "integer",
      "default": 1
    },
    "pathway": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::pathway.pathway",
      "inversedBy": "modules",
      "required": true
    },
    "lessons": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::lesson.lesson",
      "mappedBy": "module"
    }
  }
}
```

### 3.3 Lesson Schema
**File**: `strapi/src/api/lesson/content-types/lesson/schema.json`
```json
{
  "collectionName": "lessons",
  "info": {
    "singularName": "lesson",
    "pluralName": "lessons",
    "displayName": "Lesson",
    "description": "Lesson within a Module"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true,
      "unique": true
    },
    "module": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::module.module",
      "inversedBy": "lessons",
      "required": true
    },
    "tier": {
      "type": "enumeration",
      "enum": ["free", "premium"],
      "default": "free",
      "required": true
    },
    "estimatedTimeMins": {
      "type": "integer",
      "default": 5
    },
    "body": {
      "type": "richtext"
    },
    "assets": {
      "type": "media",
      "multiple": true
    },
    "seoTitle": {
      "type": "string"
    },
    "seoDescription": {
      "type": "string"
    },
    "ogImage": {
      "type": "media",
      "multiple": false
    }
  }
}
```

### 3.4 Announcement Schema
**File**: `strapi/src/api/announcement/content-types/announcement/schema.json`
```json
{
  "collectionName": "announcements",
  "info": {
    "singularName": "announcement",
    "pluralName": "announcements",
    "displayName": "Announcement",
    "description": "Site-wide announcements or promos"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "body": {
      "type": "richtext"
    },
    "active": {
      "type": "boolean",
      "default": true
    },
    "startsAt": {
      "type": "datetime"
    },
    "endsAt": {
      "type": "datetime"
    },
    "tier": {
      "type": "enumeration",
      "enum": ["all", "free", "premium"],
      "default": "all",
      "required": true
    }
  }
}
```

---

## 4. Next.js Integration

### 4.1 ISR Strategy
- **Static Generation**: All public pages pre-generated at build time
- **Incremental Regeneration**: Pages regenerate on-demand with caching
- **Tag-Based Caching**: Granular cache control for specific content types
- **Webhook Revalidation**: Strapi webhooks trigger targeted cache invalidation

### 4.2 Data Fetching Patterns

#### Server Components with Tags
```typescript
// Fetch pathway with cache tags
export async function getPathway(slug: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/pathways?filters[slug][$eq]=${slug}&populate=deep`,
    { 
      next: { 
        tags: ['site:all', 'type:pathway', `pathway:${slug}`],
        revalidate: 3600 // 1 hour fallback
      } 
    }
  );
  const json = await res.json();
  return json?.data?.[0];
}

// Fetch modules for pathway
export async function getModulesForPathway(pathwaySlug: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/modules?filters[pathway][slug][$eq]=${pathwaySlug}&sort=order:asc`,
    { 
      next: { 
        tags: ['site:all', 'type:module', `list:modules:${pathwaySlug}`] 
      } 
    }
  );
  return (await res.json())?.data;
}

// Fetch lesson
export async function getLesson(slug: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/lessons?filters[slug][$eq]=${slug}&populate=deep`,
    { 
      next: { 
        tags: ['site:all', 'type:lesson', `lesson:${slug}`] 
      } 
    }
  );
  return (await res.json())?.data?.[0];
}

// Fetch active announcements
export async function getActiveAnnouncements() {
  const nowIso = new Date().toISOString();
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/announcements?filters[$and][0][active][$eq]=true&filters[$and][1][startsAt][$lte]=${nowIso}&filters[$and][2][endsAt][$gte]=${nowIso}`,
    { 
      next: { 
        tags: ['site:all', 'type:announcement', 'site:announcements'] 
      } 
    }
  );
  return (await res.json())?.data;
}
```

### 4.3 Page Components
```typescript
// app/(marketing)/pathways/[slug]/page.tsx
import { getPathway, getModulesForPathway } from '@/lib/strapi';
import { PathwayPage } from '@/components/sections/pathway-page';

interface PageProps {
  params: { slug: string };
}

export default async function PathwayPageRoute({ params }: PageProps) {
  const [pathway, modules] = await Promise.all([
    getPathway(params.slug),
    getModulesForPathway(params.slug)
  ]);

  if (!pathway) {
    notFound();
  }

  return <PathwayPage pathway={pathway} modules={modules} />;
}

// Generate static params for ISR
export async function generateStaticParams() {
  const pathways = await fetch(
    `${process.env.STRAPI_URL}/api/pathways?fields=slug`
  );
  const data = await pathways.json();
  
  return data.data.map((pathway: any) => ({
    slug: pathway.slug,
  }));
}
```

---

## 5. Webhook Revalidation

### 5.1 Revalidation Route
**File**: `app/api/revalidate/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

export const runtime = 'nodejs';

type StrapiWebhook = {
  event: string; // e.g., "entry.publish"
  model?: string; // v5 may include model/uid
  uid?: string;   // e.g., "api::lesson.lesson"
  entry?: {
    id: number | string;
    slug?: string;
  };
};

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

async function verifySignature(req: NextRequest, rawBody: string) {
  const secret = process.env.STRAPI_WEBHOOK_SECRET || '';
  const signature = req.headers.get('x-strapi-signature') || '';
  if (!secret || !signature) return false;

  const hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return timingSafeEqual(hmac, signature);
}

function computeTags(payload: StrapiWebhook) {
  const uid = payload.uid || payload.model || '';
  const type =
    uid.includes('pathway') ? 'pathway' :
    uid.includes('module')  ? 'module'  :
    uid.includes('lesson')  ? 'lesson'  :
    uid.includes('announcement') ? 'announcement' : 'unknown';

  const slug = payload.entry?.slug;
  const tags = new Set<string>([
    'site:all',                // global fallback
    `type:${type}`             // all pages of this type
  ]);

  if (type === 'pathway' && slug) {
    tags.add(`pathway:${slug}`);
    tags.add(`list:modules:${slug}`);
    tags.add(`list:lessons:${slug}`);
  }

  if (type === 'module' && slug) {
    tags.add(`module:${slug}`);
    tags.add(`list:lessons:${slug}`);
  }

  if (type === 'lesson' && slug) {
    tags.add(`lesson:${slug}`);
  }

  if (type === 'announcement') {
    tags.add('site:announcements');
  }

  return Array.from(tags);
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const ok = await verifySignature(req, raw);
    
    if (!ok) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(raw) as StrapiWebhook;
    const tags = computeTags(payload);
    
    for (const tag of tags) {
      revalidateTag(tag);
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
```

### 5.2 Strapi Webhook Configuration
1. **Create Webhook** in Strapi Admin → Settings → Webhooks
2. **URL**: `https://your-vercel-domain.com/api/revalidate`
3. **Headers**: Add `x-strapi-signature` (auto-generated by Strapi)
4. **Secret**: Set to your `STRAPI_WEBHOOK_SECRET` (also set in Vercel env)
5. **Events**: `entry.publish`, `entry.unpublish`, `entry.update`
6. **Payload**: Include `slug` field for targeted revalidation

---

## 6. Environment Configuration

### 6.1 Environment Variables
```bash
# Strapi Configuration
STRAPI_URL=https://your-strapi-instance.com
STRAPI_TOKEN=your-api-token
STRAPI_WEBHOOK_SECRET=your-webhook-secret

# Optional: Restrict webhook sources
ALLOWED_EVENT_SOURCE=your-strapi-domain.com
```

### 6.2 Vercel Configuration
```json
{
  "env": {
    "STRAPI_URL": "https://your-strapi-instance.com",
    "STRAPI_TOKEN": "your-api-token",
    "STRAPI_WEBHOOK_SECRET": "your-webhook-secret"
  }
}
```

---

## 7. Content Workflow

### 7.1 Editorial Process
1. **Content Creation**: Editors create content in Strapi admin
2. **Draft Review**: Content saved as draft for review
3. **Publishing**: Content published triggers webhook
4. **Revalidation**: Specific pages revalidated automatically
5. **Live Content**: Updated content appears without rebuild

### 7.2 Content Types by Tier
- **Free Content**: Accessible to all users
- **Premium Content**: Requires subscription
- **Announcements**: Can target specific user tiers

### 7.3 SEO Optimization
- **Built-in SEO Fields**: Title, description, ogImage for each content type
- **Structured URLs**: Clean slug-based URLs
- **Meta Tags**: Automatic generation from Strapi content
- **Sitemap**: Generated from published content

---

## 8. Performance Considerations

### 8.1 Caching Strategy
- **ISR**: Pages cached for 1 hour by default
- **Tag-Based**: Granular invalidation for specific content
- **CDN**: Vercel Edge Network for global distribution
- **Database**: Connection pooling for Strapi queries

### 8.2 Optimization Tips
- **Populate Strategy**: Use `populate=deep` sparingly
- **Field Selection**: Request only needed fields
- **Image Optimization**: Use Strapi's image transformation
- **Bundle Size**: Lazy load heavy content components

---

## 9. Security Considerations

### 9.1 API Security
- **Token Authentication**: Use API tokens for Strapi access
- **Webhook Verification**: HMAC-SHA256 signature verification
- **Rate Limiting**: Implement rate limiting on API routes
- **CORS**: Configure CORS for production domains

### 9.2 Content Security
- **Draft/Publish**: Content only visible when published
- **Tier Gating**: Premium content protected by subscription
- **Input Validation**: Sanitize rich text content
- **Media Security**: Secure file uploads and serving

---

## 10. Monitoring and Maintenance

### 10.1 Health Checks
- **Strapi Health**: Monitor Strapi instance availability
- **Webhook Delivery**: Track webhook success/failure rates
- **Cache Performance**: Monitor ISR hit rates
- **Content Updates**: Track content publication frequency

### 10.2 Backup Strategy
- **Database Backups**: Regular PostgreSQL backups
- **Media Backups**: Backup uploaded assets
- **Content Export**: Regular content exports for disaster recovery
- **Version Control**: Track content changes and rollbacks

---

This Strapi integration provides a robust, scalable content management solution that perfectly fits the AARC Capital platform's educational content needs while maintaining excellent performance through ISR and webhook revalidation.
