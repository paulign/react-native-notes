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


export default class EditNote extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
        headerLeft: (
            <TouchableOpacity
                onPress={() => navigation.navigate('NoteDetails', navigation.state.params)}
            >
                <Text style={styles.backButton}>
                    Back
      </Text>
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = { bold: '', red: '', title: params.title, _id: params._id, body: params.body, height: 0, loading: false };
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        this.props.navigation.setParams({
            headerRight: (
                <TouchableOpacity
                    onPress={this.editNote}
                >
                    <Text style={styles.backButton}>
                        Save
          </Text>
                </TouchableOpacity>
            )
        });
    }

    editNote = () => {
        Keyboard.dismiss();
        this.setState({ loading: true });        
        let id = this.state._id;
        console.log(id);
        AsyncStorage.mergeItem(id, JSON.stringify({ title: this.state.title, body: this.state.body })).then((responseJson) => {
            console.log(responseJson);
            this.setState({ loading: false });            
            const navigateAction = NavigationActions.navigate({
                routeName: 'NoteDetails',
                params: { _id: id }
            });

            this.props.navigation.dispatch(navigateAction);
        });
        /* let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8"
        })
        return fetch(url + this.state._id, {
            method: 'PUT', headers: headers, body: JSON.stringify({
                title: this.state.title,
                body: this.state.body
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                const resetAction = NavigationActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Main' }),
                        NavigationActions.navigate({ routeName: 'NoteDetails', params: { _id: responseJson.note._id, title: responseJson.note.title, body: responseJson.note.body } })
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            })
            .catch((error) => {
                console.error(error);
            }); */
    }

    onSave = () => {
        this.editNote();
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