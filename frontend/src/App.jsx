import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header.jsx';

import './App.css';

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Diego Fernandes"
    });

    const project = response.data;

    setProjects([...projects, project]);

  }

  return (
  <>
    <Header title="Projects" />

    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul> 

    <button type="button" onClick={handleAddProject}> Adicionar Projeto </button>
  </>
  );
}

export default App;