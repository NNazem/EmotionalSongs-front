import React, { useState } from "react";
import SongTable from "../songs/SongTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { useSearchParams } from "react-router-dom";
import { set } from "react-hook-form";

const CercaCanzone = () => {
  const [canzoneFormData, setCanzoneFormData] = useState({
    autore: "",
    anno: "",
    titolo: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    setCanzoneFormData({ ...canzoneFormData, [e.target.name]: e.target.value });
  };

  const handleCercaClick = () => {
    if (canzoneFormData.autore && canzoneFormData.anno) {
      setSearchParams({
        autore: canzoneFormData.autore,
        anno: canzoneFormData.anno,
      });
    }
    if (canzoneFormData.titolo) {
      setSearchParams({ titolo: canzoneFormData.titolo });
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Ricerca canzoni</Heading>
      </Row>

      <div className="row">
        <div className="col-md-3 form-group mb-2">
          <input
            type="text"
            name="autore"
            className="form-control text-center"
            placeholder="Autore"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 form-group mb-2">
          <input
            type="number"
            name="anno"
            className="form-control text-center"
            placeholder="Anno"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5 form-group mb-2">
          <input
            type="text"
            name="titolo"
            className="form-control text-center"
            placeholder="Titolo"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1 form-group mb-2">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleCercaClick}
          >
            Cerca
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 form-group mb-2">
          {(searchParams.get("titolo") ||
            searchParams.get("anno") ||
            searchParams.get("autore")) && (
            <SongTable
              titolo={searchParams.get("titolo")}
              anno={searchParams.get("anno")}
              autore={searchParams.get("autore")}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CercaCanzone;
