# Rychlý návod pro nasazení na Vercel

## Krok 1: Příprava projektu

```bash
# Nainstalujte dependencies
npm install
```

## Krok 2: Vytvořte Vercel projekt

1. Jděte na [vercel.com](https://vercel.com) a přihlaste se
2. Klikněte na **Add New** → **Project**
3. Importujte svůj Git repository (GitHub, GitLab, Bitbucket)
   - Nebo použijte Vercel CLI: `npx vercel`

## Krok 3: Vytvořte KV databázi

1. V projektu na Vercel Dashboard jděte do sekce **Storage**
2. Klikněte na **Create Database**
3. Vyberte **KV** (Key-Value Store)
4. Zadejte název (např. `drink-orders`)
5. Vyberte region (nejblíže vašim uživatelům)
6. Klikněte na **Create**

## Krok 4: Přidejte Environment Variables

1. V projektu jděte do **Settings** → **Environment Variables**
2. V KV databázi najdete sekci **.env.local** - zkopírujte hodnoty:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
3. Přidejte tyto proměnné do Environment Variables:
   - Name: `KV_REST_API_URL`, Value: (hodnota z KV)
   - Name: `KV_REST_API_TOKEN`, Value: (hodnota z KV)
4. Ujistěte se, že jsou vybrané všechny prostředí (Production, Preview, Development)
5. Klikněte na **Save**

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

- **Free tier**: Vercel KV má zdarma 30,000 reads/day a 30,000 writes/day
- **Data persistence**: Data jsou trvale uložena v KV databázi
- **Automatický deploy**: Každý push do Git automaticky spustí nový deploy

### Troubleshooting

- **Data se nezobrazují**: Zkontrolujte, že jsou environment variables správně nastavené
- **Chyby při deploy**: Zkontrolujte logs v Vercel Dashboard → Deployments → [váš deploy] → Functions
- **KV není dostupné**: Ujistěte se, že jste vytvořili KV databázi a správně ji připojili k projektu

