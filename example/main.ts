import restfulserver from '../index';
restfulserver
    .configRoute({})
    .configDb({
        url: "postgres://postgres:root@localhost/test"
    })
    .start({ listen: 5001 })
    .catch((err) => { 
        console.error("启动发生错误", err);
        process.exit(-1);
    })