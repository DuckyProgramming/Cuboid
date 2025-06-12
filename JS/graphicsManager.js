class graphicsPackage{
    constructor(name,generateSprite,generateGraphics,setupGraphics,display,displayComponent){
        this.name=name
        this.generateSprite=generateSprite
        this.generateGraphics=generateGraphics
        this.setupGraphics=setupGraphics
        this.display=display
        this.displayComponent=displayComponent
    }
}
class graphicsManager{
    constructor(){
        this.initialPackages()
        this.data=[
        ]
    }
    displaySymbol(layer,x,y,type,direction,size,fade){
        layer.push()
        layer.translate(x,y)
        layer.rotate(direction)
        layer.scale(size)
        layer.noFill()
        layer.noStroke()
        switch(type){
        }
        layer.pop()
    }
    controlSpin(set,direction,spec){
        for(let g=0,lg=set.length;g<lg;g++){
            if(set[g].spin[0]>set[g].spin[1]&&spec==1){
                set[g].spin=[set[g].spin[1],set[g].spin[0],set[g].spin[2]]
                set[g].y=[set[g].y[1],set[g].y[0],set[g].y[2]]
            }
            for(let h=0,lh=set[g].spin.length;h<lh;h++){
                if(direction+set[g].spin[h]>180){
                    set[g].spin[h]-=360
                }else if(direction+set[g].spin[h]<-180){
                    set[g].spin[h]+=360
                }
            }
        }
    }
    displayTrianglesBack(layer,parts,direction,base,width,weight,slant,color,fade){
        if(color==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }else{
            layer.fill(...color,fade)
            layer.stroke(...color,fade)
        }
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]<0){
                if(c[1]<0){
                    if(c[2]<0){
                        layer.triangle(
                            s[0]*width/2,base,
                            s[1]*width/2,base,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }
                }else{
                    if(c[2]<0){
                        let inter=reality[1]<90?
                            abs(-90-reality[1])/abs(reality[2]-reality[1]):
                            abs(270-reality[1])/abs(reality[2]-reality[1])
                        layer.quad(
                            s[0]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<90?
                            abs(-90-reality[0])/abs(reality[2]-reality[0]):
                            abs(270-reality[0])/abs(reality[2]-reality[0])
                        layer.triangle(
                            s[0]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }else{
                if(c[1]<0){
                    if(c[2]<0){
                        let inter=reality[1]<-90?
                            abs(-270-reality[0])/abs(reality[2]-reality[0]):
                            abs(90-reality[0])/abs(reality[2]-reality[0])
                        layer.quad(
                            s[1]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<-90?
                            abs(-270-reality[1])/abs(reality[2]-reality[1]):
                            abs(90-reality[1])/abs(reality[2]-reality[1])
                        layer.triangle(
                            s[1]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    displayTrianglesFront(layer,parts,direction,base,width,weight,slant,color,fade){
        if(color==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }else if(weight==0){
            layer.fill(...color,fade)
            layer.noStroke()
        }else{
            layer.fill(...color,fade)
            layer.stroke(...color,fade)
        }
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]>=0){
                if(c[1]>=0){
                    if(c[2]>=0){
                        layer.triangle(
                            s[0]*width/2,base,
                            s[1]*width/2,base,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }
                }else{
                    if(c[2]>=0){
                        let inter=reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[2]-reality[1]):
                            abs(90-reality[1])/abs(reality[2]-reality[1])
                        layer.quad(
                            s[0]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[2]-reality[0]):
                            abs(90-reality[0])/abs(reality[2]-reality[0])
                        layer.triangle(
                            s[0]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }else{
                if(c[1]>=0){
                    if(c[2]>=0){
                        let inter=reality[1]<90?
                            abs(-90-reality[0])/abs(reality[2]-reality[0]):
                            abs(270-reality[0])/abs(reality[2]-reality[0])
                        layer.quad(
                            s[1]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<90?
                            abs(-90-reality[1])/abs(reality[2]-reality[1]):
                            abs(270-reality[1])/abs(reality[2]-reality[1])
                        layer.triangle(
                            s[1]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    displayTrianglesBackMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        if(color1==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            if(color!=-1){
                layer.fill(...mergeColor(color1,color2,a/la))
                layer.stroke(...mergeColor(color1,color2,a/la))
            }
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]<0){
                if(c[1]<0){
                    if(c[2]<0){
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }
                }else{
                    if(c[2]<0){
                        let inter=[
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[0]-reality[1]):
                            abs(270-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[1]-reality[2]):
                            abs(270-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[1]):
                            abs(270-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[2]):
                            abs(270-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }else{
                if(c[1]<0){
                    if(c[2]<0){
                        let inter=[
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[1]):
                            abs(90-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[2]):
                            abs(90-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[0]-reality[1]):
                            abs(90-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[1]-reality[2]):
                            abs(90-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    displayTrianglesFrontMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        if(color1==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            if(color!=-1){
                layer.fill(...mergeColor(color1,color2,a/la))
                layer.stroke(...mergeColor(color1,color2,a/la))
            }
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]>=0){
                if(c[1]>=0){
                    if(c[2]>=0){
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }
                }else{
                    if(c[2]>=0){
                        let inter=[
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[0]-reality[1]):
                            abs(90-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[1]-reality[2]):
                            abs(90-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[1]):
                            abs(90-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[2]):
                            abs(90-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }else{
                if(c[1]>=0){
                    if(c[2]>=0){
                        let inter=[
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[1]):
                            abs(270-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[2]):
                            abs(270-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[0]-reality[1]):
                            abs(270-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[1]-reality[2]):
                            abs(270-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    subSprite(width,height,jumpX,jumpY){
        let layer=createGraphics(width,height)
        setupLayer(layer)
        layer.translate(jumpX,jumpY)
        layer.scale(5)
        return layer
    }
    generateGraphics(name){
        let owned=false
        for(let a=0,la=this.data.length;a<la;a++){
            if(this.data[a].name==name){
                owned=true
            }
        }
        if(!owned){
            let data
            for(let a=0,la=this.packages.length;a<la;a++){
                if(this.packages[a].name.includes(name)){
                    data=this.packages[a].generateGraphics(this)
                }
            }
            data.name=name
            this.data.push(data)
        }
    }
    getData(name){
        for(let a=0,la=this.data.length;a<la;a++){
            if(this.data[a].name==name){
                return this.data[a]
            }
        }
    }
    getPackage(name){
        for(let a=0,la=this.packages.length;a<la;a++){
            if(this.packages[a].name.includes(name)){
                return this.packages[a]
            }
        }
    }
    initialPackages(){
        this.packages=[]
        this.packages.push(new graphicsPackage(
            [`PlayerDuck`,`Duck`],
            0,
            function(parent){
                return {
                    color:{
                        eye:{back:[0,0,0],front:[40,30,0],glow:[250,250,250]},
                        beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                        skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}
                    },
                }
            },function(){
                this.components=this.standardModel(
                    1,
                    10,[{x:-3,y:-15,z:0},{x:3,y:-15,z:0}],[{x:-3,y:-25,z:0},{x:3,y:-25,z:0}],
                    [-19,-38,-32,-32,-33.5,-40,-40],[[14,24],[30,30],[12,12],[12,12],[12,12],[12,12]],[18,18]
                )
                this.routines.calculatepart=[0,4,5]
            },function(){
                for(let a=0,la=this.components.arms.length;a<la;a++){
                    let part=this.components.arms[a]
                    if(part.display&&part.appear.bottom.z<=0){
                        this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                        this.layer.noStroke()
                        this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
                    }
                }
                for(let a=0,la=this.components.legs.length;a<la;a++){
                    let part=this.components.legs[a]
                    if(part.display&&part.appear.bottom.z<=0){
                        this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                        this.layer.noStroke()
                        this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
                    }
                }
                if(this.components.body.display){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
                    this.layer.ellipse(0,this.components.body.level,this.components.body.dimensions[0],this.components.body.dimensions[1])
                }
                for(let a=0,la=this.components.legs.length;a<la;a++){
                    let part=this.components.legs[a]
                    if(part.display&&part.appear.bottom.z>0){
                        this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                        this.layer.noStroke()
                        this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
                    }
                }
                if(this.components.head.beak.main.display&&lcos(this.components.head.beak.spin+this.direction.main)<=0){
                    this.layer.fill(...this.flashColor(this.components.head.beak.main.color),this.fade.main*this.components.head.beak.main.fade)
                    this.layer.noStroke()
                    this.layer.ellipse(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.main.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,8)
                }
                if(this.components.head.beak.mouth.display&&lcos(this.components.head.beak.spin+this.direction.main)<=0){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.head.beak.mouth.color),this.fade.main*this.components.head.beak.mouth.fade)
                    this.layer.strokeWeight(0.5)
                    this.layer.arc(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.mouth.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,1,0,180)
                }
                if(this.components.head.beak.nostril.display&&lcos(this.components.head.beak.spin+this.direction.main)<=0){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.head.beak.nostril.color),this.fade.main*this.components.head.beak.nostril.fade)
                    this.layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        this.layer.line(lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level+0.5)
                    }
                }
                if(this.components.head.display){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.components.head.color),this.fade.main*this.components.head.fade)
                    this.layer.ellipse(0,this.components.head.level,this.components.head.dimensions[0],this.components.head.dimensions[1])
                }
                for(let a=0,la=this.components.arms.length;a<la;a++){
                    let part=this.components.arms[a]
                    if(part.display&&part.appear.bottom.z>0){
                        this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                        this.layer.noStroke()
                        this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.components.head.eye[a].display){
                        this.displayGeneralComponent(0,[a])
                    }
                }
                if(this.components.head.beak.main.display&&lcos(this.components.head.beak.spin+this.direction.main)>0){
                    this.layer.fill(...this.flashColor(this.components.head.beak.main.color),this.fade.main*this.components.head.beak.main.fade)
                    this.layer.noStroke()
                    this.layer.ellipse(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.main.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,8)
                }
                if(this.components.head.beak.mouth.display&&lcos(this.components.head.beak.spin+this.direction.main)>0){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.head.beak.mouth.color),this.fade.main*this.components.head.beak.mouth.fade)
                    this.layer.strokeWeight(0.5)
                    this.layer.arc(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.mouth.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,1,0,180)
                }
                if(this.components.head.beak.nostril.display&&lcos(this.components.head.beak.spin+this.direction.main)>0){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.head.beak.nostril.color),this.fade.main*this.components.head.beak.nostril.fade)
                    this.layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        this.layer.line(lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level+0.5)
                    }
                }
            },
            0,
        ))
        /*this.packages.push(new graphicsPackage(
            ``,
            function(type,direction,data){
                switch(type){
                    case 0:
                        layer=parent.subSprite(200,200,100,100)
                        return layer
                }
            },function(){
                let data={}
                return data
            }
        ))*/
    }
}