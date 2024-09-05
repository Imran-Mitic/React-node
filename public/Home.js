import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/notes");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (note) => {
    setFormData(note);
    setIsEditing(true);
    setEditId(note.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression de la note:", error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/notes/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
      setFormData({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la modification de la note:", error);
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setFormData({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
  };

  const handleSubmitAdd = async () => {
    try {
      await axios.post("http://localhost:3000/notes", formData);
      setIsAdding(false);
      setFormData({ nom: '', prenom: '', matiere: '', classe: '', note: '' });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">Gestion des Notes</h2>

      <button
        className="btn btn-success mb-4"
        onClick={handleAddNew}
      >
        Ajouter une Nouvelle Note
      </button>

      {(isEditing || isAdding) && (
        <div className="mb-4">
          <h4>{isEditing ? "Modifier la Note" : "Ajouter une Nouvelle Note"}</h4>
          
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Nom :</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Prénom :</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Matière :</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="matiere"
                value={formData.matiere}
                onChange={(e) => setFormData({ ...formData, matiere: e.target.value })}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Classe :</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="classe"
                value={formData.classe}
                onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Note :</label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="note"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={isEditing ? handleSubmitEdit : handleSubmitAdd}
          >
            {isEditing ? "Enregistrer les modifications" : "Ajouter la note"}
          </button>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Matière</th>
            <th>Classe</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((note, index) => (
            <tr key={note.id}>
              <th scope="row">{index + 1}</th>
              <td>{note.nom}</td>
              <td>{note.prenom}</td>
              <td>{note.matiere}</td>
              <td>{note.classe}</td>
              <td>{note.note}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(note)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(note.id)}
                >
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
