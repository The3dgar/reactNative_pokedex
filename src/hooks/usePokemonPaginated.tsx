import { useState, useRef, useEffect } from "react";
import { pokemonApi } from "../api/pokemonApi";
import {
  PokemonPaginatedResponse,
  SimplePokemon,
  Result,
} from "../interfaces/pokemonInterfaces";

const url = "https://pokeapi.co/api/v2/pokemon?limit=40";

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    []
  );

  const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=20");

  const loadPokemons = async () => {
    setIsLoading(true)
    const { data } = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current
    );
    nextPageUrl.current = data.next;
    parsePokemonList(data.results);
  };

  const parsePokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const [id] = url.split("/").slice(-2, -1);
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        picture,
        name,
      };
    });

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false)
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isLoading,
    loadPokemons
  };
};
