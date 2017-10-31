import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#d2ebf9'
    },
    welcome: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    noteWrapper: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    note: {
        fontSize: 30,
        textAlign: 'justify',  
    },
    bold: {
        fontWeight: 'bold', 
    },
    red: {
        color: 'red'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    backButton: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5
    },
    noteDetails: {
        flex: 1,
        flexDirection: 'column',
    },
    noteTitle: {
        textAlign: 'center',
        fontSize: 35,
        margin: 20
    },
    noteBody: {
        fontSize: 30,
        textAlign: 'justify',
        margin: 20, 
    },
    editNote: {
        flex: 1,
        flexDirection: 'column'
    }
});