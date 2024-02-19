let arr = [{id : 1} , { id : 2 }, {id : 3} , {id : 4}]
const item = {id:12}

// const exitItem = {id : 1}

const existItem = arr.find((x)=> x.id === item.id)
console.log(existItem)

if(!existItem){
  arr = [...arr , item]
  console.log('now arr : ', arr)
}

console.log('this is the exist item',existItem)

console.log('okay',arr.map((i) => i.id === item.id ))

const mapped = arr.map((i) => i.id === item.id ? item : i )

console.log('hellow',mapped)
