const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const addController = require('./controller');
const app = new Koa();
const templating = require('./templating');

templating('views',{
    noCache:true
},app);

app.use(async(ctx,next) =>{
    console.log(`Process ${ctx.request.method},${ctx.request.url}......`);
    await next();    
});

app.use(bodyParser());

app.use(addController());

app.listen(3000);

console.log("开始监听啦！");

