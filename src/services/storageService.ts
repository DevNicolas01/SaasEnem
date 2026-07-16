export function saveStorage<T>(
  key:string,
  value:T
){

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}



export function getStorage<T>(
  key:string
):T | null {


  const data = localStorage.getItem(key);


  if(!data){
    return null;
  }


  return JSON.parse(data);

}