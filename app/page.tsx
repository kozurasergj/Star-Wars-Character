'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Character {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
}

interface ApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Character[]
}

export function formatBirthDate(birthYear: string) {
  const birthDate = new Date()

  const isBBY = birthYear.toLowerCase().includes('bby')

  if (isBBY) {
    const yearsBBY = Number(birthYear.replace('BBY', '').trim())
    const currentYear = new Date().getFullYear()
    const birthYearStandard = currentYear - yearsBBY

    birthDate.setFullYear(birthYearStandard)
    birthDate.setMonth(0)
    birthDate.setDate(1)

    const formattedDate = birthDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    return formattedDate
  } else {
    return 'Unknown'
  }
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://swapi.dev/api/people/'

      try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch data (Status: ${response.status})`)
        }

        const result: ApiResponse = await response.json()
        setCharacters(result.results)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className='bg-gray-800 min-h-screen flex flex-col items-center p-6'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 rounded-md'
        />
      </div>

      {filteredCharacters.length > 0 ? (
        <div className='text-white'>
          <ul>
            {filteredCharacters.map((character, index) => (
              <li key={index} className='border-b border-gray-700 py-4'>
                <h2 className='text-2xl font-semibold mb-2'>
                  {character.name}
                </h2>
                <p>
                  <span className='font-bold'>Height:</span> {character.height}
                </p>
                <p>
                  <span className='font-bold'>Mass:</span> {character.mass}
                </p>
                <p>
                  <span className='font-bold'>
                    Birth Date: {formatBirthDate(character.birth_year)}
                  </span>
                </p>
                <p>
                  <span className='font-bold'>Gender:</span> {character.gender}
                </p>
                <Link href={`${index + 1}`}>Link</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className='text-white'>
          {searchTerm ? 'No matching characters' : 'Loading...'}
        </p>
      )}
    </main>
  )
}
