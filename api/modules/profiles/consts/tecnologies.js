export const technologies = {
    JAVASCRIPT: {  identifier: 'javascript', name: 'JavaScript' },
    TYPESCRIPT: { identifier: 'typescript', name: 'TypeScript' },
    PYTHON: { identifier: 'python', name: 'Python' },
    MYSQL: { identifier: 'mysql', name: 'MySQL' },
    POSTGRESQL: { identifier: 'postgresql', name: 'PostgreSQL' },
    SQLITE: { identifier: 'sqlite', name: 'SQLite' },
    MONGODB: { identifier: 'mongodb', name: 'MongoDB' },
    PHP: { identifier: 'php', name: 'PHP' },
    JAVA: { identifier: 'java', name: 'Java' },
    RUBY: { identifier: 'ruby', name: 'Ruby' },
    SWIFT: { identifier: 'swift', name: 'Swift' },
    CSS: { identifier: 'css', name: 'CSS' },
    HTML: { identifier: 'html', name: 'HTML' },
    VUE: { identifier: 'vue', name: 'Vue.js' },
    ANGULAR: { identifier: 'angular', name: 'Angular' },
    NODEJS: { identifier: 'nodejs', name: 'Node.js' },
    EXPRESS: { identifier: 'express', name: 'Express.js' },
    REACT: { identifier: 'react', name: 'React.js' },
    ANDROID: { identifier: 'android', name: 'Android' },
    IOS: { identifier: 'ios', name: 'iOS' }
}

export const technologiesArray = Object.values(technologies).map(technology => technology);
