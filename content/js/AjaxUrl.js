// 在每次调用get,post,ajax时，都会先调用ajaxprefilter函数
// 在这个函数中，我们可以拿到ajax给我们提供的配置对象
$.ajaxPrefilter(function(options){
// 统一的跟路径   针对每一次的url地址，都进行url拼接
    options.url='http://www.liulongbin.top:3007'+options.url
})