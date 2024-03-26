import SortBy from "../ui/SortBy";
import TableOperations from "../ui/TableOperations";

function SongTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "anno-ASC", label: "Ordina per anno (crescente)" },
          { value: "anno-DESC", label: "Ordina per anno (decrescente)" },
          { value: "titolo-ASC", label: "Ordina per titolo (crescente)" },
          { value: "titolo-DESC", label: "Ordina per titolo (decrescente)" },
          { value: "autore-ASC", label: "Ordina per autore (crescente)" },
          { value: "autore-DESC", label: "Ordina per autore (decrescente)" },
        ]}
      />
    </TableOperations>
  );
}

export default SongTableOperations;
