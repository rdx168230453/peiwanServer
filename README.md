麦芽app  node后台源代码

安装supervisor启动node项目，热更新代码。
启动项目：supervisor index.js
项目记录：
使用ws完成websocket长连接。ws的数据格式目前用JSON格式解析,还没找到方法自动解析数据 
前端：
1、前端连接websocket,传入用户id,返回聊天列表，获取消息其他id前99条，或者和本地缓存对比，看是不是最新的。显示全部未读消息。
2、进入消息页面，显示单独的未读消息。点击开始对话，遍历聊天信息,
3、发送消息，传入id和内容，
后台：
1、后台查询用户id的最新消息，获取id的聊天列表
3、收到id和内容保存到mysql,发送到对面id
问题：服务器轮询数据返回最新 or 发送了新的消息，新的客户端连接，查询数据, 
查询id的聊天推送到聊天的id用户
[
    {
        a:{
            content:'你是'，
            duqu:'true',
        },
        b:{
            content:'rdx'，
            duqu:'false',
        }
    }, 
    {
        a:{
            content:'你是'，
            duqu:'true',
        },
        c:{
            content:'ds'，
            duqu:'false',
        },
        c:{
            content:'....'，
            duqu:'false',
        }
    },   
]