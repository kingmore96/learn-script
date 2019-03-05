var fn_index = async (ctx, next) => {
    ctx.render('index.html',{
        title:'Welcome'
    }) 
};

var fn_signin =async(ctx,next) =>{
    var email = ctx.request.body.email;
    var password = ctx.request.body.password;

    console.log(`sign in with email : ${email},password:${password}`);
    if(email === 'koa@163.com' && password === '123456'){
        ctx.render('signin_ok.html',{
            title:'Sign in ok',
            name:'koa'
        })
    }else{
        ctx.render('signin_failed.html',{
            title:'Sign in failed'
        });
    }
};

module.exports = {
    'GET /' : fn_index,
    'POST /signin' : fn_signin
}