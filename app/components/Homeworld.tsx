'use client'
import { useEffect, useState } from 'react'

interface Homeworld {
  name: string
  population: string
}

export const Homeworld = ({ homeworldUrl }: { homeworldUrl: string }) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null)

  useEffect(() => {
    const fetchHomeworld = async (): Promise<void> => {
      try {
        const response = await fetch(homeworldUrl)
        if (!response.ok) {
          throw new Error(
            `Failed to fetch homeworld data (Status: ${response.status})`
          )
        }

        const homeworldData: Homeworld = await response.json()
        setHomeworld(homeworldData)
      } catch (error) {
        console.error('Error fetching homeworld data:', error)
      }
    }

    fetchHomeworld()
  }, [homeworldUrl])

  return (
    <>
      {homeworld && (
        <>
          <p>Homeworld: {homeworld.name}</p>
          <p>Population: {homeworld.population}</p>
        </>
      )}
    </>
  )
}
