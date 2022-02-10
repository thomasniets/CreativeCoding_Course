const canvasSketch = require('canvas-sketch');
 
const settings = {
  dimensions: 
  // 'A4'
  [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, width, height);

    context.strokeStyle = 'pink';
    context.lineWidth = width*0.01;

    for (let i=0;i<5;i++){
        for (let j=0;j<5;j++){
            
            let w = width*0.1;
            let h = width*0.1;
            let gap = width*0.05;
            let x = width*0.01 + i * (w+gap);
            let y = width*0.01 + j * (h+gap); 

            context.beginPath();
            context.rect(x,y,w,h);
            if(i==j || Math.random()<0.5){
                context.rect(x+8,y+8,w-16,h-16);
            }
            context.stroke();

        }
        
    }
  };
};

canvasSketch(sketch, settings);
