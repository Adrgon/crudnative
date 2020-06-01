import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {List, Headline, Button, FAB} from 'react-native-paper';

import axios from 'axios';

import globalStyles from '../styles/global';
const Inicio = ({navigation}) => {
  const [clientes, guardarClientes] = useState([]);
  const [consultarAPI, guardarConsultarAPI] = useState(true);
  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        // De esta forma solo funciona con ios falta el condicional para android
        const resultado = await axios.get('http://localhost:3000/clientes');
        //console.log(resultado.data);
        guardarClientes(resultado.data);
        guardarConsultarAPI(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (consultarAPI) {
      obtenerClientesAPI();
    }
  }, [consultarAPI]);

  return (
    <View style={globalStyles.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() =>
          navigation.navigate('NuevoCliente', {guardarConsultarAPI})
        }>
        Nuevo Cliente
      </Button>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'Aun no hay Clientes'}
      </Headline>
      <FlatList
        data={clientes}
        keyExtractor={cliente => cliente.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() =>
              navigation.navigate('DetallesCliente', {
                item,
                guardarConsultarAPI
              })}
          />
        )}
      />
      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NuevoCliente', {guardarConsultarAPI})
        }
      />
    </View>
  );
};

export default Inicio;
