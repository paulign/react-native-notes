import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    View,
    Keyboard,
    AsyncStorage,
    RefreshControl
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import styles from '../styles';

const url = "https://paulign-notes-api.herokuapp.com/api/notes/";


export default class AddNote extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add new note',
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
    });

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = { bold: '', red: '', title: '', _id: '', body: '', height: 0, loading: false };
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        this.props.navigation.setParams({
            headerRight: (
                <TouchableOpacity
                    onPress={this.addNote}
                >
                    <Text style={styles.backButton}>
                        Save
          </Text>
                </TouchableOpacity>
            )
        });
    }


    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    addNote = () => {
        this.setState({ loading: true });
        Keyboard.dismiss();
        let id = this.guid();
        AsyncStorage.setItem(id, JSON.stringify({ _id: id, title: this.state.title, body: this.state.body })).then((responseJson) => {
            this.setState({ loading: false });
            const navigateAction = NavigationActions.navigate({
                routeName: 'Main',
            })

            this.props.navigation.dispatch(navigateAction)
        })

        /* let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8"
        })
        return fetch(url + this.state._id, {
            method: 'POST', headers: headers, body: JSON.stringify({
                title: this.state.title,
                body: this.state.body
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const navigateAction = NavigationActions.navigate({
                      routeName: 'Main',
                    })
                    
                    this.props.navigation.dispatch(navigateAction)
            })
            .catch((error) => {
                console.error(error);
            }); */
    }

    onSave = () => {
        this.addNote();
    }

    handleContentSizeChange = ({ nativeEvent }) => {
        const { height } = nativeEvent.contentSize
        this.setState({
            inputHeight: height > MAX_INPUT_HEIGHT ? MAX_INPUT_HEIGHT : height
        })
    }

    render() {

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        colors={['lightblue']}
                    />
                }>
                <KeyboardAvoidingView behavior={'padding'}>
                    <View>
                        <TextInput placeholder="Type title" style={styles.noteTitle} value={this.state.title} onChangeText={(text) => this.setState({ title: text })} ref={input => { this.titleInput = input }} />
                        <TextInput placeholder="Type note" style={styles.noteBody} onContentSizeChange={(event) => {
                            this.setState({ height: event.nativeEvent.contentSize.height });
                        }} underlineColorAndroid={'transparent'} multiline={true} autoGrow={true} value={this.state.body} onChangeText={(text) => this.setState({ body: text })} ref={input => { this.bodyInput = input }} />
                    </View>
                    <View style={{ height: 60 }} />
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}