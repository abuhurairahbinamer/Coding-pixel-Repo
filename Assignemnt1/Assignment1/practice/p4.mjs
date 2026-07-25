//practice questions
//P4
//practice questions

const groupBy=(array,keyFn)=>{
let result=[...array].reduce((accumulator,current)=>{
let key=keyFn(current);
let newValue=accumulator[key] && accumulator[key].length!==0?[...accumulator[key],current]:current?[current]:null;
return !newValue?{...accumulator}:{...accumulator,[key]:newValue}

  },{})

return result
}
const GroupCount=(array,keyFn)=>{

let result=[...array].reduce((accumulator,current)=>{
let key=keyFn(current)
// let count=array.reduce((accu,curr,i,arr)=>{
//     if(key===curr.age){
        
//          accu++;
//         return accu;
//     }
//     else{
//         return accu;
//     }
// },0)
let count=accumulator[key]?accumulator[key]+1:1;

return {...accumulator,...{[key]:count} }
},{})

return result;
}



const res6=groupBy(['a','bb','cc','ddd',""],s=>s.length);
console.log(res6);
const res7=GroupCount(['a','bb','cc','ddd','ddd'],s=>s);
console.log(res7);