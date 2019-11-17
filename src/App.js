import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';

function App() {
  const [artista, setArtista] = useState('');
  const [letra, setLetra] = useState([]);
  const [info, setInfo] = useState({});

  const consultarAPILetra = async busqueda => {
    const url = `https://api.lyrics.ovh/v1/${busqueda.artista}/${busqueda.cancion}`;
    const respuesta = await axios.get(url);

    setArtista(busqueda.artista);
    setLetra(respuesta.data.lyrics);
  };

  const consultarAPIInfo = async () => {
    if (artista) {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const respuesta = await axios.get(url);

      setInfo(respuesta.data.artists[0]);
    }
  };

  useEffect(() => {
    consultarAPIInfo();
  }, [artista]);

  return (
    <Fragment>
      <Formulario
        consultarAPILetra={consultarAPILetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
