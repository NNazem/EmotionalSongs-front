import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";

import FormRow from "../ui/FormRow";
import { useCreatePlaylist } from "./useCreatePlaylist";
import useEditPlaylist from "./useEditPlaylist";

function CreatePlaylistForm({ playlistToEdit = {}, onCloseModal }) {
  const { id: playlistId, ...editValues } = playlistToEdit;
  const isEditSession = Boolean(playlistId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { createPlaylist, isCreating } = useCreatePlaylist();
  const { editPlaylist, isEditing } = useEditPlaylist();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editPlaylist(
        { data, id: playlistId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createPlaylist(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Nome"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Il nome è obbligatorio",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancella
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Modifica playlist" : "Crea playlist"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreatePlaylistForm;
