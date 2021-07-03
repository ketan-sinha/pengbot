const Canvas = require('canvas');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');
const { colors, layers, filePaths } = require('../resources/pet/petHelper');

const CANVAS_WIDTH = 180;
const CANVAS_HEIGHT = 360;

function getRandomColor() {
  const keys = Object.keys(colors);
  return colors[keys[keys.length * Math.random() << 0]];
}

function getRandomPart(partFolder) {
  const parts = fs.readdirSync(`${filePaths.parts}${partFolder}/`).filter(file => file.endsWith('.png'));
  return parts[(Math.random() * parts.length) << 0];
}

function getRandomBg() {
  const bgs = fs.readdirSync(filePaths.bg).filter(file => file.endsWith('.png'));
  return bgs[(Math.random() * bgs.length) << 0];
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

async function renderPart(dest, imgSrc, x, y, opts) {
  console.log(imgSrc);
  const img = await Canvas.loadImage(imgSrc);
  console.log(img);
  const tintCanvas = Canvas.createCanvas(img.width, img.height);
  const ctx = tintCanvas.getContext('2d');
  const dest_ctx = dest.getContext('2d');

  console.log(dest_ctx);
  ctx.clearRect(x, y, tintCanvas.width, tintCanvas.height);
  ctx.drawImage(img, x, y);

  if (opts && opts['color']) {
    console.log(opts['color']);
    tintPart(tintCanvas, img, opts['color'], x, y);
  }

  dest_ctx.drawImage(tintCanvas, x, dest.height / 2, dest.width, dest.height / 2);
}

async function renderShadow(dest, x, y, opts) {
  const shadow = await Canvas.loadImage(`${filePaths.parts}shadow.png`);
  const dest_ctx = dest.getContext('2d');

  if (opts && opts['alpha']) {
    dest_ctx.globalAlpha = opts['alpha'];
  }

  dest_ctx.drawImage(shadow, x, dest.height / 2, dest.width, dest.height / 2);
  dest_ctx.globalAlpha = 1;
}

async function renderBackground(dest, imgSrc, x, y, opts) {
  const bg = await Canvas.loadImage(`${filePaths.bg}${imgSrc}`);
  const dest_ctx = dest.getContext('2d');

  if (opts && opts['alpha']) {
    dest_ctx.globalAlpha = opts['alpha'];
  }

  dest_ctx.drawImage(bg, x, y, bg.width, bg.height, x, y, dest.width, dest.height);
  dest_ctx.globalAlpha = 1;
}

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
    if (interaction.options.has('generate')) {
      const canvas = Canvas.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      const context = canvas.getContext('2d');

      context.imageSmoothingEnabled = false;

      renderBackground(canvas, getRandomBg(), 0, 0, { alpha: 1 });
      renderShadow(canvas, 0, 0, { alpha: 0.35 });

      for (const layer in layers) {

        const opts = layers[layer];
        const part = getRandomPart(layer);
        const imgSrc = `${filePaths.parts}${layer}/${part}`;

        if (opts['tinted']) {
          await renderPart(canvas, imgSrc, 0, 0, { color: getRandomColor() });
        }
        else {
          await renderPart(canvas, imgSrc, 0, 0);
        }
      }

      const attachment = new MessageAttachment(canvas.toBuffer());

      interaction.reply({ files: [attachment] });
    }
  },
  getRandomColor,
  getRandomPart,
  getRandomBg,
  tintPart,
  renderPart,
  renderShadow,
  renderBackground,
};