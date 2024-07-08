import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    index_container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#317bc9',
    },
    input: {
        width: '80%',
        height: 35,
        borderColor: 'grey',
        borderWidth: 2,
        paddingLeft: 5,
        marginTop: 20,
        borderRadius: 7,
        paddingLeft: 10
    },
    button: {
        width: '25%',
        height: 30,
        borderColor: 'grey',
        borderWidth: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        // backgroundColor: '#cacbcc',

    },
    delete_button: {
        width: '35%',
        height: 30,
        borderColor: 'grey',
        borderWidth: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        // backgroundColor: '#cacbcc',

    },
    index_button: {
        width: '100%',
        height: 30,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:3,
        backgroundColor: '#317bc9',

    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    card: {
        backgroundColor: '',
        marginTop: 30,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 13,
    },
    linkButton: {
        marginLeft: 5,
    },
    linkText: {
        color: 'blue',
        fontSize: 13,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: -5,
        color: '#333',
        marginTop: 20,
    },
    section: {
        marginBottom: 10,
        marginLeft: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        marginBottom: 5,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    noOrdersText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
    new_order_container: {
        flex: 1,
        padding: 16,
    },
    modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
    },
    submitButton: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "grey",
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    submitButtonText: {
        color: "white",
        // fontWeight: "bold",
    },
    date: {
        marginTop: 20,
        borderRadius: 30,
        color: 'black',
    },
    inputWithButtonContainer: {
        position: "relative",
        marginTop: 20,
    },
    inputWithButton: {
        width: "100%",
        height: 40,
        borderColor: "grey",
        borderWidth: 2,
        paddingLeft: 10,
        borderRadius: 7,
        paddingRight: 80,
    },
    inputContainer: {
        marginTop: 20,
    },
    new_order_button: {
        width: '35%',
        height: 35,
        borderColor: 'grey',
        borderWidth: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    new_order_input: {
        width: "100%",
        height: 40,
        borderColor: "grey",
        borderWidth: 2,
        paddingLeft: 10,
        borderRadius: 7,
    },
    errorText: {
        color: 'red',
        marginTop: 8,
    },
    disabled_button_text: {
        color: '#bdbdbd'
    },
    buttonDisabled: {
        width: '25%',
        height: 30,
        borderColor: '#cacccf',
        borderWidth: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#d5d7db',
    },
    new_order_buttonDisabled: {
        width: '35%',
        height: 35,
        borderColor: '#cacccf',
        borderWidth: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#d5d7db',
    },
    date_button: {
        width: '35%',
        height: 32,
        borderColor: 'transparent',
        borderWidth: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginRight: 5,
        backgroundColor: '#e0dcdc'
    },
    time_button: {
        width: '25%',
        height: 32,
        borderColor: 'transparent',
        borderWidth: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#e0dcdc'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 140,
        resizeMode: 'contain',
        borderRadius: 15,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e2024',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#1e2024',
        textAlign: 'justify',
        marginBottom: 20,
    },
    contact_container: {
        padding: 20,
    },
    intro: {
        fontSize: 16,
        marginBottom: 20,
    },
    contact_section: {
        marginBottom: 20,
    },
    contact_label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    contact_content: {
        fontSize: 16,
        marginBottom: 5,
    },
    contact_description: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },

});

export default styles;