module.exports = {
  plugins: [
    {
      name: 'removeViewBox',
      active: false, // Залишає атрибут viewBox (важливо для масштабування SVG)
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(stroke|fill)', // Не видаляє атрибути stroke або fill
      },
    },
    {
      name: 'removeTitle',
      active: false, // Залишає теги title, якщо вони є
    },
    {
      name: 'removeDimensions',
      active: false, // Залишає width/height, якщо вони є
    },
  ],
};
