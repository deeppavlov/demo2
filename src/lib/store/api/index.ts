const API = {
    odqa: (): Promise<any> => {
        const prom = new Promise(resolve => {
            setTimeout(()=>{
                resolve('Hello');
            }, 500);
        })
        return prom;
    }
}


export default API;