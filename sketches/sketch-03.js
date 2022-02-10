const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  fps: 30
};

const sketch = ({ context, width, height }) => {
  const agents = [];
    for (let i=0;i<40;i++){
      const x = random.range(0,width);
      const y = random.range(0,height);
      agents.push(new Agent(x,y));
    }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // const agent_a = new Agent(800,400,10);
    // const agent_b = new Agent(300,700,10);
    // agent_a.draw(context);
    // agent_b.draw(context);

    for (i=0;i<agents.length;i++){
      const agent = agents[i];
      for (j=i+1;j<agents.length;j++){
        const other = agents[j];
        const dist = agent.pos.getDistance(other.pos);

        if (dist>200) continue; // continue means ignore the rest of the loop

        context.beginPath();
        context.strokeStyle = 'blue';
        //mapRange maps one range to another min-max included
        //so linewidth descreases when distance gets bigger
        context.lineWidth = math.mapRange(dist,0,200,4,1);
        context.moveTo(agent.pos.x,agent.pos.y);
        context.lineTo(other.pos.x,other.pos.y);
        context.stroke();
      }
    }
    
    agents.forEach(agent=>{
      agent.update();
      agent.draw(context);
      agent.bounce(width,height);
    })
    // context.beginPath();
    // context.arc(point_a.x,point_a.y,point_a.radius,0,Math.PI*2)
    // context.fillStyle = 'blue';
    // context.fill();

    // context.beginPath();
    // context.arc(point_b.x,point_b.y,point_b.radius,0,Math.PI*2)
    // context.fillStyle = 'black';
    // context.fill();
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x,y){
    this.x = x;
    this.y = y; 
  }
  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx**2+dy**2)
  }
}
class Agent{
  constructor(x,y){
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-1,1),random.range(-1,1));
    this.radius = random.range(1,20);
  }
  
  draw(context){
    context.save();
    context.translate(this.pos.x,this.pos.y);
    context.beginPath();
    context.arc(0,0,this.radius,0,Math.PI*2);
    context.fillStyle = 'pink';
    context.fill();
    context.restore();
  }
  
  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width,height){
    if (this.pos.x<=0 || this.pos.x >=width) this.vel.x *= -1;
    if (this.pos.y<=0 || this.pos.y >=height) this.vel.y *= -1;
  }
}