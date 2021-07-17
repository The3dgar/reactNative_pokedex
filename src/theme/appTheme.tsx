import React from "react";
import { StyleSheet, Text, View } from "react-native";

const appTheme = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  pokebolaBG: {
    width: 300,
    height: 300,
    position: "absolute",
    top: -100,
    right: -100,
    opacity: 0.3,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default appTheme;
