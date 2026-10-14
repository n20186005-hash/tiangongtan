export {};

type SizeKey = 'square' | 'postcard' | 'story';
type StyleKey = 'gold' | 'jade' | 'night';

const root = document.querySelector<HTMLElement>('[data-card-maker]');

const sizes: Record<SizeKey, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  postcard: { width: 1080, height: 1500 },
  story: { width: 1080, height: 1920 }
};

const styles: Record<StyleKey, { overlayA: string; overlayB: string; line: string; text: string; accent: string }> = {
  gold: {
    overlayA: 'rgba(31, 39, 28, 0.10)',
    overlayB: 'rgba(111, 46, 29, 0.66)',
    line: 'rgba(255, 239, 194, 0.82)',
    text: '#fff7dc',
    accent: '#f2d186'
  },
  jade: {
    overlayA: 'rgba(20, 63, 51, 0.16)',
    overlayB: 'rgba(19, 58, 49, 0.72)',
    line: 'rgba(214, 240, 213, 0.78)',
    text: '#f5ffe9',
    accent: '#bed6b8'
  },
  night: {
    overlayA: 'rgba(12, 18, 32, 0.08)',
    overlayB: 'rgba(9, 15, 28, 0.78)',
    line: 'rgba(234, 223, 190, 0.72)',
    text: '#fff8df',
    accent: '#d7a64b'
  }
};

function asSizeKey(value: string): SizeKey {
  return value === 'postcard' || value === 'story' ? value : 'square';
}

function asStyleKey(value: string): StyleKey {
  return value === 'jade' || value === 'night' ? value : 'gold';
}

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number): void {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const chars = Array.from(text);
  let line = '';
  let currentY = y;

  chars.forEach((char) => {
    const testLine = `${line}${char}`;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('圖片讀取失敗'));
    image.src = src;
  });
}

if (root) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-card-canvas]');
  const photoInput = root.querySelector<HTMLInputElement>('[data-card-photo]');
  const sizeInput = root.querySelector<HTMLSelectElement>('[data-card-size]');
  const styleInput = root.querySelector<HTMLSelectElement>('[data-card-style]');
  const titleInput = root.querySelector<HTMLInputElement>('[data-card-title]');
  const subtitleInput = root.querySelector<HTMLInputElement>('[data-card-subtitle]');
  const dateInput = root.querySelector<HTMLInputElement>('[data-card-date]');
  const renderButton = root.querySelector<HTMLButtonElement>('[data-card-render]');
  const downloadButton = root.querySelector<HTMLButtonElement>('[data-card-download]');

  let activeImage: HTMLImageElement | null = null;
  const ctx = canvas?.getContext('2d') ?? null;

  if (dateInput && !dateInput.value) {
    dateInput.value = new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
  }

  const render = () => {
    if (!canvas || !ctx || !activeImage) return;
    const size = sizes[asSizeKey(sizeInput?.value ?? 'square')];
    const theme = styles[asStyleKey(styleInput?.value ?? 'gold')];
    canvas.width = size.width;
    canvas.height = size.height;

    drawCover(ctx, activeImage, size.width, size.height);

    const gradient = ctx.createLinearGradient(0, 0, 0, size.height);
    gradient.addColorStop(0, theme.overlayA);
    gradient.addColorStop(1, theme.overlayB);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);

    const pad = Math.round(size.width * 0.07);
    ctx.strokeStyle = theme.line;
    ctx.lineWidth = Math.max(6, Math.round(size.width * 0.006));
    ctx.strokeRect(pad, pad, size.width - pad * 2, size.height - pad * 2);

    ctx.fillStyle = theme.accent;
    ctx.font = `700 ${Math.round(size.width * 0.034)}px "Noto Sans TC", "PingFang TC", sans-serif`;
    ctx.fillText('HSINCHU · TIANGONGTAN', pad + 18, pad + Math.round(size.width * 0.07));

    ctx.fillStyle = theme.text;
    ctx.textBaseline = 'alphabetic';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.34)';
    ctx.shadowBlur = 18;
    ctx.font = `900 ${Math.round(size.width * 0.09)}px "Noto Sans TC", "PingFang TC", sans-serif`;
    const title = titleInput?.value.trim() || '天公壇公園';
    const subtitle = subtitleInput?.value.trim() || '新竹北區・客雅溪畔';
    const date = dateInput?.value.trim() || '';
    const titleY = size.height - Math.round(size.height * 0.24);
    const endY = wrapText(ctx, title, pad + 18, titleY, size.width - pad * 2 - 36, Math.round(size.width * 0.105));

    ctx.shadowBlur = 10;
    ctx.font = `600 ${Math.round(size.width * 0.038)}px "Noto Sans TC", "PingFang TC", sans-serif`;
    ctx.fillStyle = 'rgba(255, 248, 223, 0.92)';
    ctx.fillText(subtitle, pad + 18, endY + Math.round(size.width * 0.025));
    ctx.fillText(date, pad + 18, endY + Math.round(size.width * 0.075));

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 248, 223, 0.68)';
    ctx.font = `500 ${Math.round(size.width * 0.026)}px "Noto Sans TC", "PingFang TC", sans-serif`;
    ctx.fillText('照片僅保存在您的設備', pad + 18, size.height - pad - 26);
  };

  loadImage('/images/tiangongtan-nine-dragon-pillar-night.jpg')
    .then((image) => {
      activeImage = image;
      render();
    })
    .catch(() => undefined);

  photoInput?.addEventListener('change', () => {
    const file = photoInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        loadImage(reader.result)
          .then((image) => {
            activeImage = image;
            render();
          })
          .catch(() => undefined);
      }
    };
    reader.readAsDataURL(file);
  });

  [sizeInput, styleInput, titleInput, subtitleInput, dateInput].forEach((input) => {
    input?.addEventListener('input', render);
    input?.addEventListener('change', render);
  });

  renderButton?.addEventListener('click', render);
  downloadButton?.addEventListener('click', () => {
    if (!canvas) return;
    render();
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `tiangongtan-card-${Date.now()}.png`;
    link.click();
  });
}
