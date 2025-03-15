import type { ObjectId } from 'mongodb'

type Services = 'web_development' | 'apps_development' | 'graphic_design' | 'video_editing' | 'photography' | 'writing' | 'marketing' | 'consulting' | 'finance' | 'translation';
type Technologies = 'javascript' | 'typescript' | 'python' | 'java' | 'php' | 'ruby' | 'swift' | 'html' | 'css' | 'react' | 'vue' | 'angular' | 'nodejs' | 'express' | 'android' | 'ios' | 'postgresql' | 'sqlite' | 'mongodb';

export interface ProfileProps {
    _id: ObjectId,
    publicId: string,
    name: string,
    description: string,
    images: {
        cover: string | null,
        avatar: string | null
    },
}

export interface ProfileFreelancer extends ProfileProps {
    role: 'freelancer',
    price: {
        currency: string, 
        amount: number
    },
    services: Services[],
    technologies: Technologies[],
}

export interface ProfileCustomer extends ProfileProps {
    role: 'customer',
    hired_profiles: ObjectId[],
}

export type Profile = ProfileFreelancer | ProfileCustomer;
