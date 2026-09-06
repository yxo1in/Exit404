// 플레이어 이동

const player = (key) => {
    if(key.toLowerCase().slice(0, 5) === 'arrow'){
        move(key);
    }
    if(key.toLowerCase() === 'f'){
        intersect();
    }
}

const move = (direct) => {
    if(direct === 'ArrowUp'){
        
    }
    else if(direct === 'ArrowDown'){
        
    }
    else if(direct === 'ArrowLeft'){
        
    }
    else if(direct === 'ArrowRight'){

    }
}

const intersect = () => {
    
}

export { player }