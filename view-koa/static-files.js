/**
 * 处理静态文件的middleware
 */
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

 /**
  * 若请求为静态文件，读取静态文件并返回
  * @param {*} projStaticPath 静态文件在项目目录的文件夹名称 比如：静态文件统一放在项目目录的static文件夹下 path应传/static/。
  * @param {*} dir 操作系统文件系统的项目绝对路径。比如：当前view-koa放置在C:\Users\wgg9696\learn-script下,应传入该绝对路径。
  */
function staticFiles(projStaticPath,dir){
    return async(ctx,next) =>{
        let sPath = ctx.request.path;
        if(sPath.startsWith(projStaticPath)){
            let fullpath = path.join(dir,sPath);
            if(await fs.exists(fullpath)){
                ctx.response.type = mime.getType(sPath);
                ctx.response.body = await fs.readFile(fullpath);
            }else{
                ctx.response.status = 404;
            }
        }else{
            await next();
        }
    }
}

module.exports = staticFiles;