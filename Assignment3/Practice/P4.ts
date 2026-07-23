interface grouped{
    r: string
}

const groupBy=<T>(array:T[],keyFn:((item:T)=>number|string)):Record<string,T[]>=>{
let result=[...array].reduce((accumulator,current)=>{
let key=keyFn(current);

if(!accumulator[key]){
   accumulator[key]=[]
}
accumulator[key].push(current);
return accumulator;

  },{} as Record<string,T[]>)

return result
}
let result=groupBy<grouped>([{r:'a'},{r:'b'},{r:'a'}],(item)=>item.r.toString())
console.log(result)









