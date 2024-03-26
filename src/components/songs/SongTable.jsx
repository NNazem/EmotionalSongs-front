import Empty from "../ui/Empty";
import Menus from "../ui/Menus";
import Pagination from "../ui/Pagination";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import SongRow from "./SongRow";
import useSongs from "./useSongs";

function SongTable() {
  const { songs, isLoading } = useSongs("");

  if (isLoading) return <Spinner />;

  if (!songs) return <Empty resource={"songs"} />;
  

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 0.1fr">
        <Table.Header>
          <div>Titolo</div>
          <div>Autore</div>
          <div>Anno</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={songs.canzoni}
          render={(song) => <SongRow key={song.id} song={song} />}
        />

        <Table.Footer>
          <Pagination count={songs.numeroCanzoni} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default SongTable;
