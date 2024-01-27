'use client'
import { useEffect, useState } from 'react'

interface Starship {
  name: string
  model: string
  passengers: string
}

export const Starships = ({ starshipUrls }: { starshipUrls: string[] }) => {
  const [starships, setStarships] = useState<Starship[]>([])

  useEffect(() => {
    const fetchStarships = async (): Promise<void> => {
      const starshipsData = await Promise.all(
        starshipUrls.map(async (starshipUrl) => {
          try {
            const response = await fetch(starshipUrl)
            if (!response.ok) {
              throw new Error(
                `Failed to fetch starship data (Status: ${response.status})`
              )
            }

            const starshipData: Starship = await response.json()
            return starshipData
          } catch (error) {
            console.error('Error fetching starship data:', error)
            return null
          }
        })
      )

      setStarships(starshipsData.filter(Boolean) as Starship[])
    }

    fetchStarships()
  }, [starshipUrls])

  return (
    <>
      {starships.length > 0 && (
        <>
          <p>Starships:</p>
          <ul>
            {starships.map((starship, index) => (
              <li key={index}>
                {starship.name} (Model: {starship.model}, Passengers:{' '}
                {starship.passengers})
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
