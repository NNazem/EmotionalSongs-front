# Emotional Songs: Documentazione API

Documentazione richieste API utilizzate per la gestione del progetto Emotional Songs.

# Auth

Controller per la gestione delle operazioni di autenticazione e registrazione degli utenti.

## Register

### Url

**POST**

> /auth/register

### Descrizione

Gestisce la richiesta di registrazione di un nuovo utente

### Autenticazione

Non necessita di autenticazione

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

```
{
    "nome":"",
    "cognome":"",
    "indirizzo":"",
    "email":"",
    "username":"",
    "codiceFiscale":"",
    "password":""
}
```

### Risposte di esempio

#### Status

201 Created

#### Risposta

Utente registrato correttamente

---

#### Status

400 Bad Request

#### Risposta

```
{
	"timeStamp":"2023-12-17T14:09:09.3834614",
	"message":"Username inserito è già esistente!",
	"details":"uri=/api/auth/register"
}
```

## Login

### Url

**POST**

> /auth/login

### Descrizione

Gestisce la richiesta di login di un utente esistente

### Autenticazione

Non necessita di autenticazione

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

```
{
    "usernameOrEmail": "",
    "password": ""
}
```

### Risposte di esempio

#### Status

200 OK

#### Risposta

Utente loggato con successo

---

# Canzone

Controller per la gestione delle richieste relative alle canzoni.
Fornisce endpoint per la ricerca e il recupero di informazioni sulle canzoni.

## GetCanzoniByTitolo

### Url

**GET**

> /canzone

### Descrizione

Ottiene una lista di canzoni filtrate per titolo

### Autenticazione

Non necessita di autenticazione

### Parametri della richiesta

| Parametro | Tipo   | Descrizione          |
| --------- | ------ | -------------------- |
| titolo    | string | Titolo della canzone |

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "canzoni": [
        {
            "id": ,
            "idUtente": ,
            "titolo": "",
            "autore": "",
            "anno": ""
        }
    ],
    "numeroPagine": 1,
    "numeroCanzoni": 1
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T15:31:56.0675463",
    "message": "Nessuna canzone corrisponde ai termini di ricerca",
    "details": "uri=/api/canzone"
}
```

---

## GetCanzoneByTitoloAndAutore

### Url

**GET**

> /canzone/byTitoloAndAutore

### Descrizione

Ottiene una lista di canzoni filtrate per titolo e autore.

### Autenticazione

Non necessita di autenticazione

### Parametri della richiesta

| Parametro | Tipo   | Descrizione          |
| --------- | ------ | -------------------- |
| titolo    | string | Titolo della canzone |
| autore    | string | Nome dell'autore     |

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "canzoni": [
        {
            "id": ,
            "idUtente": ,
            "titolo": "",
            "autore": "",
            "anno": ""
        }
    ],
    "numeroPagine": 1,
    "numeroCanzoni": 1
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T15:31:56.0675463",
    "message": "Nessuna canzone corrisponde ai termini di ricerca",
    "details": "uri=/api/canzone/byTitoloAndAutore"
}
```

## GetCanzoneByAnnoAndAutore

### Url

**GET**

> /canzone/byAutoreAndAnno

### Descrizione

Ottiene una lista di canzoni filtrate per autore e anno.

### Autenticazione

Non necessita di autenticazione

### Parametri della richiesta

