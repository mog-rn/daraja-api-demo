// Authentication handler
// Session contains an apiKey and apiSecret for the requests to work
class Session {
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey
        this.apiSecret = apiSecret
    }

}

const uuid = require('uuid')

// object stores the user's session
const sessions = {}

// Authorization api
const authorize = (req, res) => {
    // get the authorization keys
    const { apiKey, apiSecret } = req.body

    if (!apiKey && !apiSecret) {
        res.status(401).send('You need an API KEY')
    }

    // const sessionToken = uuid.v4()
    // const expiresAt = new Date(30 * 120 * 1000)

    // const session = new Session(apiKey, apiSecret)

    // sessions[sessionToken] = session

    if (apiKey, apiSecret) {


        const access_token = fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            "method": "GET",
            "headers": {
                "Authorization": "Basic " + Buffer.from(apiKey + ":" + apiSecret).toString("base64")
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result.access_token)
                res.cookie("access_token", result.access_token, { maxAge: 900000, httpOnly: true })
                res.send(`Your access token is ${result.access_token}`)
                res.end()
            })
            .catch(error => console.log('error', error));
    }
}

module.exports = {
    authorize
}