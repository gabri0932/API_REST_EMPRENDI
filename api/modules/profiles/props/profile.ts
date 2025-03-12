import type { ObjectId } from 'mongodb'

type Services = 'web_development' | 'apps_development' | 'graphic_design' | 'video_editing' | 'photography' | 'writing' | 'marketing' | 'consulting' | 'finance' | 'translation';
type Technologies = 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'php' | 'ruby' | 'swift' | 'kotlin' | 'go' | 'rust' | 'html' | 'css' | 'react' | 'vue' | 'angular' | 'nodejs' | 'express' | 'django' | 'flask' | 'laravel' | 'rails' | 'spring' | 'android' | 'ios' | 'docker' | 'kubernetes' | 'aws' | 'azure' | 'gcp' | 'firebase' | 'mongodb' | 'mysql' | 'postgresql' | 'sqlite' | 'redis' | 'elasticsearch' | 'graphql' | 'restapi' | 'websockets' | 'adobe' | 'figma' | 'sketch' | 'blender' | 'unity' | 'unreal' | 'photoshop' | 'illustrator' | 'aftereffects' | 'premierepro' | 'finalcutpro' | 'davinciresolve' | 'lightroom' | 'canva' | 'wordpress' | 'shopify' | 'magento' | 'woocommerce' | 'opencart' | 'prestashop' | 'drupal' | 'joomla' | 'squarespace' | 'wix' | 'weebly';

export interface ProfileProps {
    _id: ObjectId,
    publicId: string,
    name: string,
    description: string,
    images: {
        cover: string,
        avatar: string
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
