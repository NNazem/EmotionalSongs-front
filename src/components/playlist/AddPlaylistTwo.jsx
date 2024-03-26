import React, { useState } from "react";
import Button from "../ui/Button";
import CreatePlaylistForm from "./CreatePlaylistForm";
import Modal from "../ui/Modal";

function AddPlaylistTwo() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="playlist-form">
          <Button>Crea una nuova playlist</Button>
        </Modal.Open>
        <Modal.Window name="playlist-form">
          <CreatePlaylistForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPlaylistTwo;
