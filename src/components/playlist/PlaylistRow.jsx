import styled from "styled-components";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { useDeletePlaylist } from "./useDeletePlaylist";
import { HiEye, HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreatePlaylist } from "./useCreatePlaylist";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import { useNavigate } from "react-router";

const Playlist = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const NumeroCanzoni = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

function PlaylistRow({ playlist }) {
  const { isDeleting, deletePlaylist } = useDeletePlaylist();
  const { isCreating, createPlaylist } = useCreatePlaylist();
  const navigate = useNavigate();

  console.log(playlist);

  const { id: playlistId, name, numeroCanzoni, canzoni } = playlist;

  function handleDuplicate() {
    createPlaylist({
      name: `${name} (copia)`,
    });
  }

  return (
    <Table.Row>
      <Playlist>{name}</Playlist>
      <NumeroCanzoni>{numeroCanzoni}</NumeroCanzoni>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={playlistId} />
            <Menus.List id={playlistId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/playlists/${playlistId}`)}
              >
                Canzoni
              </Menus.Button>

              <Modal.Open opens={"edit"}>
                <Menus.Button icon={<HiPencil />}>Modifica</Menus.Button>
              </Modal.Open>
              <Modal.Open opens={"delete"}>
                <Menus.Button icon={<HiTrash />}>Elimina</Menus.Button>
              </Modal.Open>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplica
              </Menus.Button>
            </Menus.List>
            <Modal.Window name={"edit"}>
              <CreatePlaylistForm playlistToEdit={playlist} />
            </Modal.Window>
            <Modal.Window name={"delete"}>
              <ConfirmDelete
                resourceName={"playlist"}
                disabled={isDeleting}
                onConfirm={() => deletePlaylist(playlistId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default PlaylistRow;
