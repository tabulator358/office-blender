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

## Krok 4: Přidejte Environment Variables

1. V projektu jděte do **Settings** → **Environment Variables**

2. **Resend API klíč (pro email notifikace):**
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

3. Ujistěte se, že jsou vybrané všechny prostředí (Production, Preview, Development)
4. Klikněte na **Save**

## Krok 5: Deploy

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
- **Waiter dashboard**: Funguje s in-memory storage (data se ztratí po restartu serverless funkce)
- **Free tier**: 
  - Resend: 3,000 emails/měsíc zdarma
- **Data persistence**: Data jsou uložena pouze v paměti a ztratí se po restartu
- **Automatický deploy**: Každý push do Git automaticky spustí nový deploy

### Troubleshooting

- **Emaily se neposílají**: 
  - Zkontrolujte, že `RESEND_API_KEY` a `ORDER_EMAIL` jsou správně nastavené
  - Zkontrolujte Resend Dashboard → Emails pro status emailů
  - Zkontrolujte logs v Vercel Dashboard → Deployments → [váš deploy] → Functions
- **Data se nezobrazují na waiter dashboardu**: 
  - Data jsou uložena v paměti a ztratí se po restartu serverless funkce
  - To je normální chování - aplikace používá in-memory storage
- **Chyby při deploy**: Zkontrolujte logs v Vercel Dashboard → Deployments → [váš deploy] → Functions

