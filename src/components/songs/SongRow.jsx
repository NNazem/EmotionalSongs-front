import styled from "styled-components";

import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Table from "../ui/Table";
import Menus from "../ui/Menus";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Year = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function SongRow({
  song: { id: songId, titolo: title, autore: author, anno: year },
  playlistId,
}) {
  console.log(title);
  console.log(songId);
  const navigate = useNavigate();
  let tag;
  if (year < 1990) {
    tag = "blue";
  } else if (year >= 1990 && year < 2000) {
    tag = "green";
  } else {
    tag = "silver";
  }

  return (
    <Table.Row>
      <Title>{title}</Title>
      <div>{author}</div>
      <Year>{year}</Year>

      <Menus.Menu>
        <Menus.Toggle id={songId} />
        <Menus.List id={songId}>
          {!playlistId ? (
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/songs/${songId}`)}
            >
              Dettagli
            </Menus.Button>
          ) : (
            <Menus.Button
              icon={<HiEye />}
              onClick={() =>
                navigate(`/songs/${songId}?playlistId=${playlistId}`)
              }
            >
              Dettagli
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default SongRow;
