import Spinner from "../ui/Spinner";
import React from "react";
import PlaylistRow from "./PlaylistRow";
import usePlaylist from "./usePlaylists";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import { useSearchParams } from "react-router-dom";
import usePlaylists from "./usePlaylists";

export default function PlaylistTable() {
  const { isLoading, playlists } = usePlaylists();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filteredValue = searchParams.get("playlistType") || "all";

  let filteredPlaylists;

  if (filteredValue === "all") {
    filteredPlaylists = playlists;
  }
  if (filteredValue === "no-songs") {
    filteredPlaylists = playlists.filter(
      (playlist) => playlist.numeroCanzoni == 0
    );
  }
  if (filteredValue === "with-songs") {
    filteredPlaylists = playlists.filter(
      (playlist) => playlist.numeroCanzoni > 0
    );
  }

  const sortBy = searchParams.get("sortBy") || "id-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedPlaylists = filteredPlaylists.sort((a, b) => {
    if (typeof a[field] === "number") {
      return (a[field] - b[field]) * modifier;
    } else {
      return a[field].localeCompare(b[field]) * modifier;
    }
  });

  return (
    <Menus>
      <Table columns="1fr 1fr 0.1fr">
        <Table.Header>
          <div>Titolo</div>
          <div>Numero canzoni</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedPlaylists}
          render={(playlist) => (
            <PlaylistRow key={playlist.id} playlist={playlist} />
          )}
        />
      </Table>
    </Menus>
  );
}
