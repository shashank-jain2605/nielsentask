import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";
import { Router } from "express";

const router = Router();

router.route("/").get(getAllTasks);
router.route("/:id").get(getTaskById);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);
router.route("/").post(createTask);

export default router;
