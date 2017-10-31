import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import styles from '../styles';

const url = "https://paulign-notes-api.herokuapp.com/api/notes/";

export default class NoteDetails extends Component<{}> {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = { loading: true, bold: '', red: '', title: '', _id: params._id, body: '' };
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null
    });

    componentWillMount() {
        this.getNote();
    }

    getNote() {
        this.setState({ loading: true });
        return AsyncStorage.getItem(this.state._id).then((response) => JSON.parse(response))
        .then((note) => {
            console.log(note)

            this.setState({ loading: false, title: note.title, body: note.body });
            const { navigate } = this.props.navigation;
            this.props.navigation.setParams({
                headerRight: (
                    <TouchableOpacity
                        onPress={() => navigate('EditNote', { title: this.state.title, _id: this.state._id, body: this.state.body })}
                    >
                        <Text style={styles.backButton}>
                            Edit
              </Text>
                    </TouchableOpacity>
                )
            });
        })
        /* return fetch(url + this.state._id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.note)
                let note = responseJson.note;
                this.setState({ loading: false, title: responseJson.note.title, body: responseJson.note.body });
                const { navigate } = this.props.navigation;
                this.props.navigation.setParams({
                    headerRight: (
                        <TouchableOpacity
                            onPress={() => navigate('EditNote', { title: this.state.title, _id: this.state._id, body: this.state.body })}
                        >
                            <Text style={styles.backButton}>
                                Edit
                  </Text>
                        </TouchableOpacity>
                    )
                });
            })
            .catch((error) => {
                console.error(error);
            }); */
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView >
                <ActivityIndicator
                    animating={this.state.loading}
                    size="small"
                    color={'darkblue'} />
                <Text style={styles.noteTitle}>
                    {this.state.title}
                </Text>
                <Text style={styles.noteBody}>
                    {this.state.body}
                </Text>
            </ScrollView>
        );
    }
}
