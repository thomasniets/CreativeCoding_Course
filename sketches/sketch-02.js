const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};
// есть в canvas-sketch-util -> math.degtorad
const degToRad = (degrees) =>{
  return degrees *  Math.PI / 180
}
// есть в canvas-sketch-util 
const randomRange = (min,max) => {
  return Math.random()*(max-min)+min;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    //--- Звездочка ---
    // context.fillStyle = 'black';
    // const x = width*0.5;
    // const y = height*0.5;
    // const w = width*0.01;
    // const h = height*0.1;
    // const num = 12;

    // for (let i=0;i<num;i++){
    //   let angle = degToRad(360/num)*i;

    //   context.save() // сохраняем норм положение осей
    //   context.translate(x,y); //теперь отсчет идет от width*0.5, height*0.5 - это (0,0)
    //   context.rotate(angle);

    //   context.beginPath();
    //   context.rect(-w*0.5,-h*0.5,w,h);
    //   context.fill()
    //   context.restore() // восстанавливаем дефолтное (сохраненное) положение осей
    // }
    
    context.fillStyle = 'black';
    context.strokeStyle = 'pink';
    const cx = width*0.5;
    const cy = height*0.5;
    const w = width*0.01;
    const h = height*0.1;
    const num = 50;
    const radius = width*0.3;
    let x,y;

    for (let i=0;i<num;i++){
      const slice = math.degToRad(360/num);
      const angle = slice*i;
      x = cx + radius*Math.sin(angle);
      y = cy + radius*Math.cos(angle);

      context.save() // сохраняем норм положение осей
      context.translate(x,y); //теперь отсчет идет от width*0.5, height*0.5 - это (0,0)
      context.rotate(-angle);
      //context.scale(1,1); // ничего не делает
      context.scale(random.range(1,3),0.6);

      context.beginPath();
      context.rect(-w*0.5,-h*0.5,w,h);
      context.fill()
      context.restore() // восстанавливаем дефолтное (сохраненное) положение осей
      
      if (i>num/4){
        context.save();
        context.translate(cx,cy);
        context.rotate(-angle);
        context.lineWidth = random.range(1,5);
        context.beginPath();
        context.arc(0,0,radius,slice*random.range(0,-2),slice*0.6);
        context.stroke();
        context.restore();
      }
      
    }
  };
};

canvasSketch(sketch, settings);
