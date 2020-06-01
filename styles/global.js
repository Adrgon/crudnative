import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: '2.5%',
    },
    titulo: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: 30,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20,
      },    
});

export default globalStyles;