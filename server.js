const express = require("express")
const app = require("express")()
const db_conn = require("./config/dbConfig");
const admin_route = require("./routes/auth.admin.routes");
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
const payment_route = require("./routes/payments.phonepay.routes");
const user_route = require("./routes/auth.user.routes");
const dashboard_route = require("./routes/dashboard.admin.routes");
const cors=require("cors")

require('dotenv').config();

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.CONNECTION_STRING
const INITURL = process.env.INITURL


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:4173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(`${INITURL}/admin`, admin_route)
app.use(`${INITURL}/user`, user_route)
app.use(`${INITURL}/payment`, payment_route)
app.use(`${INITURL}/dashboard/admin`, dashboard_route)

const startServer = async () => {
    try {
        await db_conn(MONGO_URL)
        app.listen(PORT, () => {
            console.log(`server is listening on port : ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()