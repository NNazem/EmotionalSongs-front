import React from "react";

const VisualizzaEmozioni = ({ listEmozioni }) => {
  return (
    <>
      {Object.keys(listEmozioni).map((item) => (
        <div key={item} className="row mt-2">
          <div className="col-sm">
            <label className="form-control text-center">
              {listEmozioni[item].tipoEmozione}
            </label>
          </div>
          <div className="col-sm">
            <label className="form-control text-center">
              {listEmozioni[item].media}
            </label>
          </div>
          <div className="col-sm">
            <select name="user_comments" className="form-control text-center">
              {listEmozioni[item].commentiUtenti.map((comm, i) => (
                <option key={i} value="">
                  {comm}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </>
  );
};

export default VisualizzaEmozioni;
