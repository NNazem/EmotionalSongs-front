import React from "react";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import useSignup from "./useSignup";
import { useForm } from "react-hook-form";

export default function RegistrazioneForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({
    nome,
    cognome,
    indirizzo,
    username,
    email,
    codiceFiscale,
    password,
  }) {
    signup(
      { nome, cognome, indirizzo, username, email, codiceFiscale, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nome" error={errors?.nome?.message}>
        <Input
          type="text"
          id="nome"
          disabled={isLoading}
          {...register("nome", { required: "Questo campo è obbligatorio" })}
        />
      </FormRow>

      <FormRow label="Cognome" error={errors?.cognome?.message}>
        <Input
          type="text"
          id="cognome"
          disabled={isLoading}
          {...register("cognome", { required: "Questo campo è obbligatorio" })}
        />
      </FormRow>

      <FormRow label="Indirizzo" error={errors?.indirizzo?.message}>
        <Input
          type="text"
          id="indirizzo"
          disabled={isLoading}
          {...register("indirizzo", {
            required: "Questo campo è obbligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Username" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          disabled={isLoading}
          {...register("username", { required: "Questo campo è obbligatorio" })}
        />
      </FormRow>

      <FormRow label="Indirizzo email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Questo campo è obbligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Inserisci un indirizzo email valido",
            },
          })}
        />
      </FormRow>

      <FormRow label="Codice fiscale" error={errors?.codiceFiscale?.message}>
        <Input
          type="text"
          id="codiceFiscale"
          disabled={isLoading}
          {...register("codiceFiscale", {
            required: "Questo campo è obbligatorio",
            pattern: {
              value: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/,
              message: "Inserisci un codice fiscale valido",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 caratteri)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Questo campo è obbligatorio",
            minLength: {
              value: 8,
              message: "La password deve essere lunga almeno 8 caratteri",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Ripeti la password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Questo campo è obbligatorio",
            validate: (value) =>
              value === getValues().password || "Le password non coincidono",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancella
        </Button>
        <Button>Crea nuovo account</Button>
      </FormRow>
    </Form>
  );
}
