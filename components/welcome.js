import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import styles from '../styles';

export default class Welcome extends Component<{}> {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = { bold: '', red: '', name: this.props.name };
        const { navigate } = this.props.navigation;

        navigatorTimeout = setTimeout(() => {
            this.goToMain();
        }, 2000);
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
        return (
            <View style={[styles.container, styles.welcome]}>
                <Text style={styles.welcomeText} onPress={this.goToMain}>
                    Welcome to Notes
                </Text>
            </View>
            // </View>
        );
    }
}