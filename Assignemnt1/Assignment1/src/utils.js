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



const sumBy=(array,keyFn)=>{
const result=[...array].reduce((accumulator,current)=>{
let key=keyFn(current)
accumulator=accumulator+key;
return accumulator;
},0)

return result;
}



const uniqueBy=(array,keyFn)=>{
let result=[...array].reduce((accumulator,current,index,array)=>{

let key=keyFn(current)
return accumulator.seenKeys.includes(key)?{seenKeys:[...accumulator.seenKeys],items:[...accumulator.items]}:{seenKeys:[...accumulator.seenKeys,...[key]],items:[...accumulator.items,...[current]]}
},{seenKeys:[],items:[]})

return result.items;
}



// const sortByThenBy=(array,keyFn1,keyFn2)=>{
// let result=array.reduce((accumulator,current,index,array)=>{

// let tempresult=accumulator.reduce((accu,curre,idx,arr)=>{
// if(idx+1<accu.length && keyFn1(accu[idx]) < keyFn1(accu[idx+1])){
//     let temp=null;
//     temp=accu[idx];
//     accu[idx]=accu[idx+1];
//     accu[idx+1]=temp;
// }

// else if(idx+1<accu.length && keyFn1(accu[idx]) === keyFn1(accu[idx+1])){
// if(keyFn2(accu[idx]) > keyFn2(accu[idx+1])){
//      let temp=null;
//     temp=accu[idx];
//     accu[idx]=accu[idx+1];
//     accu[idx+1]=temp;
// }
// }

// return accu;

// },accumulator)

// return tempresult;
// },array)
// console.log(result)
// }

const sortByThenBy = (array, keyFn1, keyFn2) =>
  [...array].sort((a, b) => {
    const k1a = keyFn1(a);
    const k1b = keyFn1(b);

    if (k1a < k1b) return -1;
    if (k1a > k1b) return 1;

    const k2a = keyFn2(a);
    const k2b = keyFn2(b);

    if (k2a < k2b) return -1;
    if (k2a > k2b) return 1;

    return 0;
  });



const chunk=(array,Chunk)=>{
  if( !array || array.size<=0){
    return []
  }
    let result=[...array].map((element,idx,array)=>{
        let res=idx%Chunk===0?array.slice(idx,idx+Chunk):null;
         return res;
    }).filter(Boolean)

    return result;
}

