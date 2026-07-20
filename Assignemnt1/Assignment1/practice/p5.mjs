//p5

//uniqueBy function already made
const uniqueBy=(array,keyFn)=>{
let result=[...array].reduce((accumulator,current,index,array)=>{

let key=keyFn(current)
return accumulator.seenKeys.includes(key)?{seenKeys:[...accumulator.seenKeys],items:[...accumulator.items]}:{seenKeys:[...accumulator.seenKeys,...[key]],items:[...accumulator.items,...[current]]}
},{seenKeys:[],items:[]})

return result.items;
}

const LastOccurance=(array,keyFn)=>{
const result=[...array].reduce((accumulator,current,index)=>{
let key=keyFn(current)

return accumulator.seenKeys.includes(key)?{seenKeys:[...accumulator.seenKeys],items:[...accumulator.items],occurance: { ...accumulator.occurance,[key]: [...(accumulator.occurance[key] || []), current]
}}:accumulator.seenKeys.length===0 ?{seenKeys:[...accumulator.seenKeys,...[key]],items:[...accumulator.items,...[current]],occurance: {...accumulator.occurance,[key]: [current]}}:{seenKeys:[...accumulator.seenKeys,...[key]],items:[...accumulator.items,...[current]],occurance: {...accumulator.occurance}}

},{seenKeys:[],items:[],occurance:{}});

let filterArr=Object.keys(result.occurance);

const finalResult=[...array].filter((ele,idx)=>{
let eleKeys=Object.values(ele);

let BoolResult=eleKeys.find((e,i)=>{
 
if(filterArr.includes(""+e)){
  let take=result.occurance[e][result.occurance[e].length-1];
  return take;
}
else{
  return false;
}
})

if(BoolResult){

  let take1=result.occurance[BoolResult][result.occurance[BoolResult].length-1];
  let approve=Object.keys(take1).every((el,idx)=>{
   
    return take1[el]===ele[el]
  })
  
if(approve){
  return true
}
// else{
//   return true
// }
}
else{
  return true;
}
})

return finalResult;
}
const res8=uniqueBy([{id:1,v:'a'},{id:1,v:'b'},{id:2}], x => x.id);
console.log(res8);
// deeper
const res9=LastOccurance([{id:1,v:'a'},{id:1,v:'b'},{id:2}],x=>x.id);
console.log(res9);