const router = require('koa-router')();

const fs = require('fs');

const path = require('path');

function addController(){
    var files = fs.readdirSync(path.join(__dirname,'controller'));
    var js_files = files.filter(function(f){
        return f.endsWith('.js');
    });

    //遍历数组用forof
    for (var f of js_files) {
        console.log(`process controller,${f}`);

        let mapping = require(path.join(__dirname,'controller',f));
        //遍历对象用forin
        for(var url in mapping){
            if(url.startsWith('GET ')){
            let path = url.substring(4);
            router.get(path,mapping[url]);
            console.log(`register url mapping:GET ${path}`);
            }else if(url.startsWith('POST ')){
            let path = url.substring(5);
            router.post(path,mapping[url]); 
            console.log(`register url mapping:POST ${path}`);
            }else{
            console.log(`invaid url : ${url}`);     
            }
        }
    }
    return router.routes();
}

var routes = addController();

module.exports = routes;

