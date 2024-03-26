import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080/api/";

export async function createPlaylist({ nomePlaylist, username, password }) {
  console.log(`Nome playlist ${nomePlaylist}`);
  try {
    const response = await axios.post(
      API_URL + "playlists",
      {
        name: nomePlaylist,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      }
    );

    if (response.status === 201) {
      return response;
    } else {
      throw new Error("Create Playlist failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPlaylists() {
  try {
    const headers = {};

    const username = localStorage.getItem("usernameOrEmail");
    const password = localStorage.getItem("password");
    headers["Authorization"] = "Basic " + btoa(username + ":" + password);

    const response = await axios.get(API_URL + "playlists", { headers });
    console.log(response.data);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Get Playlists failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPlaylist(id) {
  try {
    const headers = {};

    const username = localStorage.getItem("usernameOrEmail");
    const password = localStorage.getItem("password");
    headers["Authorization"] = "Basic " + btoa(username + ":" + password);

    const response = await axios.get(API_URL + `playlists/${id}`, { headers });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Get Playlists failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function handleInsert({ selectedCanzone, selectedPlaylist }) {
  try {
    const headers = {};

    const username = localStorage.getItem("usernameOrEmail");
    const password = localStorage.getItem("password");
    headers["Authorization"] = "Basic " + btoa(username + ":" + password);

    const response = await axios.post(
      `http://localhost:8080/api/playlists/${selectedPlaylist}/canzoni?id=${selectedCanzone}`,
      {},
      { headers }
    );
    if (response.status === 200) {
      //TODO: Add message response
    }
  } catch (error) {
    //TODO: Gestisci eccezione
    console.error("Error:", error);
  }
}

export async function handleDelete({ selectedCanzone, selectedPlaylist }) {
  try {
    const headers = {};

    const username = localStorage.getItem("usernameOrEmail");
    const password = localStorage.getItem("password");
    headers["Authorization"] = "Basic " + btoa(username + ":" + password);

    const response = await axios.delete(
      `http://localhost:8080/api/playlists/${selectedPlaylist}/canzoni?id=${selectedCanzone}`,
      { headers }
    );
    if (response.status === 200) {
      //TODO: Add message response
      toast.success("Canzone rimossa dalla playlist");
    }
  } catch (error) {
    //TODO: Gestisci eccezione
    console.error("Error:", error);
  }
}

export async function createEditPlaylist(playlist, id) {
  if (!id) {
    try {
      const headers = {};

      const username = localStorage.getItem("usernameOrEmail");
      const password = localStorage.getItem("password");
      const response = await fetch("http://localhost:8080/api/playlists", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playlist),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        return await response.json();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    try {
      const response = await fetch(
        "http://localhost:8080/api/playlists/" + id,
        {
          method: "PUT",
          headers: {
            Authorization: "Basic " + btoa("Prova:Prova"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlist),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        return await response.json();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export async function deletePlaylist(id) {
  try {
    const headers = {};

    const username = localStorage.getItem("usernameOrEmail");
    const password = localStorage.getItem("password");
    headers["Authorization"] = "Basic " + btoa(username + ":" + password);

    const response = await fetch("http://localhost:8080/api/playlists/" + id, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("Non è stato possibile eliminare la playlist");
    } else {
      return response;
    }
  } catch (error) {
    throw new Error("Non è stato possibile eliminare la playlist");
  }
}
