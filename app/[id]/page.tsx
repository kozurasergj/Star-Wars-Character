'use client'
import { useEffect, useState } from 'react';
import { formatBirthDate } from '../page';
import { Homeworld } from '../components/Homeworld';
import { Starships } from '../components/Starships';


interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  starships: string[];
}

export default function Characters({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://swapi.dev/api/people/${params.id}/`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data (Status: ${response.status})`);
        }

        const result: Character = await response.json();
        setCharacter(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <section className='p-5 mx-auto bg-gray-900 text-white'>
      {character ? (
        <div className='text-gray-900 font-bold text-xl mb-2 text-center bg-gray-800 p-4 rounded-lg'>
          <h1 className='text-yellow-500'>{character.name}</h1>
          <p>Birth Date: {formatBirthDate(character.birth_year)}</p>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Hair Color: {character.hair_color}</p>
          <p>Skin Color: {character.skin_color}</p>
          <p>Eye Color: {character.eye_color}</p>
          <p>Gender: {character.gender}</p>
          <Homeworld homeworldUrl={character.homeworld} />
          <Starships starshipUrls={character.starships} />
        </div>
      ) : (
        <p className='text-white'>Loading...</p>
      )}
    </section>
  )
}
