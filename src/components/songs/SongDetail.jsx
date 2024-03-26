import styled from "styled-components";
import Row from "../ui/Row";
import { useMoveBack } from "./useMoveBack";
import ButtonText from "../ui/ButtonText";
import Spinner from "../ui/Spinner";

import SongDataBox from "./SongDataBox";
import Heading from "../ui/Heading";
import useSong from "./useSong";


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function SongDetail() {
  const { song, isLoading } = useSong();
  const moveBack = useMoveBack();

  if (isLoading) {
    return <Spinner />;
  }

  const { id: songId } = song;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Canzone #{songId}</Heading>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Indietro</ButtonText>
      </Row>

      <SongDataBox song={song} />
    </>
  );
}

export default SongDetail;
