export default () => ({
    BASE: process.env.BASE || "http://localhost:3000",
    COOKIE_EXPIRE: parseInt(process.env.COOKIE_EXPIRE || '7', 10),
    JWT_SECRET: process.env.COOKIE_SECRET || "hard!to-guess_secret",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "0v0 j3 v30m4 t3z4k fl4gg",
    STRIPE_KEY: process.env.STRIPE_KEY || "sk_test_51S6EVACq02uHmIrCR176zUcaEW3j9OH0GZCIEBF0wA7eBtBQemofOtsvHsQjsyOjxWwXV0hhVhrawyoGj2Q93h8b00eg9IZGxz",
    EMAIL: process.env.EMAIL || "polovniracunari3@gmail.com",
    EMAIL_KEY: process.env.EMAIL_KEY || "typnenhrvhhzocdk",
    FRONT: process.env.EMAIL_KEY || "http://localhost:4200"
});