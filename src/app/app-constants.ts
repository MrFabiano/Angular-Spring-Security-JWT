export class AppConstants {

    public static get baseServidor(): string { return "http://localhost:8081/" }

    public static get baseLogin(): string { return this.baseServidor + "login" }

    public static get baseUrl(): string { return this.baseServidor + "api/user/"}

    public static get baseUrlPath(): string { return this.baseServidor + "profession/"}

    public static get baseUrlReport(): string { return this.baseServidor + "report/"}

    public static get baseUrlPathRecuperar(): string { return this.baseServidor + "recover/"}
    
}
