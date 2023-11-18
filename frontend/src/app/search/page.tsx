"use client";
import { Header } from "@/components/Header";
import { LinkBtn } from "@/components/LinkBtn";
import React from "react";

export default function Search() {
  async function handleNameSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <>
      <Header title="Davinti App - Pesquisa" />
      <LinkBtn path="/" title="Voltar" />
      <form className="flex flex-col gap-3 my-5" onSubmit={handleNameSearch}>
        <input
          className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
          placeholder="Nome"
          name="NOME"
          type="text"
        />
        <button
          className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-green-800 focus-within:bg-slate-700 outline-none "
          type="submit"
        >
          Pesquisar Nome
        </button>
      </form>
      <form className="flex flex-col gap-3 my-5">
        <input
          className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
          placeholder="Telefone"
          name="NUMERO"
          type="text"
        />
        <button
          className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-green-800 focus-within:bg-slate-700 outline-none "
          type="submit"
        >
          Pesquisar Telefone
        </button>
      </form>
      <ul className="bg-slate-900 px-4">
        <li className="flex gap-3 justify-between items-center">
          <div className="flex gap-5">
            <div>NOME</div>
            <div>IDADE</div>
            <div>TELEFONE</div>
          </div>
          <div className="flex gap-5 ">
            <button
              className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-yellow-800 focus-within:bg-slate-700 outline-none "
              type="submit"
            >
              Editar
            </button>
            <button
              className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-red-800 focus-within:bg-slate-700 outline-none "
              type="submit"
            >
              Deletar
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}
