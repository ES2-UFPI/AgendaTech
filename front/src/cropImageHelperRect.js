export default async function cropImageForRect(imageSrc, cropRectAreaPixels) {
    return new Promise((resolve, reject) => {
      console.log('Área de recorte retangular:', cropRectAreaPixels); // Log da área de recorte
      const image = new Image();
      image.src = imageSrc;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = cropRectAreaPixels.width;
        canvas.height = cropRectAreaPixels.height;
  
        console.log('Canvas dimensões retangular:', canvas.width, canvas.height); // Log das dimensões do canvas
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        ctx.drawImage(
          image,
          cropRectAreaPixels.x,
          cropRectAreaPixels.y,
          cropRectAreaPixels.width,
          cropRectAreaPixels.height,
          0,
          0,
          cropRectAreaPixels.width,
          cropRectAreaPixels.height
        );
  
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Erro ao criar blob da imagem retangular.'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          0.9
        );
      };
  
      image.onerror = () => {
        reject(new Error('Erro ao carregar a imagem para recorte retangular.'));
      };
    });
  }
  