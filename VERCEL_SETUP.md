# Rychlý návod pro nasazení na Vercel

## Krok 1: Příprava projektu

```bash
# Nainstalujte dependencies
npm install
```

## Krok 2: Nastavte Email Notifikace (DOPORUČENO)

📧 **Podrobný návod najdete v [EMAIL_SETUP.md](./EMAIL_SETUP.md)**

### Rychlý přehled:

1. Vytvořte účet na [Resend.com](https://resend.com) (zdarma)
2. Získejte API klíč z [Resend Dashboard](https://resend.com/api-keys)
3. V projektu na Vercel Dashboard jděte do **Settings** → **Environment Variables**
4. Přidejte následující proměnné:
   - `RESEND_API_KEY` - váš Resend API klíč
   - `ORDER_EMAIL` - email kam se mají posílat objednávky (např. `orders@yourdomain.com`)
   - `RESEND_FROM_EMAIL` (volitelné) - email adresa odesílatele
5. Ujistěte se, že jsou vybrané všechny prostředí (Production, Preview, Development)
6. Klikněte na **Save**

**Výhoda**: Objednávky se automaticky posílají na email, nemusíte spoléhat pouze na databázi!

## Krok 3: Vytvořte Vercel projekt

1. Jděte na [vercel.com](https://vercel.com) a přihlaste se
2. Klikněte na **Add New** → **Project**
3. Importujte svůj Git repository (GitHub, GitLab, Bitbucket)
   - Nebo použijte Vercel CLI: `npx vercel`

## Krok 4: Vytvořte KV databázi (VOLITELNÉ - pro waiter dashboard)

1. V projektu na Vercel Dashboard jděte do sekce **Storage**
2. Klikněte na **Create Database**
3. Vyberte **KV** (Key-Value Store)
4. Zadejte název (např. `drink-orders`)
5. Vyberte region (nejblíže vašim uživatelům)
6. Klikněte na **Create**

## Krok 5: Přidejte Environment Variables pro KV (VOLITELNÉ)

1. V projektu jděte do **Settings** → **Environment Variables**

2. **Vercel KV proměnné:**
   - V KV databázi najdete sekci **.env.local** - zkopírujte hodnoty:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - Přidejte tyto proměnné do Environment Variables:
     - Name: `KV_REST_API_URL`, Value: (hodnota z KV)
     - Name: `KV_REST_API_TOKEN`, Value: (hodnota z KV)

3. **Resend API klíč (pro email notifikace):**
   - Zaregistrujte se na [Resend.com](https://resend.com) (zdarma)
   - Přihlaste se do [Resend Dashboard](https://resend.com/api-keys)
   - Klikněte na **Create API Key**
   - Zadejte název (např. "Office Blender Production")
   - Vyberte oprávnění (minimálně `Sending access`)
   - Zkopírujte API klíč (zobrazí se pouze jednou!)
   - Přidejte do Environment Variables:
     - Name: `RESEND_API_KEY`, Value: (váš API klíč)
   - (Volitelně) Přidejte `RESEND_FROM_EMAIL` s vaší ověřenou doménou
     - Výchozí hodnota: `onboarding@resend.dev` (funguje pouze pro testování)
   - Přidejte `ORDER_EMAIL` nebo `ORDER_EMAILS`:
     - Name: `ORDER_EMAIL`, Value: (email kam se mají posílat notifikace o objednávkách)
     - Nebo použijte `ORDER_EMAILS` pro více emailů: `email1@example.com,email2@example.com`

4. Ujistěte se, že jsou vybrané všechny prostředí (Production, Preview, Development)
5. Klikněte na **Save**

## Krok 6: Deploy

- Pokud jste použili Git integration, stačí pushnout změny:
  ```bash
  git add .
  git commit -m "Deploy to Vercel"
  git push
  ```
  Vercel automaticky deployne změny.

- Nebo použijte Vercel CLI:
  ```bash
  npx vercel --prod
  ```

## Hotovo! 🎉

Vaše aplikace je nyní dostupná na URL, kterou vám Vercel poskytl.

### Testování

1. Otevřete hlavní stránku a vytvořte testovací objednávku
2. Otevřete `/waiter` stránku a zkontrolujte, že se objednávka zobrazí
3. Zkuste změnit status objednávky

### Poznámky

- **Email notifikace**: Objednávky se automaticky posílají na email pomocí Resend API (3,000 emails/měsíc zdarma)
- **Waiter dashboard**: Funguje s KV databází nebo in-memory storage (data se ztratí po restartu)
- **Free tier**: 
  - Resend: 3,000 emails/měsíc zdarma
  - Vercel KV: 30,000 reads/day a 30,000 writes/day zdarma
- **Data persistence**: S KV databází jsou data trvale uložena
- **Automatický deploy**: Každý push do Git automaticky spustí nový deploy

### Troubleshooting

- **Emaily se neposílají**: 
  - Zkontrolujte, že `RESEND_API_KEY` a `ORDER_EMAIL` jsou správně nastavené
  - Zkontrolujte Resend Dashboard → Emails pro status emailů
  - Zkontrolujte logs v Vercel Dashboard → Deployments → [váš deploy] → Functions
- **Data se nezobrazují na waiter dashboardu**: 
  - Zkontrolujte, že jsou KV environment variables správně nastavené
  - Pokud není KV nastavené, použije se in-memory storage (data se ztratí po restartu)
- **Chyby při deploy**: Zkontrolujte logs v Vercel Dashboard → Deployments → [váš deploy] → Functions
- **KV není dostupné**: Ujistěte se, že jste vytvořili KV databázi a správně ji připojili k projektu

