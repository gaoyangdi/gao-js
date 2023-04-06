const strSplit = (str,limit) => {
    return str.split(limit)
}

const strReplace = (str,limit) => {
    return str.replace(limit,'')
}
  

export {
  strSplit,
  strReplace
}