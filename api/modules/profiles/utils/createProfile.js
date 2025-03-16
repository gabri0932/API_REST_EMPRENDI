export function createProfile(data, userId){
    if (data.role === 'freelancer') return {
        owner: userId,
        publicId: crypto.randomUUID(),
        description: data.description,
        phone: data.phone,
        images: {
            cover: null,
            avatar: null,
        },
        role: data.role,
        price: {
            currency: data.price.currency,
            amount: data.price.amount
        },
        service: data.service,
        technologies: data.technologies,
        createdAt: Date.now()
    }

    return {
        owner: userId,
        publicId: crypto.randomUUID(),
        description: data.description,
        phone: data.phone,
        images: {
            cover: null,
            avatar: null
        },
        role: data.role,
        hired_profiles: [],
        createdAt: Date.now()
    }
}
