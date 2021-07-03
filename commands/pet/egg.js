const Canvas = require('canvas');
const { renderPart, getRandomColor } = require('../pet');
const { filePaths } = require('../../resources/pet/petHelper');

const CANVAS_WIDTH = 180;
const CANVAS_HEIGHT = 180;

const canvas = Canvas.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

module.exports = {
  renderEgg: async () => {
    await renderPart(canvas, filePaths['eggBase_img'], 0, 0, { color: getRandomColor() });
  },
};