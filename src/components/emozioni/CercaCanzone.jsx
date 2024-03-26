import React, { useState } from "react";
import axios from "axios";

const CercaCanzone = ({
  session,
  listPlaylist,
  selectedPlaylist,
  setSelectedPlaylist,
  selectedCanzone,
  setSelectedCanzone,
}) => {
  const [listCanzoni, setListCanzoni] = useState([]);

  const [canzoneFormData, setCanzoneFormData] = useState({
    autore: "",
    titolo: "",
  });

  const handlePlaylistChange = (e) => {
    e.preventDefault();
    setSelectedPlaylist(e.target.value);
  };

  const handleChange = (e) => {
    setCanzoneFormData({ ...canzoneFormData, [e.target.name]: e.target.value });
  };

  const handleCerca = (e) => {
    e.preventDefault();
    fetchCanzone();
  };

  const handleCanzoneChange = (e) => {
    e.preventDefault();
    setSelectedCanzone(e.target.value);
  };

  const fetchCanzone = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/playlists/${selectedPlaylist}/canzoni`,
        {
          headers: {
            Authorization:
              "Basic " + btoa(session.username + ":" + session.password),
          },
        }
      );

      if (response.status === 200) {
        var data = response.data;

        if (canzoneFormData.autore !== "") {
          data = data.filter((x) =>
            x.autore
              .toLowerCase()
              .includes(canzoneFormData.autore.toLowerCase())
          );
        }

        if (canzoneFormData.titolo !== "") {
          data = data.filter((x) =>
            x.titolo
              .toLowerCase()
              .includes(canzoneFormData.titolo.toLowerCase())
          );
        }

        if (data.length > 0) {
          console.log(data);
          setListCanzoni(data);
          setSelectedCanzone(data[0].id);
        }
      } else {
        //TODO: Gestisci errore caricamento playlist
      }
    } catch (error) {
      //TODO: Gestisci eccezione
      console.error("Error:", error);
    }
  };

  return (
    <>
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
            name="titolo"
            className="form-control text-center"
            placeholder="Titolo"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 form-group mb-2">
          <select
            value={selectedPlaylist}
            className="form-control text-center"
            onChange={handlePlaylistChange}
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
    </>
  );
};

export default CercaCanzone;
