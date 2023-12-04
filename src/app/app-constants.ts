export class AppConstants {

    public static get baseServidor(): string { return "http://localhost:8080/" }

    public static get baseLogin(): string { return this.baseServidor + "login" }

    public static get baseUrl(): string { return this.baseServidor + "api/usuario/"}

    public static get baseUrlPath(): string { return this.baseServidor + "profissao/"}

    public static get baseUrlPathRecuperar(): string { return this.baseServidor + "recuperar/"}
    
}
