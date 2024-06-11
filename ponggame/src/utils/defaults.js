
const defaults = {
    USERNAME_MIN_LENGTH: 2,
    USERNAME_MAX_LENGTH: 20,
    EMAIL_MIN_LENGTH: 2,
    EMAIL_MAX_LENGTH: 50,
    ALIAS_MIN_LENGTH: 2,
    ALIAS_MAX_LENGTH: 15,
    AI_USERNAME: 'AI',
    MEMORY_SINGLE_TIME: 120,
    PONG_WIN_POINT: 5,
    /* PARAMS: {
        planeColor: 0x5A5A5A,
        paddleColor: 0xF59E0B,
        nameColor: 0xFFFFFF,
        opponentPaddleColor: 0x3E3ECA,
        ballColor: 0xDCC0FF,
        wallColor: 0x8674aa,
    }, */
    TEXT_PARAMS: {
        size: 3,
        height: 0.5,
        curveSegments: 20,
    }
}

export default defaults;