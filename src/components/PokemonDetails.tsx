import React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import appTheme from '../theme/appTheme';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

const PokemonDetails = ({pokemon}: Props) => {
  const {} = useSafeAreaInsets();
  return (
    <ScrollView
      style={{...StyleSheet.absoluteFillObject}}
      showsVerticalScrollIndicator={false}>
      {/* types */}
      <View style={{...styles.container, marginTop: 400}}>
        <Text style={styles.title}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map((t, i) => (
            <Text key={i} style={{...styles.regularText, marginRight: 10}}>
              {t.type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight} lbs</Text>
      </View>
      {/* sprites */}
      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>
      <ScrollView horizontal={true}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* habilidades */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Habilidades bases</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map((t, i) => (
            <Text key={i} style={{...styles.regularText, marginRight: 10}}>
              {t.ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* movimientos */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map((t, i) => (
            <Text key={i} style={{...styles.regularText, marginRight: 10}}>
              {t.move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((t, i) => (
            <View
              key={i}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{...styles.regularText, marginRight: 10}}>
                {t.stat.name}
              </Text>
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  fontWeight: 'bold',
                }}>
                {t.base_stat}
              </Text>
            </View>
          ))}
        </View>

        {/* sprite final */}
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 110,
    height: 110,
  },
});
