import React, { useContext, useState, useEffect } from "react";

import { Context } from "../../App";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import AddPlaylist from "./AddPlaylist";
import PlaylistTable from "./PlaylistTable";
import PlaylistTableOperations from "./PlaylistTableOperations";
import AddPlaylistTwo from "./AddPlaylistTwo";

const Playlists = () => {
  const { session, setSession } = useContext(Context);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tutte le Playlist</Heading>
        <PlaylistTableOperations />
      </Row>

      <Row>
        <PlaylistTable />

        <AddPlaylistTwo />
      </Row>
    </>
  );
};

export default Playlists;
