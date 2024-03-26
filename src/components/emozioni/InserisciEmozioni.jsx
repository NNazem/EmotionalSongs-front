import React, { useState } from "react";
import { tipoEmozioni, valutazioni } from "../../utils/constants";
import axios from "axios";

const InserisciEmozioni = ({ session, selectedPlaylist, selectedCanzone }) => {
  const [selectedEmozione, setSelectedEmozione] = useState(tipoEmozioni[0]);
  const [selectedValutazione, setSelectedValutazione] = useState(
    valutazioni[0]
  );
  const [commento, setCommento] = useState("");

  const handleChangeEmozione = (e) => {
    e.preventDefault();
    setSelectedEmozione(e.target.value);
    setSelectedValutazione(valutazioni[0]);
    setCommento("");
  };

  const handleChangeValutazione = (e) => {
    e.preventDefault();
    setSelectedValutazione(e.target.value);
  };

  const handleChangeCommento = (e) => {
    e.preventDefault();
    setCommento(e.target.value);
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      console.log(`selected emozione -> ${selectedEmozione}`);
      console.log(`selected valutazione -> ${selectedValutazione}`);
      console.log(`commento -> ${commento}`);

      const response = await axios.post(
        `http://localhost:8080/api/playlist/${selectedPlaylist}/canzone/${selectedCanzone}/emozioni`,
        {
          tipoEmozione: selectedEmozione.toUpperCase(),
          voto: selectedValutazione,
          descrizione: commento,
        },
        {
          headers: {
            Authorization:
              "Basic " + btoa(session.username + ":" + session.password),
          },
        }
      );
      if (response.status === 200) {
        //TODO: Add message response
        console.log("Emozione aggiunta correttamente");
      }
    } catch (error) {
      //TODO: Gestisci eccezione
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="row mt-2">
        <div className="col-sm">
          <select
            value={selectedEmozione}
            onChange={handleChangeEmozione}
            className="form-control text-center"
          >
            {tipoEmozioni.map((item) => (
              <option key={item} value={item} className="combobox-item">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm">
          <select
            value={selectedValutazione}
            onChange={handleChangeValutazione}
            className="form-control text-center"
          >
            {valutazioni.map((item) => (
              <option key={item} value={item} className="combobox-item">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm">
          <input
            type="text"
            className="form-control text-center"
            name="commento"
            value={commento}
            placeholder={"Commento " + selectedEmozione}
            onChange={handleChangeCommento}
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleInsert}
        >
          Inserisci emozioni
        </button>
      </div>
    </>
  );
};

export default InserisciEmozioni;
