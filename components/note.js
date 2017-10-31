import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, 
    TextInput,
    CheckBox
} from 'react-native';

import styles from '../styles';


export default class Note extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = { bold: '', red: '', sectionID: this.props.sectionID, rowID: this.props.rowID, checked: false, title: this.props.title, _id: this.props._id, body: this.props.body };
    }

    componentWillReceiveProps(nextProps){
        if(this.props.sectionID != nextProps.sectionID || this.props.rowID != nextProps.rowID || this.props.title != nextProps.title || this.props.id != nextProps.id || this.props.body != nextProps.body){
            this.setState({title: nextProps.title, _id: nextProps._id, body: nextProps.body})
        }
    }

    onCheck = () => {
        this.setState({checked: !this.state.checked});
        if (this.state.bold == '') {
            this.setState({ bold: 'bold' });
        }
        else {
            this.setState({ bold: '' });
        }
    }

    onLongPressText = () => {
        if (this.state.bold == '') {
            this.setState({ bold: 'bold' });
        }
        else {
            this.setState({ bold: '' });
        }
    }

    onInputText = (event) => {
        this.setState({title: event.nativeEvent.text});
        this.textInput.clear();
    }

    render() {
        return (
                <Text style={[styles.note, styles[this.state.bold]]}>
                    {+this.state.rowID + 1}. {this.state.title}
                </Text>
        );
    }
}