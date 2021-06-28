const Canvas = require('canvas');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');
const { colors, layers } = require('../resources/pet/petHelper');

module.exports = {
  name: 'pet',
  description: 'Commands to interact with your pet',
  options: [
    {
      'name': 'generate',
      'description': 'Generate a pet',
      'type': 'SUB_COMMAND',
      'required': false,
    },
  ],
  async execute(interaction, client, guild) {

    function getRandomColor() {
      const keys = Object.keys(colors);
      return colors[keys[keys.length * Math.random() << 0]];
    }

    function getRandomPart(partFolder) {
      const parts = fs.readdirSync(`./resources/pet/parts/${partFolder}/`).filter(file => file.endsWith('.png'));
      return parts[(Math.random() * parts.length) << 0];
    }

    function tintPart(tintCanvas, img, color, x, y) {
      const ctx = tintCanvas.getContext('2d');

      ctx.fillStyle = color;
      ctx.globalCompositeOperation = 'color';
      ctx.fillRect(x, y, tintCanvas.width, tintCanvas.height);

      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(img, x, y);
      ctx.globalCompositeOperation = 'source-over';

    }

    async function renderPart(part, dest, imgSrc, x, y, opts) {
      const img = await Canvas.loadImage(imgSrc);
      const tintCanvas = Canvas.createCanvas(img.width, img.height);
      const ctx = tintCanvas.getContext('2d');
      const dest_ctx = dest.getContext('2d');

      ctx.clearRect(x, y, tintCanvas.width, tintCanvas.height);
      ctx.drawImage(img, x, y);

      if (opts && opts['color']) {
        tintPart(tintCanvas, img, opts['color'], x, y);
      }

      dest_ctx.drawImage(tintCanvas, x, dest.height / 2, dest.width, dest.height / 2);
    }

    if (interaction.options.has('generate')) {
      const canvas = Canvas.createCanvas(180, 360);
      const context = canvas.getContext('2d');

      context.imageSmoothingEnabled = false;

      for (const layer in layers) {

        const opts = layers[layer];
        const part = getRandomPart(layer);
        const imgSrc = `./resources/pet/parts/${layer}/${part}`;

        if (opts['tinted']) {
          await renderPart(layer, canvas, imgSrc, 0, 0, { color: getRandomColor() });
        }
        else {
          await renderPart(layer, canvas, imgSrc, 0, 0);
        }
      }

      const attachment = new MessageAttachment(canvas.toBuffer());

      interaction.reply({ files: [attachment] });
    }
  },
};