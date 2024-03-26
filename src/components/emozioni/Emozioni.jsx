import React, { useContext, useState, useEffect } from "react";
import CercaCanzone from "./CercaCanzone";
import InserisciEmozioni from "./InserisciEmozioni";
import { Context } from "../../App";
import axios from "axios";

const Emozioni = () => {
  const { session, setSession } = useContext(Context);

  const [listPlaylist, setListPlaylist] = useState([]);
  const [selectedCanzone, setSelectedCanzone] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/playlists", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa(session.username + ":" + session.password),
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setListPlaylist(response.data);
        setSelectedPlaylist(response.data[0].id);
      } else {
        //TODO: Gestisci errore caricamento playlist
      }
    } catch (error) {
      //TODO: Gestisci eccezione
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <>
      <div className="section-title">
        <h2>Emozioni</h2>
      </div>
      <CercaCanzone
        session={session}
        listPlaylist={listPlaylist}
        selectedPlaylist={selectedPlaylist}
        setSelectedPlaylist={setSelectedPlaylist}
        selectedCanzone={selectedCanzone}
        setSelectedCanzone={setSelectedCanzone}
      />
      <hr className="mt-4 mb-4" />
      <InserisciEmozioni
        session={session}
        selectedPlaylist={selectedPlaylist}
        selectedCanzone={selectedCanzone}
      />
    </>
  );
};

export default Emozioni;
