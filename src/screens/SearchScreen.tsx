import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import appTheme from '../theme/appTheme';
import {usePokemonSearch} from '../hooks/usePokemonSearch';

import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  // para trabajar el valor de searchInput en el padre
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const {isFetching, simplePokemonList} = usePokemonSearch();

  useEffect(() => {
    if (term.length === 0) return setPokemonFiltered([]);

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(
          p => p.picture && p.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemon = simplePokemonList.find(p => p.id === term);
      setPokemonFiltered(pokemon ? [pokemon] : []);
    }
  }, [term]);

  if (isFetching) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? top : top + 10,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: '100%',
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />
      <FlatList
        data={pokemonFiltered}
        keyExtractor={p => p.id}
        ListHeaderComponent={
          <Text
            style={{
              ...appTheme.title,
              ...appTheme.globalMargin,
              paddingBottom: 10,
              marginTop: Platform.OS === 'ios' ? top : top + 60,
            }}>
            {term}
          </Text>
        }
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
