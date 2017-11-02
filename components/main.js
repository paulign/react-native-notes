import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import Note from './note';
import styles from '../styles';

const url = "https://paulign-notes-api.herokuapp.com/api/notes/";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Main extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
    });

    constructor(props) {
        super(props);
        this.state = {
            data: '', loading: true,
            dataSource: ds.cloneWithRows([]),
            notesToDelete: []
        };
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        this.setState({ loading: true });
        return AsyncStorage.getAllKeys().then(keys => {
            return AsyncStorage.multiGet(keys)
        }).then((result) => {
            {
                return result.map((r) => { return JSON.parse(r[1]) });
            }
        }).then(data => {
            console.log(data);
            if (data) {
                this.setState({ dataSource: ds.cloneWithRows(data), loading: false });
            }
        });

        /* return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let data = [];
                for (let i in responseJson) {
                    data.push(responseJson[i]);
                }
                console.log(data)
                this.setState({ dataSource: ds.cloneWithRows(data), loading: false });
            })
            .catch((error) => {
                console.error(error);
            }); */
    }

    deleteNote(id) {
        AsyncStorage.removeItem(id).then(() => {
            this.getNotes();
        })
        /* let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8"
        })
        return fetch(url + id, {
            method: 'DELETE', headers: headers
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.getNotes();
            })
            .catch((error) => {
                console.error(error);
            }); */
    }

    renderRow = (rowData, sectionID, rowID) => {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.noteWrapper}>
                <TouchableOpacity onPress={() => navigate('NoteDetails', rowData)}>
                    <Note sectionID={sectionID} rowID={rowID} _id={rowData._id} title={rowData.title} body={rowData.body} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.deleteNote(rowData._id) }}>
                    <Text>Del</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onCheck(rowdata) {
        let notesToDelete = [];
        rowData.checked = !rowData.checked;
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this.getNotes.bind(this)}
                            colors={['lightblue']}
                        />
                    }
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                />
            </View>

        );
    }
}