| Parametro | Tipo   | Descrizione                              |
| --------- | ------ | ---------------------------------------- |
| autore    | string | Nome completo autore o stringa contenuta |
| anno      | string | Anno esatto da ricercare                 |

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "canzoni": [
        {
            "id": ,
            "idUtente": ,
            "titolo": "",
            "autore": "",
            "anno": ""
        }
    ],
    "numeroPagine": 1,
    "numeroCanzoni": 1
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T15:31:56.0675463",
    "message": "Nessuna canzone corrisponde ai termini di ricerca",
    "details": "uri=/api/canzone/byAutoreAndAnno"
}
```

## GetCanzoneById

### Url

**GET**

> /canzone/byId

### Descrizione

Ottiene la canzone con l'ID selezionato

### Autenticazione

Non necessita di autenticazione

### Parametri della richiesta

| Parametro | Tipo   | Descrizione             |
| --------- | ------ | ----------------------- |
| id        | string | ID canzone da ricercare |

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "id": ,
    "idUtente": ,
    "titolo": "",
    "autore": "",
    "anno": ""
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T15:31:56.0675463",
    "message": "Canzone non trovata con id: ID_CANZONE",
    "details": "uri=/api/canzone/byId"
}
```

# Emozione

Controller per la gestione delle emozioni associate alle canzoni nelle playlist.
Fornisce endpoint API per aggiungere, ottenere e rimuovere emozioni.

## GetEmozioni

### Url

**GET**

> /canzone/{ID_CANZONE}/emozioni

### Descrizione

Recupera le emozioni associate a una canzone

### Autenticazione

Non necessita di autenticazione

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "TIPO_EMOZIONE": {
        "tipoEmozione": "",
        "media": ,
        "voto": ,
        "commentoUtente": "",
        "commentiUtenti": []
    }
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T16:05:59.8189646",
    "message": "Canzone non trovata con id: ID_CANZONE",
    "details": "uri=/api/canzone/{ID_CANZONE}/emozioni"
}
```

## AddEmozione

### Url

**POST**

> /playlist/{ID_PLAYLIST}/canzone/{ID_CANZONE}/emozioni

### Descrizione

Aggiunge un'emozione a una canzone in una playlist.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

```
{
    "tipoEmozione": "",
    "voto": "",
    "descrizione": ""
}
```

### Risposte di esempio

#### Status

200 OK

#### Risposta

Emozione NOSTALGIA associata correttamente.

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T16:25:29.6467534",
    "message": "L'emozione TIPO_EMOZIONE è già associata alla canzone con id: {ID_CANZONE}",
    "details": "uri=/api/playlist/{ID_PLAYLIST}/canzone/{ID_CANZONE}/emozioni"
}
```

#### Status

401 Unauthorized

# Playlist

## AddPlaylist

### Url

**POST**

> /playlists

### Descrizione

Gestisce la richiesta POST per creare una nuova playlist.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

```
{
    "name": ""
}
```

### Risposte di esempio

#### Status

201 Created

#### Risposta

```
{
    "id": 7,
    "name": "",
    "canzoni": [],
    "numeroCanzoni": 0
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T17:17:33.1612338",
    "message": "Playlist con questo nome già esistente: NOME_PLAYLIST",
    "details": "uri=/api/playlists"
}
```

---

#### Status

401 Unauthorized

## GetPlaylist

### Url

**GET**

> /playlists/{ID_PLAYLIST}

### Descrizione

Gestisce la richiesta GET per ottenere una playlist tramite ID.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "id": ,
    "name": "",
    "canzoni": [
        {
            "id": ,
            "idUtente": ,
            "titolo": "",
            "autore": "",
            "anno": ""
        }
    ],
    "numeroCanzoni": 1
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T17:52:09.8022375",
    "message": "Playlist non trovate con l'id: {ID_PLAYLIST}",
    "details": "uri=/api/playlists/{ID_PLAYLIST}"
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T17:53:15.4356224",
    "message": "Playlist con l'id: ID_PLAYLIST non associata con l'utente: NOME_UTENTE",
    "details": "uri=/api/playlists/{ID_PLAYLIST}"
}
```

---

#### Status

401 Unauthorized

## GetAllPlaylist

### Url

**GET**

> /playlists

### Descrizione

Gestisce la richiesta GET per ottenere tutte le playlist.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "id": ,
    "name": "",
    "canzoni": [
        {
            "id": ,
            "idUtente": ,
            "titolo": "",
            "autore": "",
            "anno": ""
        }
    ],
    "numeroCanzoni": 1
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T17:52:09.8022375",
    "message": "Playlist non trovate con l'id: {ID_PLAYLIST}",
    "details": "uri=/api/playlists/{ID_PLAYLIST}"
}
```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T17:53:15.4356224",
    "message": "Playlist con l'id: ID_PLAYLIST non associata con l'utente: NOME_UTENTE",
    "details": "uri=/api/playlists/{ID_PLAYLIST}"
}
```

---

#### Status

401 Unauthorized

## GetAllPlaylist

### Url

**DEL**

> /playlists/{ID_PLAYLIST}

### Descrizione

Gestisce la richiesta DELETE di eliminazione di una playlist per ID.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

Playlist eliminata con successo

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T21:24:26.6412721",
    "message": "Playlist con l'id: {ID_PLAYLIST} non associata con l'utente: USERNAME_UTENTE",
    "details": "uri=/api/playlists/{ID_PLAYLIST}"
}
```

