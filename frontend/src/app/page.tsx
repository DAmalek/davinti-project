"use client";
import { Header } from "@/components/Header";
import { LinkBtn } from "@/components/LinkBtn";
import axios from "axios";
import React, { useState } from "react";

type RegistrationForm = {
  NOME: string;
  IDADE: number | string;
  NUMERO: string;
};

export default function Home() {
  const [form, setForm] = useState({ NOME: "", IDADE: "", NUMERO: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = {
      ...form,
      IDADE: Number(form.IDADE),
    };

    try {
      const registration = await axios.post(
        "http://localhost:5000/contacts",
        body
      );
      alert(registration.statusText);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  }

  //console.log(form);

  return (
    <>
      <Header title="Davint App - Agenda Telefônica" />
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
          placeholder="Nome"
          name="NOME"
          type="text"
          onChange={handleChange}
          required
        />
        <input
          className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
          placeholder="Idade"
          name="IDADE"
          type="text"
          onChange={handleChange}
          required
        />
        <input
          className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
          placeholder="Número"
          name="NUMERO"
          type="text"
          onChange={handleChange}
          required
        />

        <div className=" flex mt-6">
          <LinkBtn title="Pesquisar" path="/search" />
          <button
            className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-green-800 focus-within:bg-slate-700 outline-none "
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </>
  );
}
