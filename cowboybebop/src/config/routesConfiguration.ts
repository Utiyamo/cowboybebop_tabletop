interface RouteConfig {
    baseUrl: string;
    name: string;
}

const routesConfig : RouteConfig[] = [
    {
        name: "Home",
        baseUrl: "/"
    },
    {
        name: "Login",
        baseUrl: "/auth"
    },
    {
        name: "Secure Home",
        baseUrl: "/secure/home"
    },
    {
        name: "Create Character",
        baseUrl: "/secure/createCharacter"
    },
    {
        name: "Import Character",
        baseUrl: "/secure/importCharacter"
    }
]

export default routesConfig;