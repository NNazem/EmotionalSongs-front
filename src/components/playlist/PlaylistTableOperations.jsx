import React from "react";
import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";
import SortBy from "../ui/SortBy";

function PlaylistTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"playlistType"}
        options={[
          { value: "all", label: "Tutte" },
          { value: "no-songs", label: "Senza canzoni" },
          { value: "with-songs", label: "Con canzoni" },
        ]}
      ></Filter>

      <SortBy
        options={[
          { value: "name-asc", label: "Ordina per nome (A-Z)" },
          { value: "name-desc", label: "Ordina per nome (Z-A)" },
          {
            value: "numeroCanzoni-asc",
            label: "Ordina per numero canzoni (ASC)",
          },
          {
            value: "numeroCanzoni-desc",
            label: "Ordina per numero canzoni (DESC)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default PlaylistTableOperations;
