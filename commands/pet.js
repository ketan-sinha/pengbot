const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const { colors, layer_order } = require('../resources/pet/petHelper');
const fs = require('fs');

// const layerImgs = fs.readdirSync('./resources/pet').filter(file => file.endsWith('.png'));

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

    // function renderPart(part, color, context, x, y) {
      
    // };


    if (interaction.options.has('generate')) {
      const canvas = Canvas.createCanvas(180, 360);
      const context = canvas.getContext('2d');

      // const img = await Canvas.loadImage('./resources/smolerpeng.png');
      const layers = {};

      context.imageSmoothingEnabled = false;

      console.log(layer_order);
      // for (const layer of layer_order) {
      //   layers[`${layer}`] = await Canvas.loadImage(`./resources/pet/parts/${layer}.png`);
      //   console.log(layer, layers[`${layer}`]);
      // }

      for (const layer of layer_order) {
        const img = await Canvas.loadImage(`./resources/pet/parts/${layer}.png`);
        const tintCanvas = Canvas.createCanvas(img.width, img.height);
        const ctx = tintCanvas.getContext('2d');
        const color = getRandomColor();

        console.log('firstpass: ', ctx.globalCompositeOperation);

        ctx.drawImage(img, 0, 0);

        if (layer != 'feet' && layer != 'beak' && layer != 'outline') {
          ctx.clearRect(0, 0, tintCanvas.width, tintCanvas.height);
          ctx.drawImage(img, 0, 0);

          ctx.fillStyle = color;
          ctx.globalCompositeOperation = 'color';
          ctx.fillRect(0, 0, tintCanvas.width, tintCanvas.height);

          ctx.globalCompositeOperation = 'destination-in';
          ctx.drawImage(img, 0, 0);
          ctx.globalCompositeOperation = 'source-over';
        }

        context.drawImage(tintCanvas, 0, 180, canvas.width, 180);

        // ctx.drawImage(img, 0, 0);
        // ctx.clearRect(0, 0, ctx.width, ctx.height);
        // ctx.drawImage(img, 0, 0);

        // ctx.fillStyle = getRandomColor();
        // ctx.globalCompositeOperation = 'color';
        // ctx.fillRect(0, 0, ctx.width, ctx.height);
        // ctx.globalCompositeOperation = 'source-over';

        // ctx.globalCompositeOperation = 'destination-in';
        // ctx.drawImage(img, 0, 0);
        // ctx.globalCompositeOperation = 'source-over';

        // console.log('2nd: ', ctx.globalCompositeOperation);

        // context.drawImage(tintCanvas, 0, 120, canvas.width, 120);
        // context.save();

        // ctx.fillStyle = getRandomColor();
        // ctx.drawImage(img, 0, 0);
        // ctx.globalCompositeOperation = 'color';
        // ctx.fillRect(0, 0, img.width, img.height);
        // ctx.globalCompositeOperation = 'destination-in';
        // ctx.drawImage(img, 0, 0);
        // ctx.globalCompositeOperation = 'source-over';
        // console.log(context);


        // context.globalCompositeOperation = 'source-over';
        // console.log(`file: ${layer}.png`);
        // context.drawImage(img, 0, 0);

        // context.globalCompositeOperation = 'saturation';
        // context.fillStyle = color;
        // console.log(context.fillStyle);
        // context.fillRect(0, 0);

        // context.globalCompositeOperation = 'hue';
        // context.fillStyle = color;
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // context.globalCompositeOperation = 'destination-in';
        // context.drawImage(img, 0, 0);

        // context.globalCompositeOperation = 'source-over';
      }

      console.log(layers);


      // // context.drawImage(img, 0, 0, canvas.width, canvas.height);
      // context.drawImage(layers['body.png'], 0, 120, canvas.width, 120);
      // context.drawImage(layers['stomach.png'], 0, 120, canvas.width, 120);
      // context.drawImage(layers['feet.png'], 0, 120, canvas.width, 120);
      // context.drawImage(layers['beak.png'], 0, 120, canvas.width, 120);
      // context.drawImage(layers['shell.png'], 0, 120, canvas.width, 120);
      // context.drawImage(layers['outline.png'], 0, 120, canvas.width, 120);

      const attachment = new MessageAttachment(canvas.toBuffer());

      interaction.reply({ files: [attachment] });
    }
  },
};