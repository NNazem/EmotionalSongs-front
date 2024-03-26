import { useEffect, useState } from "react";
import axios from "axios";

const AggiungiCanzone = ({
  session,
  listCanzoni,
  setListCanzoni,
  listPlaylist,
  selectedCanzone,
  setSelectedCanzone,
  selectedPlaylist,
  setSelectedPlaylist,
}) => {
  const [canzoneFormData, setCanzoneFormData] = useState({
    autore: "",
    titolo: "",
  });

  const handleChange = (e) => {
    setCanzoneFormData({ ...canzoneFormData, [e.target.name]: e.target.value });
  };

  const handlePlaylistChange = (e) => {
    e.preventDefault();
    setSelectedPlaylist(e.target.value);
  };

  const handleCanzoneChange = (e) => {
    e.preventDefault();
    setSelectedCanzone(e.target.value);
  };

  const fetchCanzone = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/canzone/byTitoloAndAutore?titolo=${canzoneFormData.titolo}&autore=${canzoneFormData.autore}`,
        {
          headers: {
            Authorization:
              "Basic " + btoa(session.username + ":" + session.password),
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setListCanzoni(response.data.canzoni);
        setSelectedCanzone(response.data[0].id);
      } else {
        //TODO: Gestisci errore caricamento playlist
      }
    } catch (error) {
      //TODO: Gestisci eccezione
      console.error("Error:", error);
    }
  };

  const handleCerca = async (e) => {
    e.preventDefault();
    fetchCanzone();
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      console.log(`selected canzone -> ${selectedCanzone}`);
      console.log(`selected playlist -> ${selectedPlaylist}`);

      const response = await axios.post(
        `http://localhost:8080/api/playlists/${selectedPlaylist}/canzoni?id=${selectedCanzone}`,
        {},
        {
          headers: {
            Authorization:
              "Basic " + btoa(session.username + ":" + session.password),
          },
        }
      );
      if (response.status === 200) {
        //TODO: Add message response
        console.log("Canzone aggiunta correttamente");
      }
    } catch (error) {
      //TODO: Gestisci eccezione
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="section-title">
        <h2>Aggiungi canzone</h2>
      </div>
      <div className="row">
        <div className="col-md-3 form-group mb-2">
          <input
            type="text"
            name="autore"
            className="form-control text-center"
            placeholder="Autore"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5 form-group mb-2">
          <input
            type="text"
            className="form-control text-center"
            name="titolo"
            placeholder="Titolo"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 form-group mb-2">
          <select
            value={selectedPlaylist}
            onChange={handlePlaylistChange}
            className="form-control text-center"
          >
            {listPlaylist.map((item) => (
              <option key={item.id} value={item.id} className="combobox-item">
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-1 form-group mb-2">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleCerca}
          >
            Cerca
          </button>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <div className="row">
        <div className="col-md-12 form-group mb-2">
          <select
            value={selectedCanzone}
            onChange={handleCanzoneChange}
            className="form-control text-center"
          >
            {listCanzoni.map((item) => (
              <option key={item.id} value={item.id} className="combobox-item">
                {item.titolo} - {item.autore} ({item.anno})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleInsert}
        >
          Inserisci canzone
        </button>
      </div>
    </>
  );
};

export default AggiungiCanzone;
