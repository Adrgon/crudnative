import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';

import axios from 'axios';

import globalStyles from '../styles/global';

const DetallesCliente = ({navigation, route}) => {
  console.log(route.params);
  const {guardarConsultarAPI} = route.params;
  const {nombre, telefono, correo, empresa, id} = route.params.item;

  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Deseas Eliminar este Cliente?',
      'Un Mensaje eliminado no se puede recuperar',
      [
        {text: 'Si, Eliminar', onPress: () => eliminarContacto()},
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  const eliminarContacto = async () => {
    //console.log("eliminando", id);
    try {
      const url = `http://localhost:3000/clientes/${id}`;
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }

    // Redireccionar
    navigation.navigate('Inicio');

    // Volver a consultar la API
    //guardarConsutarAPI(true);
    guardarConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Telefono: <Subheading>{telefono}</Subheading>
      </Text>

      <Button
        mode="contained"
        icon="cancel"
        style={styles.boton}
        onPress={() => mostrarConfirmacion()}>
        Eliminar Cliente
      </Button>

      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NuevoCliente', {
            cliente: route.params.item,
            guardarConsultarAPI,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    marginBottom: 20,
  },
  boton: {
    marginTop: 20,
    backgroundColor: 'red',
  },
});

export default DetallesCliente;
