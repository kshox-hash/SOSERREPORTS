
export async function fetchDataToDb(){
    try {
        const response = await fetch('/v1/fetch-all-data', {
            method : 'GET',
            headers : { 'Content-Type' : 'application/json' }
        });
    
        if(!response.ok){
            throw new Error('cant fetch data');

        } else {

            const dataJson = await response.json()
            return dataJson

         };

     } catch(err){
       throw err

      };
   }
  
