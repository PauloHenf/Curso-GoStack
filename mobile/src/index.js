import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';
//View: div, footer, header, main, aside, section
//Text: p, span, strong, h2, h2, h3

//Não possuem significado
//Não possuem estilização própria
//Todos componentes por padrão possuem display: flex

export default function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject () {
    const response = await api.post('projects', { 
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Diego Fernandes'
    });

    const project = response.data;
    
    setProjects([ ...projects, project])
  };

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />

      <SafeAreaView style={styles.container}>

        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.projects}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button} 
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}> Adicionar Projeto</Text>

        </TouchableOpacity>

      </SafeAreaView>
      {/* <View style={styles.container} >
        {projects.map(project => <Text style={styles.projects} key={project.id}>{project.title}</Text>)}
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    // justifyContent: 'center',
    // alignItems: 'center',
  },   

  projects: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },  

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});