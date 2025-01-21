import cropImageForRect from './cropImageHelperRect';

export const saveCroppedImage = async (imageSrc, croppedAreaPixels, setImageData) => {
    try {
      const croppedImageBlob = await cropImageForRect(imageSrc, croppedAreaPixels);
      const file = new File(
        [croppedImageBlob],
        'imagem-cortada.jpg',
        { type: 'image/jpeg' }
      );
      setImageData(file);
      return file.name;
    } catch (error) {
      console.error('Erro ao recortar imagem:', error);
      throw new Error('Erro ao salvar o recorte da imagem.');
    }
  };
  