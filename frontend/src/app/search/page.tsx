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
  const [contato, setContato] = useState<ContactObj[]>();
  const [refresh, setRefresh] = useState(false);
  const [form, setForm] = useState({ NOME: "", IDADE: "", NUMERO: "" });
  const [updateId, setUpadateId] = useState(0);
  console.log(form);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      NOME: form.NOME,
      IDADE: Number(form.IDADE),
      NUMERO: form.NUMERO,
    };
    try {
      const updateContat = await axios.patch(
        `http://localhost:5000/contacts/${updateId}`,
        body
      );
      const search = await axios.get(`http://localhost:5000/contacts/${nome}`);

      setContato(search.data);
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
          Pesquisar
        </button>
      </form>

      {refresh ? (
        <>
          <div>Editar Contato</div>
          <form className="flex flex-col gap-3" onSubmit={handleUpdate}>
            <input
              className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
              placeholder="Nome"
              name="NOME"
              type="text"
              onChange={handleChange}
            />
            <input
              className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
              placeholder="Idade"
              name="IDADE"
              type="text"
              onChange={handleChange}
            />
            <input
              className="border border-slate-300 bg-transparent rounded px-2 py-1 focus-within:border-slate-100 "
              placeholder="Número"
              name="NUMERO"
              type="text"
              onChange={handleChange}
            />

            <div className=" flex mb-6">
              <button
                className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-slate-600 focus-within:bg-slate-700 outline-none "
                onClick={() => {
                  setForm({ NOME: "", IDADE: "", NUMERO: "" });
                  setRefresh(!refresh);
                }}
              >
                Cancelar
              </button>
              <button
                className=" w-1/2 border border-slate-300 px-2 py-1 rounded  hover:bg-yellow-800 focus-within:bg-slate-700 outline-none "
                type="submit"
              >
                Registrar
              </button>
            </div>
          </form>{" "}
        </>
      ) : (
        ""
      )}

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
                onClick={() => {
                  setUpadateId(value.ID);
                  setRefresh(!refresh);
                }}
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
