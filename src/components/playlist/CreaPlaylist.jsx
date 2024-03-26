import axios from "axios";
import { useState } from "react";

const CreaPlaylist = ({session, fetchPlaylist}) => {
  const [playlistFormData, setPlaylistFormData] = useState({
    playlist: ""
  });

  const handleChange = (e) => {
    setPlaylistFormData({...playlistFormData, [e.target.name]: e.target.value});
  };

  const handleSumbit = async (e) => {
      e.preventDefault();
      try{
        const response = await axios.post("http://localhost:8080/api/playlists", {
          name: playlistFormData.playlist
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(session.username + ":" + session.password)
          }
        });

        if(response.status === 201){
          console.log(response);  
          fetchPlaylist();
        }
        else{
          //TODO: Gestisci playlist non creata          
        }
      }catch (error){
        //TODO: Gestisci eccezione
        console.error("Error:", error);
      }
  };

  return (
    <>
      <div className="section-title">
        <h2>Crea playlist</h2>
      </div>
      <div className="row">
        <div className="col-md-11 form-group mb-2">
          <input
            type="text"
            className="form-control text-center"
            placeholder="Nome playlist" name="playlist"
            value={playlistFormData.playlist} onChange={handleChange}
          />
        </div>
        <div className="col-md-1 form-group mb-2">
          <button type="button" className="btn btn-success w-100" 
          onClick={handleSumbit}>Crea</button>
        </div>
      </div>
    </>
  )
}

export default CreaPlaylist