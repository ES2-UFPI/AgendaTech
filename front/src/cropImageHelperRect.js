// cropImageHelperRect.js
const DEFAULT_QUALITY = 0.9;
const DEFAULT_IMAGE_TYPE = 'image/jpeg';

/**
 * Processa e recorta uma imagem com opções configuráveis
 * @param {string} imageSrc - URL ou base64 da imagem fonte
 * @param {Object} cropArea - Área de recorte com propriedades x, y, width, height
 * @param {Object} options - Opções de processamento
 * @returns {Promise<Blob>} Blob da imagem processada
 */
export default async function cropImageForRect(
  imageSrc, 
  cropArea, 
  options = {}
) {
  const {
    quality = DEFAULT_QUALITY,
    imageType = DEFAULT_IMAGE_TYPE,
    circular = false,
    maxSize = null
  } = options;

  return new Promise((resolve, reject) => {
    // Validação de parâmetros
    if (!imageSrc || !cropArea) {
      reject(new Error('Parâmetros de imagem ou área de recorte ausentes'));
      return;
    }

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      try {
        // Criar e configurar canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Determinar dimensões finais
        let finalWidth = cropArea.width;
        let finalHeight = cropArea.height;

        // Aplicar tamanho máximo se especificado
        if (maxSize) {
          const ratio = Math.min(1, maxSize / Math.max(finalWidth, finalHeight));
          finalWidth *= ratio;
          finalHeight *= ratio;
        }

        canvas.width = finalWidth;
        canvas.height = finalHeight;

        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aplicar máscara circular se necessário
        if (circular) {
          ctx.beginPath();
          ctx.arc(
            finalWidth / 2,
            finalHeight / 2,
            Math.min(finalWidth, finalHeight) / 2,
            0,
            Math.PI * 2
          );
          ctx.clip();
        }

        // Desenhar imagem recortada
        ctx.drawImage(
          image,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          finalWidth,
          finalHeight
        );

        // Converter para blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Falha ao criar blob da imagem'));
              return;
            }
            resolve(blob);
          },
          imageType,
          quality
        );
      } catch (error) {
        reject(new Error(`Erro ao processar imagem: ${error.message}`));
      }
    };

    image.onerror = () => {
      reject(new Error('Erro ao carregar imagem para recorte'));
    };
  });
}

/**
 * Utilitários auxiliares para processamento de imagem
 */
export const imageUtils = {
  /**
   * Cria um File a partir de um Blob
   * @param {Blob} blob - Blob da imagem
   * @param {string} fileName - Nome do arquivo
   * @returns {File} Arquivo processado
   */
  createFileFromBlob(blob, fileName = 'imagem-cortada.jpg') {
    return new File([blob], fileName, { type: blob.type });
  },

  /**
   * Calcula dimensões mantendo proporção
   * @param {number} width - Largura original
   * @param {number} height - Altura original
   * @param {number} maxSize - Tamanho máximo
   * @returns {Object} Novas dimensões
   */
  calculateDimensions(width, height, maxSize) {
    if (!maxSize || (width <= maxSize && height <= maxSize)) {
      return { width, height };
    }

    const ratio = maxSize / Math.max(width, height);
    return {
      width: Math.round(width * ratio),
      height: Math.round(height * ratio)
    };
  }
};