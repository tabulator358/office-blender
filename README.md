# Office Blender

Futuristická aplikace pro objednávání drinků z blenderu s admin stránkou pro obsluhu.

## Funkce

- 🥤 Výběr z 5 různých drinků
- ⏰ Výběr času doručení
- 📝 Jednoduchý objednávkový formulář
- 📧 **Email notifikace** - objednávky se automaticky posílají na email
- 👨‍💼 Waiter dashboard pro správu objednávek
- 💾 In-memory storage pro objednávky
- 🎨 Moderní minimalistický design s futuristickými akcenty

## Technologie

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- In-memory storage pro ukládání dat

## Instalace

1. Nainstalujte dependencies:
```bash
npm install
```

2. (Volitelné) Nastavte email notifikace s Resend:
   - Zaregistrujte se na [Resend.com](https://resend.com) (zdarma)
   - Přihlaste se do [Resend Dashboard](https://resend.com/api-keys)
   - Klikněte na **Create API Key**
   - Zadejte název (např. "Office Blender Local")
   - Vyberte oprávnění (minimálně `Sending access`)
   - Zkopírujte API klíč (zobrazí se pouze jednou!)
   - Vytvořte soubor `.env.local` v kořenovém adresáři
   - Přidejte do `.env.local`:
     ```
     RESEND_API_KEY=re_xxxxxxxxxxxxx
     RESEND_FROM_EMAIL=onboarding@resend.dev
     ORDER_EMAIL=vas-email@example.com
     ```
     - `RESEND_API_KEY` - váš API klíč z Resend
     - `RESEND_FROM_EMAIL` - email odesílatele (výchozí: `onboarding@resend.dev`)
     - `ORDER_EMAIL` - email kam se mají posílat notifikace o objednávkách (můžete použít více emailů oddělených čárkou: `email1@example.com,email2@example.com`)
   
   **Bez Resend API klíče:**
   - Email notifikace se nebudou posílat
   - Aplikace bude pouze logovat do konzole (simulované emaily)
   - Objednávky se budou vytvářet, ale notifikace nebudou odesílány

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
2. **Získejte Resend API klíč**:
   - Zaregistrujte se na [Resend.com](https://resend.com) (zdarma)
   - Přihlaste se do [Resend Dashboard](https://resend.com/api-keys)
   - Klikněte na **Create API Key**
   - Zadejte název (např. "Office Blender Production")
   - Vyberte oprávnění (minimálně `Sending access`)
   - Zkopírujte API klíč (zobrazí se pouze jednou!)
3. **Přidejte environment variables** v Vercel Dashboard → Settings → Environment Variables:
   - `RESEND_API_KEY` (váš API klíč z Resend)
   - `RESEND_FROM_EMAIL` (volitelně, výchozí: `onboarding@resend.dev`)
   - `ORDER_EMAIL` nebo `ORDER_EMAILS` (email kam se mají posílat notifikace o objednávkách, může být více emailů oddělených čárkou)
4. **Deploy** - automaticky přes Git nebo `npx vercel --prod`

### Poznámky

- **Email notifikace**: Objednávky se automaticky posílají na email pomocí Resend API
- **Waiter dashboard**: Funguje s in-memory storage (data se ztratí po restartu serverless funkce)
- **Resend free tier**: 3,000 emails/měsíc zdarma
- **Data persistence**: Data jsou uložena pouze v paměti a ztratí se po restartu

## Dostupné drinky

- Iced banana smoothie with protein
- Iced banana cocoa smoothie with protein
- Iced banana smoothie with berries
- Bulletproof coffee
- Goat bulletproof coffee

## Časy doručení

9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00

