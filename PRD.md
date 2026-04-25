# PRD: Hry pro děti — AI generátor

## Problém
Rodiče potřebují rychlé nápady na interaktivní offline hry pro děti při čekání u doktora, v restauraci, v autě nebo ve vlaku. Chtějí doporučení na míru podle aktuální situace a nálady dětí.

## Cílový uživatel
Rodič (nebo prarodič) s dětmi, který potřebuje okamžitou zábavu bez internetu a přípravy.

## User Stories
- Jako rodič chci zadat věk dětí, počet hráčů, délku, energii a situaci, abych dostal nápad na hru přesně pro tuhle chvíli.
- Jako rodič chci nechat AI vygenerovat novou hru na základě parametrů, abych nemusel přemýšlet sám.
- Jako rodič chci uložit hru do oblíbených, abych ji mohl použít znovu.
- Jako rodič chci zobrazit seznam oblíbených her, abych měl rychlý přístup k osvědčeným hrám.
- Jako rodič chci smazat hru z oblíbených, abych měl seznam přehledný.

## MVP Scope

### In scope
- Formulář s parametry: věk dětí, počet hráčů, délka hry, energie dětí, situace (auto/restaurace/čekárna/výlet)
- AI generuje nápad na hru podle zadaných parametrů
- Uložit vygenerovanou hru do oblíbených
- Zobrazit seznam oblíbených her
- Smazat hru z oblíbených

### Out of scope
- Hodnocení her (palec nahoru/dolů)
- Sdílení her s ostatními rodiči
- Přihlášení a sync mezi zařízeními
- Historie vygenerovaných her
- Kategorie a tagy oblíbených

## Datový model

### Tabulka: saved_games
| Sloupec | Typ | Popis |
|---------|-----|-------|
| id | integer generated always as identity | Primární klíč |
| title | text | Název hry |
| description | text | Popis a pravidla hry |
| age | text | Věk dětí (parametr) |
| players | text | Počet hráčů (parametr) |
| duration | text | Délka hry (parametr) |
| energy | text | Energie dětí (parametr) |
| situation | text | Situace — auto/restaurace/čekárna/výlet |
| created_at | timestamptz | Datum uložení (default now()) |
| user_id | uuid | Reference na auth.users (pro pozdější auth) |

## SQL pro Supabase

Viz `migrations/001_initial.sql`
