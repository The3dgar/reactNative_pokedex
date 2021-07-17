import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

import SearchScreen from '../screens/SearchScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {
    simplePokemon: SimplePokemon;
    color: string
  };
};

const Stack = createStackNavigator<RootStackParams>();

const TabListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="HomeScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default TabListNavigator;
