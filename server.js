const express = require("express")
const app = require("express")()
const db_conn = require("./config/dbConfig");
const admin_route = require("./routes/auth.admin.routes");
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
const payment_route = require("./routes/payments.phonepay.routes");
const user_route = require("./routes/auth.user.routes");
const dashboard_route = require("./routes/dashboard.admin.routes");

require('dotenv').config();

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.CONNECTION_STRING

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/admin", admin_route)
app.use("/user", user_route)
app.use("/payment", payment_route)
app.use("/dashboard/admin", dashboard_route)

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