export const removeToken =()=>{
    localStorage.removeItem('handmeToken');
    localStorage.removeItem('handmeUser');
}
export const resOk =(status)=>{
    if(status <230 && status > 199){
        return true
    }else{
        return false
    }
}

