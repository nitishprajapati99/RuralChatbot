const { rateLimit, ipKeyGenerator } = require('express-rate-limit');


//Rate limiter for authentication routes (signup and login) fixed Winodow
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 5,
    message: { message: 'Too many login/signup attempts from this IP, please try again after 15 minutes' },

    standardHeaders: true,
    legacyHeaders: false
});


//Tiered Rate Limiter for authentication routes (signup and login) Sliding Window
const tieredLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: (req) => {
        // console.log(req)
        if (req.user) {
            // console.log("Authenticated user request limit reached, User ID: ", req.user.id);
            return 100;
        }
        // console.log("ip address guest request ")
        return 10;
    },
    keyGenerator: (req) => {
        // console.log("Unauthenticated user request limit reached, IP: ", ipKeyGenerator(req));
       return req.user ? `user-${req.user.id}` : `guest-${req.ip}`;
    },

    message: { message: 'You request limit has been exceeded, For more requests login again or try again after 15 minutes' },
    standardHeaders: true, // Helpful for debugging: check 'RateLimit-Limit' in headers
    legacyHeaders: false,
})

module.exports = { authLimiter, tieredLimiter };