---

#### Status

401 Unauthorized

# PlaylistSong

## AddCanzoneToPlaylist

### Url

**POST**

> /playlists/{ID_PLAYLIST}/canzoni

### Descrizione

Gestisce la richiesta di aggiunta di una canzone a una playlist.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

| Parametro | Tipo   | Descrizione |
| --------- | ------ | ----------- |
| id        | string | Id canzone  |

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

---

#### Status

500 Internal Server Error

#### Risposta

```

{
    "timestamp": "2023-12-17T20:41:54.517+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "path": "/api/playlists/{ID_PLAYLIST}/canzoni"
}

```

---

#### Status

401 Unauthorized

## RemoveCanzoneFromPlaylist

### Url

**DEL**

### Descrizione

Gestisce la richiesta di rimozione di una canzone da una playlist.

> /playlists/{ID_PLAYLIST}/canzoni

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

| Parametro | Tipo   | Descrizione |
| --------- | ------ | ----------- |
| id        | string | Id canzone  |

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

---

#### Status

404 Not Found

#### Risposta

```
{
    "timestamp": "2023-12-17T20:53:44.584+00:00",
    "status": 404,
    "error": "Not Found",
    "path": "/api/playlists/{ID_PLAYLIST}/canzoni"
}
```

---

#### Status

401 Unauthorized

## GetAllCanzoniInPlaylist

### Url

**GET**

> /playlists/{ID_PLAYLIST}/canzoni

### Descrizione

Gestisce la richiesta di recupero di tutte le canzoni in una playlist.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
[
    {
        "id": ,
        "idUtente": ,
        "titolo": "",
        "autore": "",
        "anno": ""
    }
]

```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T22:04:27.6610999",
    "message": "Playlist non trovate con l'id: {ID_PLAYLIST}",
    "details": "uri=/api/playlists/{ID_PLAYLIST}/canzoni"
}

```

---

#### Status

401 Unauthorized

## GetPlaylistWithCanzoni

### Url

**GET**

> /playlists/{ID_PLAYLIST}/canzoni/playlist

### Descrizione

Gestisce la richiesta di recupero di una playlist con tutte le sue canzoni.

### Autenticazione

    Authorization: "Basic " + btoa(username + ":" + password)

### Parametri della richiesta

Non sono richiesti paramentri

### Corpo della richiesta

Non è richiesto il corpo della richiesta

### Risposte di esempio

#### Status

200 OK

#### Risposta

```
{
    "id": ,
    "name": "",
    "canzoni": [
        {
            "id": ,
            "idUtente": ,
            "titolo": "",
            "autore": "",
            "anno": ""
        }
    ],
    "numeroCanzoni":
}

```

---

#### Status

400 Bad Request

#### Risposta

```
{
    "timeStamp": "2023-12-17T22:04:27.6610999",
    "message": "Playlist non trovate con l'id: {ID_PLAYLIST}",
    "details": "uri=/api/playlists/{ID_PLAYLIST}/canzoni/playlist"
}

```

---

#### Status

401 Unauthorized
