import React, { useState } from 'react';
import CustomCropper from './CustomCropper';
import './CreateEvent.css';

import { saveCroppedImage } from './imageUtils'; //Refatoração

function CreateEvent() {
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    horario: '',
    tipo: 'presencial',
    local: '',
    link: '',
    descricao: '',
    preco: '',
    imagem: null,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedFileName, setCroppedFileName] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const readFileAsDataURL = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      readFileAsDataURL(file, setImageSrc);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  //Refatoração
  const handleCropSave = async () => {
    try {
      const fileName = await saveCroppedImage(imageSrc, croppedAreaPixels, (file) => {
        setFormData({ ...formData, imagem: file });
        setImageSrc(null);
      });
      setCroppedFileName(fileName);
    } catch (error) {
      alert(error.message);
    }
  };
  //Refatoração

  const handleCropCancel = () => {
    setImageSrc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSubmit.append(key, value);
      }
    });
    try {
      const response = await fetch('http://localhost:8000/api/cadastrar_evento/', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        alert('Evento cadastrado com sucesso!');
        setFormData({
          nome: '',
          data: '',
          horario: '',
          tipo: 'presencial',
          local: '',
          link: '',
          descricao: '',
          preco: '',
          imagem: null,
        }
      );
      window.location.href = '/'; // Redireciona para a página inicial
      } else {
        alert('Erro ao cadastrar evento. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar evento:', error);
      alert('Erro ao cadastrar evento. Verifique sua conexão.');
    }
  };

  return (
    <div className="create-event-container">
      <h1 className="create-event-title">Criar Evento</h1>

      {imageSrc ? (
        <div className="cropper-container-vertical">
          <div className="cropper-area">
            <CustomCropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              cropShape="rect"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
          <div className="cropper-buttons">
            <button onClick={handleCropSave} className="btn btn-primary">
              Confirmar Recorte
            </button>
            <button onClick={handleCropCancel} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="create-event-form">
          <div>
            <label>Nome do Evento</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Data</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Horário</label>
            <input
              type="time"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </div>
          <div>
            <label>Local</label>
            <input
              type="text"
              name="local"
              value={formData.local}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Preço:</label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Imagem</label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleFileChange}
            />
            {croppedFileName && (
              <small className="text-muted">{croppedFileName}</small>
            )}
          </div>
          <button type="submit">Cadastrar Evento</button>
        </form>
      )}
    </div>
  );
}

export default CreateEvent;
