
//p7
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

const res11=chunk([1,2,3,4,5,6],2);
console.log(res11);



