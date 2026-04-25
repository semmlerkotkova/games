import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { age, players, duration, energy, situation } = await req.json()

  const situationMap: Record<string, string> = {
    auto: 'v autě nebo ve vlaku (bez pohybu, ticho)',
    restaurace: 'v restauraci (u stolu, s minimálním hlukem)',
    cekarna: 'v čekárně (omezený prostor, nutný klid)',
    vylet: 'na výletě venku (volný pohyb, příroda)',
  }

  const energyMap: Record<string, string> = {
    klidne: 'klidné a unavené',
    stredne: 'středně aktivní',
    divoce: 'plné energie a divočiny',
  }

  const prompt = `Vymysli jednu konkrétní interaktivní hru pro děti. Parametry:
- Věk dětí: ${age}
- Počet hráčů: ${players}
- Délka hry: ${duration} minut
- Nálada/energie dětí: ${energyMap[energy] || energy}
- Situace: ${situationMap[situation] || situation}

Hra musí být offline (bez telefonu/internetu), bez speciálních pomůcek a vhodná pro danou situaci.

Odpověz ve formátu JSON:
{
  "title": "Název hry (max 5 slov)",
  "description": "Popis hry: jak se hraje, pravidla, co je cílem. Max 5 vět, srozumitelně pro rodiče."
}

Odpověz pouze JSON, žádný jiný text.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'Chyba při generování hry' }, { status: 500 })
  }

  const data = await response.json()
  const text = data.content[0].text

  try {
    const game = JSON.parse(text)
    return NextResponse.json(game)
  } catch {
    return NextResponse.json({ error: 'Nepodařilo se zpracovat odpověď AI' }, { status: 500 })
  }
}
