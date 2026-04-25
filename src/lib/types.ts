export type SavedGame = {
  id: number
  title: string
  description: string
  age: string | null
  players: string | null
  duration: string | null
  energy: string | null
  situation: string | null
  created_at: string
  user_id: string | null
}

export type GameParams = {
  age: string
  players: string
  duration: string
  energy: string
  situation: string
}
