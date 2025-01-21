import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import cropImageForRect from './cropImageHelperRect';
import './RegisterUser.css';

// Replace Magic Literal: Defini constantes para valores literais usados no código.
const API_ENDPOINT = 'http://localhost:8000/api/cadastrar_usuario/';
const IMAGE_TYPE = 'image/jpeg';
const IMAGE_QUALITY = 0.9;
const CROPPED_IMAGE_NAME = 'profile-image-cropped.jpg';

const RegisterUser = ({ setUsuarioLogado }) => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    username: '',
    senha: '',
    imagem: null,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedFileName, setCroppedFileName] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    try {
      const croppedImageBlob = await cropImageForRect(imageSrc, croppedAreaPixels);

      const canvas = document.createElement('canvas');
      const size = Math.min(croppedAreaPixels.width, croppedAreaPixels.height);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      const image = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(croppedImageBlob);
      });

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      ctx.clip();

      ctx.drawImage(image, 0, 0, size, size);

      const circularBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, IMAGE_TYPE, IMAGE_QUALITY)
      );

      const file = new File([circularBlob], CROPPED_IMAGE_NAME, { type: IMAGE_TYPE });

      setFormData({ ...formData, imagem: file });
      setCroppedFileName(file.name);
      setImageSrc(null);
    } catch (error) {
      console.error('Erro ao recortar imagem:', error);
      alert('Erro ao salvar o recorte da imagem.');
    }
  };

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
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        const usuario = await response.json();
        setUsuarioLogado(usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        alert('Cadastro realizado com sucesso! Você foi logado automaticamente.');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError(errorData.erro || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError('Erro ao cadastrar usuário. Verifique sua conexão.');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastrar Usuário</h2>
      {imageSrc ? (
        <div className="cropper-container-vertical">
          <div className="cropper-area">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1} // Define área de recorte quadrada
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
          <div className="cropper-buttons">
            <button onClick={handleCropSave}>Salvar Recorte</button>
            <button onClick={handleCropCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nome de Usuário</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Imagem de Perfil</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {croppedFileName && <small>{croppedFileName}</small>}
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Cadastrar</button>
        </form>
      )}
    </div>
  );
};

export default RegisterUser;
