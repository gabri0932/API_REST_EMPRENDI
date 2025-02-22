import { ObjectId, MongoError } from "mongodb";
export function StringToObject(id){
    let result = {   
        sucess: false,
        data: null
    }
    try {
        const objectId = new ObjectId(id)
        result = {
            sucess: true,
            data: ObjectId
        }
    }catch(error){
        if(error instanceof MongoError){
            return result;
        }
    }
    return result;
    /*esta utilidad nos sirve para convertir los id que vienen en string a ObjectId que es la forma en 
    que mongo reconoce los ids */
}