class entityManager{
    constructor(layer,operation,graphicsManager){
        this.layer=layer
        this.operation=operation
        this.graphicsManager=graphicsManager
        this.tileset=[40,40]
        this.constants={gravity:1.25}
        this.entities={walls:[],enemies:[],players:[]}
        this.run={fore:[],update:[]}
        this.index={wall:0,enemy:0}
        this.initial()
    }
    initial(){
        this.entities.players.push(new player(this.layer,this.operation,0,0))
    }
    generateLevel(level,entry){
        let spent=[]
        for(let a=0,la=level.map.length;a<la;a++){
            spent.push([])
            for(let b=0,lb=level.map[a].length;b<lb;b++){
                spent[a].push(false)
            }
        }
        for(let a=0,la=level.map.length;a<la;a++){
            for(let b=0,lb=level.map[a].length;b<lb;b++){
                if(!spent[a][b]){
                    spent[a][b]=true
                    switch(level.map[a][b]){
                        case '.':
                            let total=1
                            for(let c=0,lc=la-a-1;c<lc;c++){
                                if(level.map[a][b]==level.map[a+c+1][b]){
                                    total++
                                    spent[a+c+1][b]=true
                                }else{
                                    c=lc
                                }
                            }
                            this.entities.walls.push(new wall(this.layer,this,this.tileset[0]*(b+0.5),this.tileset[1]*(a+total*0.5),this.tileset[0],this.tileset[1]*total,0))
                        break
                        case '1':
                            if(entry==0){
                                for(let c=0,lc=this.entities.players.length;c<lc;c++){
                                    this.entities.players[c].position.x=this.tileset[0]*(b+0.5)
                                    this.entities.players[c].position.y=this.tileset[1]*(a+0.5)
                                }
                            }
                        break
                    }
                }
            }
        }
        this.run.fore=[[this.entities.players,0],[this.entities.walls,0]]
        if(dev.bound){
            this.run.fore.push([this.entities.players,-1],[this.entities.walls,-1])
        }
        this.run.update=[this.entities.players,this.entities.walls]
        for(let a=0,la=8;a<la;a++){
            for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                this.entities.walls[b].ladder(a,this.entities.walls)
            }
            for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                if(this.entities.walls[b].remove){
                    this.entities.walls.splice(b,1)
                    b--
                    lb--
                }
            }
        }
    }
    display(scene,args){
        switch(scene){
            case 'main':
                for(let a=0,la=this.run.fore.length;a<la;a++){
                    for(let b=0,lb=this.run.fore[a][0].length;b<lb;b++){
                        this.run.fore[a][0][b].display(this.run.fore[a][1])
                    }
                }
            break
        }
    }
    update(scene,args){
        switch(scene){
            case 'main':
                for(let a=0,la=this.run.update.length;a<la;a++){
                    for(let b=0,lb=this.run.update[a].length;b<lb;b++){
                        this.run.update[a][b].update()
                        if(this.run.update[a][b].remove){
                            this.run.update[a].splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
            break
        }
    }
}