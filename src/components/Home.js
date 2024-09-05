import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, addNote, updateNote, deleteNote } from './redux/notesSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [formData, setFormData] = useState({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);

  const notes = useSelector((state) => state.notes.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleEdit = (note) => {
    setFormData(note);
    setIsEditing(true);
    setIsAdding(false);
    setEditId(note.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const handleSubmitEdit = () => {
    dispatch(updateNote({ id: editId, updatedNote: formData }));
    setIsEditing(false);
    setEditId(null);
    setFormData({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
  };

  const handleSubmitAdd = () => {
    dispatch(addNote(formData));
    setIsAdding(false);
    setFormData({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="my-4">Gestion des Notes</h2>

      <button className="btn btn-success mb-4" onClick={handleAddNew}>
        Ajouter une Nouvelle Note
      </button>

      {(isEditing || isAdding) && (
        <div className="mb-4">
          <h4>{isEditing ? "Modifier la Note" : "Ajouter une Nouvelle Note"}</h4>
          <form onSubmit={isEditing ? handleSubmitEdit : handleSubmitAdd}>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                className="form-control"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                className="form-control"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Matière</label>
              <input
                type="text"
                name="matiere"
                className="form-control"
                value={formData.matiere}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Classe</label>
              <input
                type="text"
                name="classe"
                className="form-control"
                value={formData.classe}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Note</label>
              <input
                type="number"
                name="note"
                className="form-control"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              {isEditing ? "Modifier" : "Ajouter"}
            </button>
          </form>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Matière</th>
            <th>Classe</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={note.id}>
              <th scope="row">{index + 1}</th>
              <td>{note.nom}</td>
              <td>{note.prenom}</td>
              <td>{note.matiere}</td>
              <td>{note.classe}</td>
              <td>{note.note}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(note)}>
                  Modifier
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(note.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
