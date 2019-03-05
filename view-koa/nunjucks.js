/**
 * nunjucks示例代码
 */
const nunjucks = require('nunjucks');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views',{
    watch:true,
    //开发环境设置为true;生产环境,设置为false,避免每次都同步读取模板，直接使用内存中的缓存
    noCache:true
}));

var s = env.render('hello.html',{
    fruits:[
        "apple",
        "pear"
    ]
});

var s1 = env.render('extend.html',{
    head:"Hello",
    body:"bla bla bla ......"
})
console.log(s1);