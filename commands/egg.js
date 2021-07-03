const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const { filePaths } = require('../resources/pet/petHelper');
const { renderPart, tintPart, getRandomColor } = require('./pet');

const CANVAS_WIDTH = 120;
const CANVAS_HEIGHT = 120;

const canvas = Canvas.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

module.exports = {
  name: 'egg',
  description: 'Commands to interact with eggs',
  options: [
    {
      'name': 'generate',
      'description': 'Generate an egg [TEST]',
      'type': 'SUB_COMMAND',
      'required': false,
    },
  ],
  async execute(interaction) {
    console.log('inside egg');

    if (interaction.options.has('generate')) {
      console.log('rendering egg...');
      console.log(filePaths.eggBase_img);
      await renderPart(canvas, filePaths.eggBase_img, 0, 0);
      const attachment = new MessageAttachment(canvas.toBuffer());

      interaction.reply({ files: [attachment] });
    }
  },
};