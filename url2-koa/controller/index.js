var fn_index = async (ctx, next) => {
    console.log(`start fn_index! ${ctx.request.url}`)
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin =async(ctx,next) =>{
    console.log(`start fn_signin! ${ctx.request.url}`)
    var name = ctx.request.body.name;
    var password = ctx.request.body.password;

    console.log(`sign in with name : ${name},password:${password}`);
    if(name === 'koa' && password === '123456'){
        ctx.response.body = `<h1>Welcome,${name}</h1>`;
    }else{
        ctx.response.body = `<h1>login failed!</h1>
        <p><a href='/'>Try Again</a></p>`;    
    }
};

module.exports = {
    'GET /' : fn_index,
    'POST /signin' : fn_signin
}