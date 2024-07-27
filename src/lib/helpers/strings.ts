export function capitalize(s: string): string {
  return s[0].toUpperCase() + s.slice(1)
}

export function wordCount(s: string){
  s = s.replace(/(^\s*)|(\s*$)/gi,"")
  s = s.replace(/[ ]{2,}/gi," ")
  s = s.replace(/\n /,"\n")
  return s.split(' ').filter(function(str){return str!="";}).length
}