/**。
 * 为ctx注册新的render方法，方便后面的ctx实例，直接调用ctx.render方法，实现模板渲染，写到response.body
 */
const nunjucks = require('nunjucks');

/**
 * 创建一个nunjucks的Environment
 * @param {*} path nunjucks的文件加载器需要设置的加载目录。比如：工程目录下views目录存放所有模板，那么传入views。 
 * @param {*} opts 文件加载器和Environment的配置参数
 */
function createEnv(path,opts){
    var autoescape = opts.autoescape || true;
    var throwOnUndefined = opts.throwOnUndefined || false;
    var trimBlocks = opts.trimBlocks || false;
    var lstripBlocks = opts.lstripBlocks || false;

    var watch = opts.watch || false;
    var noCache = opts.noCache || false;

    var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path,{
        noCache : noCache,
        watch : watch
    }),{
        autoescape : autoescape,
        throwOnUndefined : throwOnUndefined,
        trimBlocks : trimBlocks,
        lstripBlocks : lstripBlocks
    });

    if(opts.filters){
        for( var filterName in opts.filters){
            env.addFilter(filterName,opts.filters[f]);
        }
    }

    return env;
}

/**
 * 为ctx注册新的render方法
 * @param {*} path nunjucks的文件加载器需要设置的加载目录。比如：工程目录下views目录存放所有模板，那么传入views。 
 * @param {*} opts 文件加载器和Environment的配置参数
 * @param {*} app koa的实例对象
 */
function templating(path,opts,app){
    let env = createEnv(path,opts);
    app.context.render = function(view,model){
        this.response.body = env.render(view,Object.assign({},this.state || {},model||{}));
        this.response.type = 'text/html';
    }
}

module.exports = templating;