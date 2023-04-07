const strSplit = (str,limit) => {
    return str.split(limit)
}

const strReplace = (str,limit) => {
    return str.replace(limit,'')
}

function s2ab(s) {
	if(typeof ArrayBuffer === 'undefined') return s2a(s);
	var buf = new ArrayBuffer(s.length), view = new Uint8Array(buf);
	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}


export {
  strSplit,
  strReplace
}