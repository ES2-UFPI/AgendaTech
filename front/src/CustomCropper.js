import React from 'react';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';

/**
 * CustomCropper - Wrapper para o react-easy-crop.
 * 
 * Este componente encapsula o Cropper original, adicionando configurações padrão 
 * para facilitar o uso e personalizações específicas.
 */
const CustomCropper = ({
  image,
  crop,
  zoom,
  aspect,
  onCropChange,
  onZoomChange,
  onCropComplete,
  cropShape = 'rect', // Máscara padrão como retangular
  showGrid = true,    // Exibe ou não a grade no cropper
}) => {
  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={aspect}
      cropShape={cropShape} // Configuração padrão ou passada como prop
      showGrid={showGrid}   // Exibe a grade por padrão
      onCropChange={onCropChange}
      onZoomChange={onZoomChange}
      onCropComplete={onCropComplete}
    />
  );
};

// Propriedades esperadas e valores padrão
CustomCropper.propTypes = {
  image: PropTypes.string.isRequired,          // URL ou base64 da imagem
  crop: PropTypes.object.isRequired,           // Posição de recorte (x, y)
  zoom: PropTypes.number.isRequired,           // Nível de zoom
  aspect: PropTypes.number.isRequired,         // Razão de aspecto (exemplo: 16 / 9)
  onCropChange: PropTypes.func.isRequired,     // Callback para mudanças no recorte
  onZoomChange: PropTypes.func.isRequired,     // Callback para mudanças no zoom
  onCropComplete: PropTypes.func.isRequired,   // Callback para finalização do recorte
  cropShape: PropTypes.oneOf(['rect', 'round']), // Forma do recorte: 'rect' ou 'round'
  showGrid: PropTypes.bool,                    // Mostra a grade no recorte
};

CustomCropper.defaultProps = {
  cropShape: 'rect', // Máscara padrão como retangular
  showGrid: true,    // Exibe a grade por padrão
};

export default CustomCropper;
