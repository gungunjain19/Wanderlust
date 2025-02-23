class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;

    }
}
// when we try to handle async errors (eg.-> database errors), they don't call next
//explicitly thus we have to handle it on our own by calling next
//eg.-> instead of throw new ExpressError(400,msg)
// next(new ExpressError(400,msg));
module.exports = ExpressError;