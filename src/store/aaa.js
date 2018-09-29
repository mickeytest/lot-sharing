
let a = []
for(let j = 0; j< 3; j ++){
  for(let i = 0; i< 11; i ++)
  {
    let b = [j,i,Math.floor(Math.random()*4+1)]
    a.push(b)
  }
}


console.log(a)



let aaa= {"a": 2}
let temp = ""
console.log(aaa[0])

for (let i in aaa) { //用javascript的for/in循环遍历对象的属性
        console.log( i + ":" + aaa[i] + "\n");
    }
