export function createProfile(data, userId){
    if(data.role === 'freelancer'){
        return{
           publicId: crypto.randomUUID(),
           description: data.description,
           images: {
            cover: null,
            avatar: null
           },
           role: data.role,
           hired_profiles: {} 
        }
    }
    return{
        publicId: crypto.randomUUID(),
        description: data.description,
        images:{
            cover:null,
            avatar:  null,
        },
        role:data.role,
        price: {
            currency: data.price.currency,
            amount: data.price.amount
        },
        service: data.services,
        technologies: data.technologies
    }
    

}