import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

interface Props {
  pokemon: SimplePokemon;
}

const PokemonCard = ({pokemon}: Props) => {
  const {id, name, picture} = pokemon;
  const [bgColor, setBgColor] = useState('grey');
  const {navigate} = useNavigation();
  const isMounted = useRef(true);

  const loadColor = async () => {
    if (!isMounted.current) return;
    try {
      const colors = await ImageColors.getColors(picture, {
        fallback: 'grey',
        cache: true,
      });

      colors.platform === 'ios'
        ? setBgColor(colors.background)
        : setBgColor(colors.dominant || 'grey');
    } catch (error) {
      console.log(error.toString(), picture);
    }
  };

  useEffect(() => {
    loadColor();

    return () => {
      // cuando el compo se desmonta
      isMounted.current = false;
    };
  }, []);

  const onPress = () => {
    navigate('PokemonScreen', {
      simplePokemon: pokemon,
      color: bgColor
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={{...styles.container, backgroundColor: bgColor}}>
        <View>
          <Text style={styles.name}>{name + '\n#' + id}</Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={picture} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 120,
    width: width * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    // sombra
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: 'hidden',
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  img: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -5,
    bottom: -5,
  },
});
