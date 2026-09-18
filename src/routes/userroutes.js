import { Router  } from "express";
import { gethome, getAbout, postuser } from "../controllers/usercontrollers";


const router = Router()

router.get("/", gethome).get("/about", getAbout).post("/users", postuser)


export default router;