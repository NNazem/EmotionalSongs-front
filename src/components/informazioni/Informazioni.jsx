import React, { useContext, useState } from "react";
import CercaCanzone from "./CercaCanzone";
import { Context } from "../../App";
import VisualizzaEmozioni from "./VisualizzaEmozioni";
import styled from "styled-components";
import SongTableOperations from "../songs/SongTableOperations";

const Container = styled.div``;

const Informazioni = () => {
  const contextValue = useContext(Context);
  const session = contextValue.session;
  const setSession = contextValue.setSession;
  const [selectedCanzone, setSelectedCanzone] = useState("");
  const [listEmozioni, setListEmozioni] = useState([]);

  return (
    <Container>
      

      <CercaCanzone
        session={session}
        selectedCanzone={selectedCanzone}
        setSelectedCanzone={setSelectedCanzone}
        setListEmozioni={setListEmozioni}
      />
      <hr className="mt-4 mb-4" />
    </Container>
  );
};

export default Informazioni;
