function keyPressed(){
    switch(key){
        case 'a': case 'A': inputs.keys[0][0]=true; break
        case 'd': case 'D': inputs.keys[0][1]=true; break
        case 'w': case 'W': inputs.keys[0][2]=true; break
        case 's': case 'S': inputs.keys[0][3]=true; break
    }
}
function keyReleased(){
    switch(key){
        case 'a': case 'A': inputs.keys[0][0]=false; break
        case 'd': case 'D': inputs.keys[0][1]=false; break
        case 'w': case 'W': inputs.keys[0][2]=false; break
        case 's': case 'S': inputs.keys[0][3]=false; break
    }
}