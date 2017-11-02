import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Animated
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import styles from '../styles';

export default class Welcome extends Component<{}> {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = { fadeAnim: new Animated.Value(0) };
        const { navigate } = this.props.navigation;

        navigatorTimeout = setTimeout(() => {
            this.goToMain();
        }, 5000);
    }

    componentDidMount(){
        console.log(this.state.fadeAnim);
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 2000,              // Make it take a while
            }
          ).start(); 
    }

    goToMain = () => {
        // const { navigate } = this.props.navigation;
        if (navigatorTimeout) {
            clearTimeout(navigatorTimeout);
        }
        const navigateAction = NavigationActions.navigate({
            
              routeName: 'Main',
            })
            
            this.props.navigation.dispatch(navigateAction)
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View style={[styles.container, styles.welcome, {opacity: fadeAnim}]}>
                <Text style={styles.welcomeText} onPress={this.goToMain}>
                    Welcome to Notes
                </Text>
            </Animated.View>
            // </View>
        );
    }
}