class player extends partisan{
    constructor(layer,operation,x,y){
        super(layer,x,y,{main:1,trigger:true,speed:10})
        this.operation=operation
        this.operation.graphicsManager.generateGraphics('PlayerDuck')
        this.character=new character(this.layer,this.operation.graphicsManager,0,0,'PlayerDuck',54)
    }
    display(level){
        switch(level){
            case 0:
                this.layer.push()
                this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
                this.character.display()
                this.layer.pop()
            break
        }
    }
}