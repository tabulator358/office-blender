# Blender Drink Ordering App

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

### Krok 1: Vytvořte KV databázi

1. Jděte na [Vercel Dashboard](https://vercel.com/dashboard)
2. Vyberte svůj projekt (nebo vytvořte nový)
3. Jděte do sekce **Storage**
4. Klikněte na **Create Database** → vyberte **KV**
5. Vytvořte novou KV databázi

### Krok 2: Přidejte environment variables

1. V projektu na Vercel Dashboard jděte do **Settings** → **Environment Variables**
2. Přidejte tyto proměnné:
   - `KV_REST_API_URL` - najdete v KV databázi v sekci `.env.local`
   - `KV_REST_API_TOKEN` - najdete v KV databázi v sekci `.env.local`

### Krok 3: Deploy

```bash
# Přihlaste se do Vercel
npx vercel login

# Deploy projektu
npx vercel

# Nebo použijte Git integration - push do GitHub a Vercel automaticky deployne
```

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

