import https from 'https';
export const getData=async ()=>{
let r;
let promise=new Promise(rx=>{r=rx});
    https.get('https://voice.baidu.com/api/newpneumonia?from=page&callback=jsonpx',(res)=>{
        let data=""
        res.on('data',(chunk)=>{
            data+=chunk;
        })
        res.on('end',()=>{
            global.jsonpx=(datax)=>{
                return datax
                // console.log(datax)
            }
            const datax=eval(data);
            r(datax)
        })
    });
return promise
}
