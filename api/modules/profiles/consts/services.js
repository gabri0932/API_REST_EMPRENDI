export const services = {
    WEB_DEVELOPMENT: { identifier: 'web_development', name: 'Web Development' },
    APPS_DEVELOPMENT: { identifier: 'apps_development', name: 'Apps Development' },
    GRAPHIC_DESIGN: { identifier: 'graphic_design', name: 'Graphic Design' },
    VIDEO_EDITING: { identifier: 'video_editing', name: 'Video Editing' },
    PHOTOGRAPHY: { identifier: 'photography', name: 'Photography' },
    WRITING: { identifier: 'writing', name: 'Writing' },
    MARKETING: { identifier: 'marketing', name: 'Marketing' },
    CONSULTING: { identifier: 'consulting', name: 'Consulting' },
    FINANCE: { identifier: 'finance', name: 'Finance' },
    TRANSLATION: { identifier: 'translation', name: 'Translation' }
}

export const servicesArray = Object.values(services).map(service => service);
export const servicesIdentifiersArray = Object.values(services).map(service => service.identifier);
export const servicesNamesArray = Object.values(services).map(service => service.name);
