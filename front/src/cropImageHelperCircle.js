export default async function cropImageForCircle(imageSrc, cropCircleAreaPixels) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Define o tamanho do canvas como o menor lado (para manter círculo)
      const size = Math.min(cropCircleAreaPixels.width, cropCircleAreaPixels.height);
      canvas.width = size;
      canvas.height = size;

      // Centraliza a área de recorte no círculo
      const centerX = cropCircleAreaPixels.x + cropCircleAreaPixels.width / 2;
      const centerY = cropCircleAreaPixels.y + cropCircleAreaPixels.height / 2;

      // Cria a máscara circular
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      ctx.clip();

      ctx.drawImage(
        image,
        centerX - size / 2,
        centerY - size / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Erro ao criar blob da imagem circular.'));
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        0.9 // Qualidade de compressão
      );
    };

    image.onerror = () => {
      reject(new Error('Erro ao carregar a imagem para recorte circular.'));
    };
  });
}
