"use client";
import { Header } from "@/components/Header";
import { LinkBtn } from "@/components/LinkBtn";
import axios from "axios";
import React, { useEffect, useState } from "react";

type ContactObj = {
  ID: number;
  NOME: string;
  IDADE: number;
  telefone: [{ ID: number; IDCONTATO: number; NUMERO: string }];
};

export default function Search() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [contato, setContato] = useState<ContactObj[]>();
  const [refresh, setRefresh] = useState(true);

  async function handleUpdate(id: any) {
    try {
      const updateContat = await axios.patch(
        `http://localhost:5000/contacts/${id}`
      );
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleDelete(id: any) {
    try {
      const deleteContact = await axios.delete(
        `http://localhost:5000/contacts/${id}`
      );
      const search = await axios.get(`http://localhost:5000/contacts/${nome}`);
      setContato(search.data);

      alert(deleteContact.statusText);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleNameSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const search = await axios.get(`http://localhost:5000/contacts/${nome}`);
      setContato(search.data);
      //alert(search.statusText);
    } catch (error: any) {
      alert(error.message);
    }
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
          onChange={(e) => setNome(e.target.value)}
          required
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
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button
          className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-green-800 focus-within:bg-slate-700 outline-none "
          type="submit"
        >
          Pesquisar Telefone
        </button>
      </form>
      <ul className="bg-slate-900 px-4">
        {contato?.map((value, index) => (
          <li
            className="flex gap-3 justify-between items-center"
            key={value.ID}
          >
            <div className="flex gap-5">
              <div>{value?.NOME}</div>
              <div>{value?.IDADE}</div>
              <div>{value?.telefone[0].NUMERO}</div>
            </div>
            <div className="flex gap-5 ">
              <button
                className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-yellow-800 focus-within:bg-slate-700 outline-none "
                type="submit"
                onClick={handleUpdate}
              >
                Editar
              </button>
              <button
                className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-red-800 focus-within:bg-slate-700 outline-none "
                type="submit"
                onClick={() => handleDelete(value.ID)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
