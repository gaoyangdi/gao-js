const strSplit = (str,limit) => {
    return str.split(limit)
}

const strReplace = (str,limit) => {
    return str.replace(limit,'')
}

const ArrayBufferUTF8ToStr = (buffer, encoding = 'utf-8') => {
  const decoder = new TextDecoder(encoding);
  return decoder.decode(buffer);
}


export {
  strSplit,
  strReplace,
  ArrayBufferUTF8ToStr
}