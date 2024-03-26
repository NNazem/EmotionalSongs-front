import React from "react";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Table from "../ui/Table";
import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";
import { useParams } from "react-router";
import usePostCanzone from "./usePostCanzone";
import useDeleteCanzone from "./useDeleteCanzone";
import { useUser } from "../login/useUser";
import usePlaylists from "./usePlaylists";

const StyledAddPlaylist = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & > div:not(${Table.Body}) {
    /* Esclude StyledTable dagli stili */
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const PlaylistTitle = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;
function AddPlaylist() {
  const { isLoading, error, playlists } = usePlaylists();
  const { deleteSong, isDeleting } = useDeleteCanzone();
  const { insert, isInserting } = usePostCanzone();
  const { songId } = useParams();

  function handleClickPost(playlistId) {
    insert({ selectedCanzone: songId, selectedPlaylist: playlistId });
  }

  function handleClickDelete(playlistId) {
    deleteSong({ selectedCanzone: songId, selectedPlaylist: playlistId });
  }

  return (
    <StyledAddPlaylist>
      <Heading as="h3">Aggiungi canzone </Heading>
      <p>Seleziona la tua playlist a cui aggiungere la canzone</p>
      <Menus>
        <Table columns="0.8fr 0.5fr 0.1fr">
          <Table.Header>
            <div>Nome</div>
            <div>Numero canzoni</div>
          </Table.Header>
          <Table.Body
            data={
              playlists
                ? playlists.sort((a, b) => a.name.localeCompare(b.name))
                : []
            }
            render={(item) => (
              <Table.Row key={`${item.id}`}>
                <PlaylistTitle>{item.name}</PlaylistTitle>
                <div>{item.numeroCanzoni}</div>
                {item.canzoni &&
                item.canzoni.some((song) => song.id == songId) ? (
                  <ButtonIcon>
                    <HiMiniMinus onClick={() => handleClickDelete(item.id)} />
                  </ButtonIcon>
                ) : (
                  <ButtonIcon onClick={() => handleClickPost(item.id)}>
                    <HiMiniPlus />
                  </ButtonIcon>
                )}
              </Table.Row>
            )}
          />
        </Table>
      </Menus>
    </StyledAddPlaylist>
  );
}

export default AddPlaylist;
