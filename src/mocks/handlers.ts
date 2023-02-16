import { rest } from 'msw'

//mock data
export const mockPlayers = [
  {
    conference: 'AFC',
    division: 'WEST',
    drafted: 2017,
    first_name: 'Patrick',
    id: 61,
    last_name: 'Mahomes',
    number: 15,
    position: 'QB',
    position_type: 'OFF',
    team: 'KC'
  },
  {
    conference: 'NFC',
    division: 'EAST',
    drafted: 2020,
    first_name: 'Jalen',
    id: 22,
    last_name: 'Hurts',
    number: 1,
    position: 'QB',
    position_type: 'OFF',
    team: 'PHI'
  }
]

export const mockDaily = {
  id: 1,
  first_name: 'Denzel',
  last_name: 'Ward',
  conference: 'AFC',
  division: 'NORTH',
  position: 'CB',
  position_type: 'OFF',
  team: 'CLE',
  drafted: 2018,
  daily_date: '2022-01-22',
  daily_number: 3
}

export const handlers = [
  // Handles a POST /login request
  rest.get('http://127.0.0.1:8000/api/players/', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(mockPlayers)
    )
  })
]
