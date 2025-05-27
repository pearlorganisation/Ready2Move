"use server"

  export async function getSinglePropertyBySlug(slug:string){
    try {
        const data = await fetch(`https://api.ready2move.co.in/api/v1/properties/${slug}`)
        const res = await data.json()
        return res?.data
    } catch (error) {
       return error        
    }
  }