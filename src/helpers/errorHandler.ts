export class ErrorBase<T extends string > extends Error {

    name:T;
    message:string;
    statusCode: number;
    cause:any;
    constructor({
        name,
        message,
        statusCode,
        cause
    }:{
        name:T;
        message:string;
        statusCode:number
        cause?:any;
    }
    ){
        super();
        this.name=name;
        this.message=message;
        this.statusCode=statusCode;
        this.cause=cause;
    }
     
}