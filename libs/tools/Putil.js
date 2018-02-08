export let Putil = {
    // 禁用F12方法
    noKeyboard(){
        document.onkeydown = function(){
            if(window.event && window.event.keyCode == 123){
                event.keyCode = 0;
                event.returnValue = false;
                return false;
            }
        }
    },
    // 禁用右键菜单
	noRightClick(){
        document.oncontextmenu = function(ev){
            ev.preventDefault()
        }
    },
    // 控制台信息
    consoleInfo(){
        console.log(`%c`, `background: url(https://www.uupt.com/images/logo_re.png) no-repeat center;
        padding-left:220px;padding-bottom:40px;line-height:100px;`)

        console.log(`%c \n 加入UU跑腿，你的人生可以更精彩! -- UUPT前端团队\n %c请将简历发至 %c 896226896@qq.com %c（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）`,
         'color:#1a1a1a', 'color:#1a1a1a', 'color:#ff8b03', 'color:#1a1a1a')
    }
}
