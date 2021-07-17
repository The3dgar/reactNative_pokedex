import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePokemonPaginated } from "../hooks/usePokemonPaginated";
import {
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import appTheme from "../theme/appTheme";
import PokemonCard from "../components/PokemonCard";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();

  // if (isLoading) return <ActivityIndicator size="large" color="red" />;

  return (
    <>
      <Image
        source={require("../assets/pokebola.png")}
        style={appTheme.pokebolaBG}
      />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <FlatList
          data={simplePokemonList}
          keyExtractor={(p) => p.id}
          ListHeaderComponent={
            <Text
              style={{
                ...appTheme.title,
                ...appTheme.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
              }}
            >
              Pokedex!
            </Text>
          }
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          // infinity scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            <ActivityIndicator
              style={{ height: 100 }}
              color="red"
              size="large"
            />
          }
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
