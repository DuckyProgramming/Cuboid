class player extends partisan{
    constructor(layer,parent,x,y){
        super(layer,x,y,{main:1,trigger:true,speed:10})
        this.parent=parent
        this.width=24
        this.height=48
        this.parent.graphicsManager.generateGraphics('PlayerDuck')
        this.character=new character(this.layer,this.parent.graphicsManager,0,0,'PlayerDuck',54)
        this.jump={time:0,active:0}
        this.collided={wall:[false,false,false,false]}
        this.offset.position.y=24
    }
    display(level){
        switch(level){
            case -1:
                this.layer.noFill()
                this.layer.stroke(0,255,100,this.fade.main)
                this.layer.strokeWeight(4)
                this.layer.rect(this.position.x,this.position.y,this.width-4,this.height-4)
            break
            case 0:
                this.layer.push()
                this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
                this.character.display()
                this.layer.pop()
            break
        }
    }
    update(){
        super.update()
        this.character.update()
        let inputKeys=inputs.keys[0]
        let controlDirection={x:0,y:0}
        if(inputKeys[0]&&!inputKeys[1]){
            this.velocity.x-=1.2
            this.character.direction.goal=-54
            controlDirection.x--
        }else if(inputKeys[1]&&!inputKeys[0]){
            this.velocity.x+=1.2
            this.character.direction.goal=54
            controlDirection.x++
        }
        if(inputKeys[2]&&(this.jump.time>0||this.jump.active>0)){
            if(this.jump.time>0){
                this.jump.time=0
                this.jump.active=8
            }
            this.velocity.y-=constrain(8.5+this.velocity.y*0.5,2,8)
        }else if(this.jump.time>0){
            this.jump.time--
        }
        if(this.jump.active>0){
            this.jump.active--
        }
        this.velocity.x*=0.8
        this.velocity.y*=0.99
        this.velocity.y+=this.parent.entityManager.constants.gravity
        if(controlDirection.x!=0||this.character.animSet.loop>0&&this.character.animSet.loop%15!=0){
            this.character.runAnim(0,1)
        }else{
            this.character.animSet.loop=0
        }
        this.character.mainAnim()
        if(this.collided.wall[0]>0&&this.collided.wall[1]>0||this.collided.wall[2]>0&&this.collided.wall[3]>0){
            this.dead.trigger=true
        }
        for(let a=0,la=this.collided.wall.length;a<la;a++){
            if(this.collided.wall[a]>0){
                this.collided.wall[a]--
            }
        }
    }
}