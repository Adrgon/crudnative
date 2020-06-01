import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  let titulo;
  const {guardarConsultarAPI} = route.params;


  // campos del formulario
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  useEffect(() => {
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa} = route.params.cliente;
      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    }
  }, []);
  const guardarCliente = async () => {
    // validar
    console.log(nombre, telefono, correo, empresa);
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      guardarAlerta(true);
      return;
    }

    // generar el cliente
    const cliente = {nombre, telefono, correo, empresa};

    if (route.params.cliente) {
      titulo = 'Actualizar Cliente';
      const {id} = route.params.cliente;
      cliente.id = id;
      const url = `http://localhost:3000/clientes/${id}`;

      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      // guardar
      titulo = 'Añadir Nuevo Cliente'
      try {
        if (Platform.OS === 'ios') {
          await axios.post('http://localhost:3000/clientes', cliente);
        } else {
          await axios.post('http://10.0.2.2:3000/clientes', cliente);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // redireccionar
    navigation.navigate('Inicio');
    // limpiar formulario (opcional)
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');

    // Cambiar a true para traernos el nuevo cliente
    guardarConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

      <TextInput
        label="Nombre"
        placeholder="Escribe tu Nombre"
        onChangeText={texto => guardarNombre(texto)}
        value={nombre}
        style={styles.input}
      />

      <TextInput
        label="Telefono"
        placeholder="9999999999"
        onChangeText={texto => guardarTelefono(texto)}
        value={telefono}
        style={styles.input}
      />

      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={texto => guardarCorreo(texto)}
        value={correo}
        style={styles.input}
      />

      <TextInput
        label="Empresa"
        placeholder="Escribe el Nombre de tu Empresa"
        onChangeText={texto => guardarEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son Obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                guardarAlerta(false);
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
