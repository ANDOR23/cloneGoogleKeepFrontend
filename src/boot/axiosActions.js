import axios from "./axios";
import { api } from "./axios";

let data = {};
let archivedNotes = {};
let setedNotes = {};
export const getAllNotes = async () => {
  await api.get('http://127.0.0.1:8000/api/v1/notes')
    .then((response) => {
      data.value = response.data.data
    })
    .catch((error) => {
      console.log(error);
    })
  return data
}

export const getArchivedNotes = async () => {
  await api.get('http://127.0.0.1:8000/api/v1/notes/archived')
    .then((response) => {
      archivedNotes.value = response.data.data
    })
    .catch((error) => {
      console.log(error);
    })
  return archivedNotes
}

export const setNote = async (title, content, pin, archive) => {
  data = {
    title: title,
    content: content,
    pinned: pin,
    archived: archive
  }
  try {
    const response = await api.post('http://127.0.0.1:8000/api/v1/notes', data)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const updateNote = async (id, title, content, pin, archive) => {
  console.log(id, title, content, pin, archive)
  data = {
    title: title,
    content: content,
    pinned: pin,
    archived: archive
  }
  try {
    const response = await api.put(`http://127.0.0.1:8000/api/v1/notes/${id}`, data)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const deleteNote = async (id) => {
  console.log(id)
  try {
    const response = await api.delete(`http://127.0.0.1:8000/api/v1/notes/${id}`)
    return response
  } catch (error) {
    console.log(error);
  }
}
