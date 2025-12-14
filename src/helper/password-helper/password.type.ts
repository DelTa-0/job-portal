export interface IPasswordHelper{
    bcryptEncryption(password:string):Promise<string>;
    bcryptCompare(password:string,hashedPassword:string):Promise<Boolean>;
}