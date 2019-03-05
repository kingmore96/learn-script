const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const routes = require('./controller');

const app = new Koa();

app.use(async(ctx,next) =>{
    console.log(`Process ${ctx.request.method},${ctx.request.url},${ctx.request.path}`);
    await next();    
});

app.use(bodyParser());

app.use(routes);

app.listen(3000);

console.log("开始监听啦！");

