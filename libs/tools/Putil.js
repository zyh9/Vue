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
    }
}
