# Notion CMS (sketchbook gallery)

Sketchbook images come from the **Gallery** inline database on your [CMS Notion page](https://app.notion.com/p/trentbrew/CMS-14313ed3c526445a800542a94896fac0).

| | |
| --- | --- |
| CMS page | [CMS](https://app.notion.com/p/14313ed3c526445a800542a94896fac0) |
| Gallery database ID | `f7a8e709-9b0c-4ea4-8de9-ac8744521416` |
| Schema | `files` (Files & media), `index` (number), `key` (title) |

## How client-vue loads it

1. Browser requests same-origin `GET /api/v1/gallery`.
2. **Local dev:** `vue.config.js` serves that route when `NOTION_API_KEY` is set.
3. **Production:** Vercel function `api/v1/gallery.js` queries Notion with the same server module (`server/notion-gallery.cjs`).

Legacy [notioncms.vercel.app](https://notioncms.vercel.app) ([trentbrew/notion-cms](https://github.com/trentbrew/notion-cms)) is only used as a proxy fallback when `NOTION_API_KEY` is missing in dev.

## Setup

1. [Create or reuse an internal integration](https://www.notion.so/my-integrations) with **Read content**.
2. Open the [CMS page](https://app.notion.com/p/trentbrew/CMS-14313ed3c526445a800542a94896fac0) → **⋯** → **Connections** → add that integration.
3. In `.env`:
   ```bash
   NOTION_API_KEY=secret_...
   NOTION_GALLERY_ID=f7a8e709-9b0c-4ea4-8de9-ac8744521416
   VUE_APP_NOTION_CMS_TOKEN=...   # optional gate; server compares Bearer token
   ```
4. Restart `npm run dev`.
5. On Vercel (trentbrew.com project), add the same `NOTION_API_KEY` and `NOTION_GALLERY_ID` env vars, then redeploy.

Tutorial: [Using Notion as a Headless CMS](https://brew.build/posts/guide--notion-cms/).

## Fallbacks

| Mode | When |
| --- | --- |
| Bundled dev placeholders | Development, when `/api/v1/gallery` fails |
| `VUE_APP_GALLERY_FALLBACK=snapshot` | `public/data/gallery-fallback.json` after API failure |
| `npm run gallery:sync` | Refresh snapshot (Notion file URLs expire) |

## External API (legacy)

Set `VUE_APP_NOTION_CMS_URL=external` and `VUE_APP_NOTION_CMS_HOST=https://notioncms.vercel.app` to call the old host from the browser again.
