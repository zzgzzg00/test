/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const initState={
        fromStation:'北京',
        toStation:'上海',
        date:'20170529',
        lists:[{
            url:'http://www.baidu.com',
            name:'百度'
        },{
            url:'http://www.hao123.com',
            name:'hao123'
        },{
            url:'http://touch.train.qunar.com',
            name:'去哪touch'
        },{
            url:'http://trian.qunar.com',
            name:'去哪pc'
        }],
        styleObj:{
            search:{display:'block'},
            list:{display:'none'}
        }
    }
    window.example.initState=initState;
}