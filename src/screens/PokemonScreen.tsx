import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootStackParams} from '../navigation/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={{...styles.backButton, top: top + 10}}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        <Text
          style={{
            ...styles.pokemonName,
            top: top + 40,
          }}>
          {name + '\n'} {color}
        </Text>

        {/* pokebola */}

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />

        {/* pokemon */}
        <FadeInImage uri={picture} style={styles.image} />
      </View>

      {/* detalles  */}

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomEndRadius: 1000,
    borderBottomStartRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokebola: {
    height: 250,
    width: 250,
    position: 'absolute',
    bottom: 0,
    opacity: 0.5,
  },
  image: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
