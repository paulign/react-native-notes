/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  Easing,
  Animated,
  Button,
  TouchableOpacity
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Main from './components/main';
import Welcome from './components/welcome';
import NoteDetails from './components/note-details';
import EditNote from './components/edit-note';
import AddNote from './components/add-note'
import styles from './styles';

export const App = StackNavigator({
  Welcome: { screen: Welcome },
  Main: {
    screen: Main, navigationOptions: ({ navigation }) => ({
      headerTitle: `Notes List.`,
      headerLeft: null,
      headerRight:
      <TouchableOpacity 
      onPress={() => { navigation.navigate('AddNote'); }}
      >
        <Text style={styles.backButton}>
          Add
        </Text>
      </TouchableOpacity>
    })
  },
  NoteDetails: {
    screen: NoteDetails, navigationOptions: ({ navigation }) => ({
      headerTitle: `Notes List.`,
      headerLeft:
      <TouchableOpacity 
      onPress={() => { navigation.navigate('Main'); }}
      >
        <Text style={styles.backButton}>
          Back
        </Text>
      </TouchableOpacity>
    })
  },
  EditNote: { screen: EditNote },
  AddNote: {screen: AddNote, navigationOptions: ({ navigation }) => ({
    headerTitle: `Notes List.`,
    headerLeft:
    <TouchableOpacity 
    onPress={() => { navigation.navigate('Main'); }}
    >
      <Text style={styles.backButton}>
        Back
      </Text>
    </TouchableOpacity>
  })}
},
  {
    headerMode: 'screen',
    mode: 'card',
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        backgroundColor: 'lightblue',
      }
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  });


