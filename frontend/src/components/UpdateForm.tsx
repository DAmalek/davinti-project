import React, { useState } from "react";
import { LinkBtn } from "./LinkBtn";

export default function UpdateForm(func: any) {
  const [form, setForm] = useState({ NOME: "", IDADE: "", NUMERO: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={func}>
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
