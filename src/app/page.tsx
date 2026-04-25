'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { SavedGame, GameParams } from '@/lib/types'

const SITUATION_OPTIONS = [
  { value: 'auto', label: '🚗 Auto / vlak' },
  { value: 'restaurace', label: '🍽️ Restaurace' },
  { value: 'cekarna', label: '🏥 Čekárna' },
  { value: 'vylet', label: '🌳 Výlet venku' },
]

const ENERGY_OPTIONS = [
  { value: 'klidne', label: '😴 Klidné' },
  { value: 'stredne', label: '😊 Středně' },
  { value: 'divoce', label: '🤪 Divočina' },
]

const AGE_OPTIONS = [
  { value: '2-4', label: '2–4 roky' },
  { value: '4-6', label: '4–6 let' },
  { value: '6-9', label: '6–9 let' },
  { value: '9-12', label: '9–12 let' },
  { value: '6+', label: '6+ (mix)' },
]

const PLAYERS_OPTIONS = [
  { value: '1', label: '1 hráč' },
  { value: '2', label: '2 hráči' },
  { value: '3-4', label: '3–4 hráči' },
  { value: '5+', label: '5 a více' },
]

const DURATION_OPTIONS = [
  { value: '5', label: '5 minut' },
  { value: '10', label: '10 minut' },
  { value: '20', label: '20 minut' },
  { value: '30', label: '30+ minut' },
]

type GeneratedGame = { title: string; description: string }

export default function Home() {
  const [params, setParams] = useState<GameParams>({
    age: '4-6',
    players: '2',
    duration: '10',
    energy: 'stredne',
    situation: 'auto',
  })
  const [generatedGame, setGeneratedGame] = useState<GeneratedGame | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedGames, setSavedGames] = useState<SavedGame[]>([])
  const [tab, setTab] = useState<'generate' | 'saved'>('generate')
  const [error, setError] = useState('')

  const supabase = createClient()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchSavedGames() }, [])

  async function fetchSavedGames() {
    const { data } = await supabase
      .from('saved_games')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setSavedGames(data)
  }

  async function generateGame() {
    setLoading(true)
    setError('')
    setGeneratedGame(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setGeneratedGame(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Nepodařilo se vygenerovat hru. Zkus to znovu.')
    } finally {
      setLoading(false)
    }
  }

  async function saveGame() {
    if (!generatedGame) return
    setSaving(true)
    const { error } = await supabase.from('saved_games').insert({
      title: generatedGame.title,
      description: generatedGame.description,
      age: params.age,
      players: params.players,
      duration: params.duration,
      energy: params.energy,
      situation: params.situation,
    })
    setSaving(false)
    if (!error) {
      await fetchSavedGames()
      setTab('saved')
    }
  }

  async function deleteGame(id: number) {
    await supabase.from('saved_games').delete().eq('id', id)
    setSavedGames((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <div>
      {/* Záložky */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('generate')}
          className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${
            tab === 'generate'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          🎲 Generovat hru
        </button>
        <button
          onClick={() => setTab('saved')}
          className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${
            tab === 'saved'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          ⭐ Oblíbené ({savedGames.length})
        </button>
      </div>

      {tab === 'generate' && (
        <div className="space-y-4">
          {/* Formulář */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <Select
              label="Věk dětí"
              value={params.age}
              onChange={(v) => setParams({ ...params, age: v })}
              options={AGE_OPTIONS}
            />
            <Select
              label="Počet hráčů"
              value={params.players}
              onChange={(v) => setParams({ ...params, players: v })}
              options={PLAYERS_OPTIONS}
            />
            <Select
              label="Délka hry"
              value={params.duration}
              onChange={(v) => setParams({ ...params, duration: v })}
              options={DURATION_OPTIONS}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Energie / nálada dětí
              </label>
              <div className="flex gap-2">
                {ENERGY_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setParams({ ...params, energy: o.value })}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-medium border transition-colors ${
                      params.energy === o.value
                        ? 'bg-amber-100 border-amber-400 text-amber-800'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Situace
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SITUATION_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setParams({ ...params, situation: o.value })}
                    className={`py-2 px-3 rounded-xl text-sm font-medium border transition-colors ${
                      params.situation === o.value
                        ? 'bg-amber-100 border-amber-400 text-amber-800'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generateGame}
            disabled={loading}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 text-amber-900 font-bold rounded-2xl transition-colors text-lg"
          >
            {loading ? '⏳ Generuji hru...' : '✨ Vygenerovat hru'}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          {generatedGame && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-amber-300">
              <h2 className="text-xl font-bold text-amber-900 mb-2">
                🎮 {generatedGame.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {generatedGame.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={saveGame}
                  disabled={saving}
                  className="flex-1 py-2 bg-green-100 hover:bg-green-200 text-green-800 font-semibold rounded-xl text-sm transition-colors"
                >
                  {saving ? 'Ukládám...' : '⭐ Uložit do oblíbených'}
                </button>
                <button
                  onClick={generateGame}
                  className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  🔄 Jiná hra
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'saved' && (
        <div className="space-y-3">
          {savedGames.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm">
              <p className="text-4xl mb-3">⭐</p>
              <p className="font-medium">Zatím žádné oblíbené hry</p>
              <p className="text-sm mt-1">Vygeneruj hru a ulož ji sem!</p>
            </div>
          ) : (
            savedGames.map((game) => (
              <div key={game.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">🎮 {game.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      {game.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {game.situation && <Tag>{situationLabel(game.situation)}</Tag>}
                      {game.age && <Tag>👶 {game.age} let</Tag>}
                      {game.players && <Tag>👥 {game.players} hráčů</Tag>}
                      {game.duration && <Tag>⏱ {game.duration} min</Tag>}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGame(game.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 text-xl leading-none"
                    title="Smazat"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200">
      {children}
    </span>
  )
}

function situationLabel(situation: string) {
  const map: Record<string, string> = {
    auto: '🚗 Auto/vlak',
    restaurace: '🍽️ Restaurace',
    cekarna: '🏥 Čekárna',
    vylet: '🌳 Výlet',
  }
  return map[situation] || situation
}
