import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import { Player, SearchBarProps } from '../constants/types'
import { useSearchbar } from '../hooks/useSearchbar'
import { Loader } from './Loader.Spinner'
import { motion } from 'framer-motion'

export function SearchBar({
  onPlayerSubmit,
  disabled,
  placeholder,
  emptyListLabel
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false)

  const searchbar = useSearchbar(searchValue)
  const { list, isLoading } = searchbar

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (selectedPlayer === null) {
      return
    }
    onPlayerSubmit(selectedPlayer)
    setSearchValue('')
    setSelectedPlayer(null)
  }

  return (
    <div className="w-full relative">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2
        }}
        onSubmit={handleSubmit}
        className="flex flex-row mx-auto rounded-lg w-full my-4 pl-4 max-w-5xl bg-zinc-900 border focus-within:border-zinc-400 border-zinc-600 items-center"
      >
        <FontAwesomeIcon
          className="text-zinc-600 text-lg"
          icon={faMagnifyingGlass}
        />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="outline-none bg-zinc-900 rounded-md py-4 px-4 w-full"
          type="text"
          onFocus={() => setIsOnFocus(true)}
          onBlur={() => setIsOnFocus(false)}
        />
        <button
          type="submit"
          className="bg-sky-800 hover:bg-sky-900 focus:border-zinc-400 focus:border-l focus:bg-sky-800 px-6 py-4 rounded-r-lg h-full"
        >
          Guess
        </button>
      </motion.form>

      {isOnFocus && !disabled && (
        <div className="flex left-0 right-0 mx-auto max-h-72 absolute overflow-y-scroll flex-col w-full max-w-5xl border rounded-md border-zinc-600 bg-zinc-800 z-30">
          {isLoading && (
            <div className="flex flex-1 justify-center p-4">
              <Loader />
            </div>
          )}

          {!isLoading && list.length === 0 && (
            <span className="p-4 text-zinc-600 text-center">
              {emptyListLabel ? emptyListLabel : 'No results'}
            </span>
          )}

          {!isLoading &&
            list.map((player, index) => {
              const isFirst = index === 0
              return (
                <button
                  type="button"
                  onMouseDown={() => {
                    setSearchValue(`${player.first_name} ${player.last_name}`)
                    setIsOnFocus(false)
                    setSelectedPlayer(player)
                  }}
                  key={index}
                  className={`p-4 hover:bg-zinc-900 text-left ${
                    !isFirst && 'border-t border-zinc-600 pt-4'
                  }`}
                >
                  {player.first_name} {player.last_name} ({player.team})
                </button>
              )
            })}
        </div>
      )}
    </div>
  )
}
