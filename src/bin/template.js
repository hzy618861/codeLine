
//客户端初始化事件 点击触发获取服务器跳转对应行号代码
export default  function initLine() {
    function getFilePath(element) {
        if (!element || !element.getAttribute) return null
        if (element.getAttribute('data-source-location')) {
            return element.getAttribute('data-source-location')
        }
        //处理组件上加自定义属性只会加到最外层，点击组件内部元素需要向上查找到父元素的属性
        return getFilePath(element.parentNode)
    }
    document.body.onclick = function (e) {
        if (e.metaKey || e.shiftKey) { // ctrl + 点击metaKey为true  shift+点击shiftKey为true
            e.preventDefault()
            const filePath = getFilePath(e.target)
            if (filePath) {
                fetch(`http://localhost:{PORT}/lineCode?filePath=`+filePath).then(res => {
                    console.log(res)
                })
            } else {
                console.error('无法查询到行信息')
            }
        }
    }
  
}
