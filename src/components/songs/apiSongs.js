import axios from "axios";

export async function fetchCanzone({ titolo, autore, anno, sortBy, page }) {
  try {
    let url = `http://localhost:8080/api/canzone`;
    if (titolo) {
      url += `?titolo=${titolo}`;
    } else {
      url += `/byAutoreAndAnno?autore=${autore}&anno=${anno}`;
    }

    console.log(url);

    if (sortBy && sortBy.field && sortBy.direction) {
      url += `&orderBy=${sortBy.field}&orderDirection=${sortBy.direction}`;
    }

    if (page) {
      url += `&page=${page}`;
    }

    const response = await axios.get(url);

    console.log(response);

    if (response.status === 200) {
      let data = response.data;

      /* da rivedere non funziona
      if (anno !== "") {
        data = data.filter((x) => x.anno === anno);
      }
      */

      return data;
    }
    throw new Error("Error fetching songs");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getSong(id) {
  try {
    const localResponse = await fetch(
      "http://localhost:8080/api/canzone/byId?id=" + id,
      {
        method: "GET",
        headers: { Authorization: "Basic " + btoa("Prova:Prova") },
      }
    );

    if (!localResponse.ok) {
      throw new Error(
        "Non è stato possibile recuperare la canzone dalla tua API"
      );
    }

    const songData = await localResponse.json();
    const titolo = songData.titolo;
    const autore = songData.autore;

    // API di Discogs
    const discogsResponse = await fetch(
      `https://api.discogs.com/database/search?track=${titolo}&artist=${autore}&key=IpZujHfIVDdZTtcjNsnV&secret=CXVXABLURGZEunbpDfBkTUKvhsnMCUYT`,
      {
        method: "GET",
      }
    );

    if (!discogsResponse.ok) {
      return songData;
    }

    const discogsData = await discogsResponse.json();
    const sortedResults = discogsData.results.sort(
      (a, b) =>
        b.community.have - a.community.have ||
        b.community.want - a.community.want
    );
    const firstResult = sortedResults[0];

    if (!firstResult) {
      return songData;
    }

    // cover image
    const coverImage =
      firstResult.cover_image ||
      "https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg";

    return { ...songData, coverImage: coverImage }; //  canzone con cover image
  } catch (error) {
    throw new Error("Errore nel recupero della canzone: " + error.message);
  }
}

export async function fetchVisualizzaEmozioni(id, isAuthenticated) {
  try {
    const headers = {};

    if (isAuthenticated) {
      const username = localStorage.getItem("usernameOrEmail");
      const password = localStorage.getItem("password");
      headers["Authorization"] = "Basic " + btoa(username + ":" + password);
    }

    const response = await axios.get(
      `http://localhost:8080/api/canzone/${id}/emozioni`,
      { headers }
    );

    if (response.status === 200) {
      var data = response.data;
      return data;
    } else {
      // Gestisci errore caricamento emozioni
    }
  } catch (error) {
    // Gestisci eccezione
    console.error("Error:", error);
  }
}

export async function insertEmozione(
  playlistId,
  canzoneId,
  emozione,
  valutazione,
  descrizione
) {
  try {
    console.log(valutazione);
    const response = await axios.post(
      `http://localhost:8080/api/playlist/${playlistId}/canzone/${canzoneId}/emozioni`,
      {
        tipoEmozione:
          typeof emozione === "string" ? emozione.toUpperCase() : emozione,
        voto: valutazione,
        descrizione: descrizione,
      },
      {
        headers: {
          Authorization:
            "Basic " +
            btoa(
              localStorage.getItem("usernameOrEmail") +
                ":" +
                localStorage.getItem("password")
            ),
        },
      }
    );

    if (response.status === 200) {
      console.log("Emozione aggiunta correttamente");
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
