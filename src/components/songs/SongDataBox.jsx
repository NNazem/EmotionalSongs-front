import styled from "styled-components";
import useEmozioni from "./useEmozioni";
import Menus from "../ui/Menus";
import Table from "../ui/Table";
import Spinner from "../ui/Spinner";
import { useUser } from "../login/useUser";
import Slider from "@mui/joy/Slider";
import Button from "../ui/Button";
import { useSearchParams } from "react-router-dom";
import EmozioniChart from "../informazioni/EmozioniChart";
import Modal from "../ui/Modal";
import AddEmozioni from "./AddEmozioni";
import AddPlaylist from "../playlist/AddPlaylist";
import ButtonGroup from "../ui/ButtonGroup";
import { useMoveBack } from "./useMoveBack";

const StyledSongDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  display: flex;
  overflow: hidden;
`;

const SongCover = styled.div`
  width: 250px;
  height: 250px;
  background-color: var(--color-grey-300); // Placeholder color
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SongInfoWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 1rem 2rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
`;

const SongInfo = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmozioneTitle = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function SongDataBox({ song }) {
  const { titolo, anno, autore, coverImage } = song;
  const { emozioni = [], isLoading } = useEmozioni();
  const moveBack = useMoveBack();
  const { isAuthenticated } = useUser();
  const [searchParams] = useSearchParams();

  const playlistId = searchParams.get("playlistId");

  if (isLoading) return <Spinner />;

  const commentiPerEmozione = Object.entries(emozioni).flatMap(
    ([tipoEmozione, dettagli]) => {
      return dettagli.commentiUtenti.map((commento) => ({
        emozione: tipoEmozione,
        commento: commento,
      }));
    }
  );

  return (
    <>
      <StyledSongDataBox>
        <SongCover>
          {coverImage ? (
            <img
              src={coverImage}
              alt={`Cover of ${titolo}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "Nessuna immagine di copertina"
          )}
        </SongCover>
        <SongInfoWrapper>
          <Header>Titolo : {titolo}</Header>
          <SongInfo>
            <p>Autore: {autore} </p>
            <p>Anno: {anno}</p>
          </SongInfo>
        </SongInfoWrapper>
      </StyledSongDataBox>
      <EmozioniChart emozioni={emozioni} />

      <ButtonGroup>
        <Modal>
          {isAuthenticated && (
            <>
              <Modal.Open opens="Aggiungi a playlist">
                <Button variation="primary">Aggiungi a playlist</Button>
              </Modal.Open>
              {playlistId && (
                <Modal.Open opens="Aggiungi emozioni">
                  <Button variation="danger">Aggiungi emozioni</Button>
                </Modal.Open>
              )}
              <Modal.Window name={"Aggiungi a playlist"}>
                <AddPlaylist />
              </Modal.Window>
              <Modal.Window name={"Aggiungi emozioni"}>
                <AddEmozioni />
              </Modal.Window>
            </>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Indietro
          </Button>
        </Modal>
      </ButtonGroup>

      <Menus>
        <Table columns="0.5fr 0.62fr">
          <Table.Header>
            <div>Emozione</div>
            <div>Commenti degli utenti</div>
          </Table.Header>
          <Table.Body
            data={commentiPerEmozione}
            render={(item) => (
              <Table.Row key={`${item.emozione}-${item.commento}`}>
                <EmozioneTitle>{item.emozione}</EmozioneTitle>
                <div>{item.commento}</div>
              </Table.Row>
            )}
          />
        </Table>
      </Menus>
    </>
  );
}

export default SongDataBox;
