
module.exports = function (source) {
  const { resourcePath } = this
  const res = codeLineTrack(source, resourcePath)
  return res
}

function codeLineTrack(source, resourcePath) {
  let lineList = source.split('\n') //方便处理行号信息
  let newList = []
  lineList.forEach((item, index) => {
      newList.push(addLineAttr(item, index + 1, resourcePath, source)) // 添加位置属性，index+1为具体的代码行号
  })
  return newList.join('\n')
}
function isRightTag(source, item) {
  const tag = item.slice(1)
  const end = new RegExp(`<\\/${tag}*>`, 'g')  //   </div>
  const selfEnd = new RegExp(`<${tag}.+/>`, 'g')  // <img/>
  if (end.test(source) || selfEnd.test(source)) {
      return true
  } else {
      return false
  }
}
function addLineAttr(lineStr, line, resourcePath, source) {
  let reg = /<[\w-]+(\.[A-Z]\w+)?/g
  let leftTagList = lineStr.match(reg)  //匹配开始标签 <div <span ...
  if (leftTagList) {
      leftTagList.forEach(item => {
          let regx = new RegExp(`${item}`, 'g')
          let location = `${item} data-source-location="${resourcePath}:${line}"`
          if (isRightTag(source, item)) {
              lineStr = lineStr.replace(regx, location)  //<div data-source-location="xx"
          }
      })
  }
  return lineStr
}