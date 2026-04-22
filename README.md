# Vibe Coding Workshop Kit

Workshop materiály pro **Hack Your Way 2026** — "Od nápadu k deploynuté appce za 3 hodiny"

## Quick Start

```bash
# 1. Naklonuj tento kit do nového adresáře pro svůj projekt
git clone https://github.com/[TBD]/workshop-kit.git moje-appka
cd moje-appka

# 2. Spusť Claude Code
claude

# 3. Ověř, že máš vše připravené + založí ti GitHub repo
/hack-check

# 4. Začni s PRD agentem
/hack-prd
```

## Dostupné příkazy

V Claude Code napiš `/hack` a uvidíš autocomplete se všemi příkazy.

### Základní track — projdeš v tomhle pořadí

| Příkaz | Co dělá | Kdy použít |
|--------|---------|------------|
| `/hack-check` | Ověří prerekvizity + založí vlastní GitHub repo | Ještě před workshopem |
| `/hack-prd` | Provede tě tvorbou zadání → GitHub Issue s PRD + backlog issues | Na začátku — první krok |
| `/hack-scaffold` | Z PRD vygeneruje celou appku | Po dokončení PRD |
| `/hack-deploy` | Deploy na Vercel → živá URL | Když chceš appku na internet |
| `/hack-feature` | Branch + implementace + PR | Kdykoliv chceš vylepšit appku |
| `/hack-review` | Druhý pár očí — projde změny na PR (bezpečnost, UX, soulad s PRD) | Po každé větší feature |

### Advanced track — pro rychlejší, volitelné

| Příkaz | Co dělá | Kdy použít |
|--------|---------|------------|
| `/hack-feature-pro` | Orchestrátor — rozdělí task mezi backend + frontend + test subagenty | Větší feature, co se dotýká DB i UI |
| `/hack-test` | Nastaví Vitest a napíše první testy | Když máš hotovou základní appku a chceš seriózní projekt |
| `/hack-ci` | Nastaví GitHub Actions pipeline (lint + typecheck + test + build) | Po `/hack-test`, nebo samostatně bez testů |
| `/hack-agent` | Vytvoř si vlastního Claude Code agenta (custom command) | Když chceš pochopit jak agenti fungují a napsat vlastního |

## Úroveň účastníka

Agenti se přizpůsobují tvé úrovni (basic / advanced). `/hack-check` se
tě na úroveň zeptá a uloží ji do `.participant-level`. Ostatní agenti si soubor
přečtou a upraví chování — basic dostane víc hand-holdingu, advanced víc challenge.

Default je `basic`. Úroveň kdykoliv přepíšeš otevřením `.participant-level`
v editoru. Můžeš ji také změnit řečí — napiš agentovi "zjednoduš mi to" nebo
"nemusíš mi to vysvětlovat" a přizpůsobí se.

## Prerekvizity

- [Node.js 18+](https://nodejs.org)
- [Git](https://git-scm.com)
- [Claude Code](https://docs.claude.com/en/docs/claude-code) (vyžaduje Claude Pro/Max)
- [GitHub účet](https://github.com) + [GitHub CLI (`gh`)](https://cli.github.com)
- [Supabase účet](https://supabase.com) (free tier)
- [Vercel účet](https://vercel.com) (free tier)

## Stack

- **Next.js** — React framework (App Router, TypeScript)
- **Supabase** — PostgreSQL databáze + autentizace
- **Tailwind CSS** — styling
- **Vercel** — hosting a automatický deploy

## Typický flow

```
/hack-check        →  Ověřím prerekvizity, založím tvé GitHub repo
/hack-prd          →  Vytvořím PRD jako GitHub Issue + backlog issues
                          Spustím SQL v Supabase SQL Editoru
/hack-scaffold     →  Vygeneruji celou appku, pushnu na GitHub
                          npm run dev → vidím appku lokálně
/hack-deploy       →  Deploy na Vercel → živá URL!
/hack-feature      →  Branch + implementace + PR + Vercel preview
/hack-review       →  Druhá AI projde PR, najde problémy
                          Merge → auto-redeploy
```

### Git workflow

Po prvním deployi (z `main`) jde každá další feature přes branch:

```
feat/<nazev>  →  push  →  PR  →  Vercel preview  →  review  →  merge  →  auto-deploy
```

Commit messages používají conventional format: `feat:`, `fix:`, `refactor:`,
`style:`, `ci:`, `chore:`, `docs:`.

### Když jsi rychle hotový

```
/hack-test         →  Vitest + první testy
/hack-ci           →  GitHub Actions pipeline
/hack-feature-pro  →  Větší feature s orchestrátorem
/hack-agent        →  Postav vlastního Claude Code agenta
```
