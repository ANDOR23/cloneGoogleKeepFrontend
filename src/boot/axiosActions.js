/* EN ESTE ARCHIVO SE REALIZAN LAS PETICIONES HTTP AL BACKEND. CADA FUNCIÓN ES EXPORTADA PARA
  SER IMPORTADAS EN EL DATASTORE */
import { api } from "./axios";

let data = {};
let archivedNotes = {};
/* PETICIÓN GET DE TODOS LOS REGISTROS  */
export const getAllNotes = async () => {
  await api.get('http://127.0.0.1:8000/api/v1/notes')
    .then((response) => {
      data.value = response.data
    })
    .catch((error) => {
      console.log(error);
    })
  return data
}
/* PETICIÓN GET DE TODOS LOS REGISTOS ARCHIVADOS */
export const getArchivedNotes = async () => {
  await api.get('http://127.0.0.1:8000/api/v1/notes/archived')
    .then((response) => {
      archivedNotes.value = response.data
    })
    .catch((error) => {
      console.log(error);
    })
  return archivedNotes
}
/* PETICIÓN POST PARA ALMACENAR UN REGISTRO EN LA BASE DE DATOS */
export const setNote = async (title, content, pin, archive, color) => {
  data = {
    title: title,
    content: content,
    pinned: pin,
    archived: archive,
    color: color
  }
  try {
    const response = await api.post('http://127.0.0.1:8000/api/v1/notes', data)
    return response
  } catch (error) {
    console.log(error);
  }
}
/* PETICIÓN PUT PARA ACTUALIZAR UN REGISTRO DE LA BASE DE DATOS */
export const updateNote = async (id, title, content, pin, archive, color) => {
  data = {
    title: title,
    content: content,
    pinned: pin,
    archived: archive,
    color: color
  }
  try {
    const response = await api.put(`http://127.0.0.1:8000/api/v1/notes/${id}`, data)
    return response
  } catch (error) {
    console.log(error);
  }
}
/* PETICIÓN DELETE PARA ELIMINAR EL ARCHIVO */
export const deleteNote = async (id) => {
  console.log(id)
  try {
    const response = await api.delete(`http://127.0.0.1:8000/api/v1/notes/${id}`)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const archiveNote = async (id) => {
  try {
    const response = await api.post(`http://127.0.0.1:8000/api/v1/notes/${id}/archived`)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const changePage = async (archived, page ) => {
  console.log(page);
  await api.get(`http://127.0.0.1:8000/api/v1/notes${archived}?page=${page}`)
    .then((response) => {
      data.value = response.data
    })
    .catch((error) => {
      console.log(error);
    })
  return data
}

