import express from "express";
import * as UserController from "../app/controller/UserController.js"
import * as TaskController from "../app/controller/TaskController.js"
import authMiddleware from "../app/middleware/authMiddleware.js";
const router = express.Router();




//user
router.post("/Registration",UserController.Registration);
router.post("/Login",UserController.Login);

router.post("/ProfileDetails",authMiddleware, UserController.ProfileDetails);
router.get("/ProfileUpdate",authMiddleware, UserController.ProfileUpdate);

router.get("/EmailVerify/:email",authMiddleware, UserController.EmailVerify);
router.get("/CodeVerify/:email/:otp",authMiddleware, UserController.CodeVerify);
router.post("/ResetPassword",authMiddleware, UserController.ResetPassword);


//task


router.post("/CreateTask",authMiddleware,TaskController.CreateTask);
router.post("/DeleteTask",authMiddleware,TaskController.DeleteTask);
router.post("/UpdateStatus/:status",authMiddleware,TaskController.UpdateStatus);
router.get("/TaskListByStatus/:status",authMiddleware,TaskController.TaskListByStatus);














export default router;