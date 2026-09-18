
import express from "express";
import userRoutes from "./routes/userroutes.js"

const app = express()

app.use(express.json())

app.get("/" , (req,res) => {
    res.send("homepage!, server is active")
})

const PORT = 3000
app.use(express.json())
app.use("/users", userRoutes)



//app.listen(PORT, () => {
   // console.log(`server running on port ${PORT}`)
//})


app.listen(3000, () => {
    console.log("server running on port 3000")
})