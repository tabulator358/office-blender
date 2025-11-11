# Office Blender

Futuristická aplikace pro objednávání drinků z blenderu s admin stránkou pro obsluhu.

## Funkce

- 🥤 Výběr z 5 různých drinků
- ⏰ Výběr času doručení
- 📝 Jednoduchý objednávkový formulář
- 👨‍💼 Waiter dashboard pro správu objednávek
- 💾 Ukládání objednávek do Vercel KV (nebo in-memory storage)
- 🎨 Moderní minimalistický design s futuristickými akcenty

## Technologie

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Vercel KV pro ukládání dat (nebo in-memory storage pro lokální vývoj)

## Instalace

1. Nainstalujte dependencies:
```bash
npm install
```

2. (Volitelné) Pro lokální vývoj s Vercel KV:
   - Vytvořte KV databázi na [Vercel Dashboard](https://vercel.com/dashboard)
   - Zkopírujte `.env.example` do `.env.local`
   - Přidejte `KV_REST_API_URL` a `KV_REST_API_TOKEN` do `.env.local`
   
   Bez těchto proměnných se použije in-memory storage (data se ztratí po restartu).

3. Spusťte vývojový server:
```bash
npm run dev
```

4. Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči

## Struktura

- `/` - Hlavní stránka s objednávkovým formulářem
- `/waiter` - Dashboard pro správu objednávek
- `/api/orders` - API endpoint pro vytváření a načítání objednávek
- `/api/orders/[id]` - API endpoint pro aktualizaci statusu objednávky

## Nasazení na Vercel

📖 **Podrobný návod najdete v [VERCEL_SETUP.md](./VERCEL_SETUP.md)**

### Rychlý přehled:

1. **Vytvořte Vercel projekt** (Git integration nebo `npx vercel`)
2. **Vytvořte KV databázi** v Storage sekci
3. **Přidejte environment variables** (`KV_REST_API_URL`, `KV_REST_API_TOKEN`)
4. **Deploy** - automaticky přes Git nebo `npx vercel --prod`

### Poznámka

- Aplikace automaticky použije Vercel KV, pokud jsou nastaveny environment variables
- Bez environment variables se použije in-memory storage (vhodné pouze pro testování)
- Vercel KV má zdarma generous free tier (30,000 reads/day, 30,000 writes/day)

## Dostupné drinky

- Iced banana smoothie with protein
- Iced banana cocoa smoothie with protein
- Iced banana smoothie with berries
- Bulletproof coffee
- Goat bulletproof coffee

## Časy doručení

10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00

