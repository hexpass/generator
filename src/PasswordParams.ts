export default interface PasswordParams {
    tag: string;
    pwd: string;
    version: number;
    length: number;
    hasSymbol: boolean;
    hasNumber: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    avoidAmbChar: boolean;
}