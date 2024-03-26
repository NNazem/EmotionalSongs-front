import React from "react";
import Row from "../ui/Row";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { useMoveBack } from "../songs/useMoveBack";
import ButtonText from "../ui/ButtonText";
import SongDataBox from "../songs/SongDataBox";
import usePlaylist from "./usePlaylist";
import Spinner from "../ui/Spinner";
import Menus from "../ui/Menus";
import Table from "../ui/Table";
import SongRow from "../songs/SongRow";
import Pagination from "../ui/Pagination";
import SortBy from "../ui/SortBy";
import { useSearchParams } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function PlaylistDetail() {
  const moveBack = useMoveBack();
  const { playlist, isLoading } = usePlaylist();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const sortBy = searchParams.get("sortBy") || "id-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let filteredPlaylists = playlist.canzoni;

  const sortedPlaylists = filteredPlaylists.sort((a, b) => {
    if (a[field] && b[field]) {
      if (typeof a[field] === "number") {
        return (a[field] - b[field]) * modifier;
      } else {
        return a[field].localeCompare(b[field]) * modifier;
      }
    }
  });

  return (
    <>
      <Row type={"horizontal"}>
        <HeadingGroup>
          <Heading as="h1">Playlist: {playlist.name}</Heading>
          <SortBy
            options={[
              { value: "titolo-asc", label: "Ordina per titolo (A-Z)" },
              { value: "titolo-desc", label: "Ordina per titolo (Z-A)" },
              { value: "autore-asc", label: "Ordina per autore (A-Z)" },
              { value: "autore-desc", label: "Ordina per autore (Z-A)" },
              { value: "anno-asc", label: "Ordina per anno (crescente)" },
              { value: "anno-desc", label: "Ordina per anno (decrescente)" },
            ]}
          />
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Indietro</ButtonText>
      </Row>

      <Menus>
        <Table columns="1fr 1fr 1fr 0.5fr">
          <Table.Header>
            <div>Titolo</div>
            <div>Autore</div>
            <div>Anno</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={sortedPlaylists}
            render={(song) => (
              <SongRow key={song.id} song={song} playlistId={playlist.id} />
            )}
          />
        </Table>
      </Menus>
    </>
  );
}

export default PlaylistDetail;
