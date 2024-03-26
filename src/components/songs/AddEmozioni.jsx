import React, { useState } from "react";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import styled from "styled-components";
import Menus from "../ui/Menus";
import Table from "../ui/Table";
import { Slider } from "@mui/joy";
import Spinner from "../ui/Spinner";
import Input from "../ui/Input";
import { useParams } from "react-router";
import { insertEmozione } from "./apiSongs";
import useEmozioni from "./useEmozioni";
import { useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";

const StyledAddEmozioni = styled.div`
  width: 70rem;
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

const EmozioneTitle = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function AddEmozioni() {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get("playlistId");

  const { songId } = useParams();
  const { emozioni = [], isLoading: isLoadingEmozioni } = useEmozioni();
  const queryClient = useQueryClient();

  const elencoEmozioni = [
    "STUPORE",
    "TENEREZZA",
    "SOLLENITA",
    "NOSTALGIA",
    "CALMA",
    "POTENZA",
    "GIOIA",
    "NERVOSISMO",
    "TRISTEZZA",
  ].sort();

  const emozioniUtente = elencoEmozioni.map((emotion) => {
    const existingEmotion = emozioni[emotion];
    return existingEmotion
      ? {
          tipoEmozione: emotion,
          voto: existingEmotion.voto,
          commentoUtente: existingEmotion.commentoUtente,
        }
      : {
          tipoEmozione: emotion,
          voto: 0,
          commentoUtente: "",
        };
  });

  const [emozionid, setEmozioni] = useState(emozioniUtente);

  if (isLoadingEmozioni) {
    return <Spinner />;
  }

  async function handleUpdate(tipoEmozione, field, value) {
    setEmozioni((prevEmozioni) => {
      const updatedEmozioni = prevEmozioni.map((emozione) =>
        emozione.tipoEmozione === tipoEmozione
          ? { ...emozione, [field]: value }
          : emozione
      );
      return updatedEmozioni;
    });
  }

  async function handleSave() {
    for (const emozione of emozionid) {
      if (emozione.voto !== 0) {
        await insertEmozione(
          playlistId,
          songId,
          emozione.tipoEmozione,
          emozione.voto,
          emozione.commentoUtente
        );
      }
    }
    queryClient.invalidateQueries("emozioni");
  }

  return (
    <StyledAddEmozioni>
      <Heading as="h3">Aggiungi emozioni</Heading>
      <p>Seleziona le emozioni che vuoi aggiungere alla canzone</p>
      <Menus>
        <Table columns="0.8fr 1fr 2fr">
          <Table.Header>
            <div>Emozione</div>
            <div>Voto</div>
            <div>Commento</div>
          </Table.Header>
          <Table.Body
            data={emozioniUtente}
            isLoading={isLoadingEmozioni}
            render={(item) => (
              <Table.Row key={`${item.tipoEmozione}`}>
                <EmozioneTitle>{item.tipoEmozione}</EmozioneTitle>
                <Slider
                  color="primary"
                  marks
                  orientation="horizontal"
                  size="md"
                  valueLabelDisplay="auto"
                  variant="solid"
                  defaultValue={item.voto}
                  step={1}
                  min={1}
                  max={5}
                  onChange={(e) =>
                    handleUpdate(item.tipoEmozione, "voto", e.target.value)
                  }
                />
                <Input
                  type="text"
                  name="commentoUtente"
                  placeholder="Inserisci un commento"
                  defaultValue={item.commentoUtente}
                  onBlur={(e) =>
                    handleUpdate(
                      item.tipoEmozione,
                      "commentoUtente",
                      e.target.value
                    )
                  }
                />
              </Table.Row>
            )}
          />
          <Table.Footer>
            <Button size="medium" onClick={handleSave}>
              Salva
            </Button>
          </Table.Footer>
        </Table>
      </Menus>
    </StyledAddEmozioni>
  );
}

export default AddEmozioni;
