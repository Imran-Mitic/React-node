import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormulaireNote = ({ note, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matiere: '',
    classe: '',
    note: ''
  });

  useEffect(() => {
    if (note) {
      setFormData(note);
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>{note ? 'Modifier la Note' : 'Ajouter une Nouvelle Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Matière</label>
          <input
            type="text"
            name="matiere"
            value={formData.matiere}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Classe</label>
          <input
            type="text"
            name="classe"
            value={formData.classe}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Note</label>
          <input
            type="number"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Soumettre</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">Annuler</button>
      </form>
    </div>
  );
};

export default FormulaireNote;
