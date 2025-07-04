class operation{
    constructor(layer){
        this.layer=layer
        this.scene=''
        this.initialManagers()
    }
    transition(scene,args){
        switch(scene){
            case 'main':
                this.entityManager.generateLevel(args[0],0)
            break
        }
        this.transitionManager.begin(scene)
    }
    initialManagers(){
        this.graphicsManager=new graphicsManager(this)
        this.entityManager=new entityManager(this.layer,this,this.graphicsManager)
        this.transitionManager=new transitionManager(this.layer,this)
    }
    display(){
        switch(this.scene){
            case 'main':
                this.layer.background(50)
                this.entityManager.display(this.scene)
            break
        }
        this.transitionManager.display()
    }
    update(){
        switch(this.scene){
            case 'main':
                this.entityManager.update(this.scene)
            break
        }
        this.transitionManager.update()
    }
}