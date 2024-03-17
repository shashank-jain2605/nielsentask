import { Request, Response } from "express";
import { Task, ITask } from "../models/task.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

// Create task
export const createTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        throw new ApiError(400, "Title and description are required.");
      }

      const newTask: ITask = new Task({
        title,
        description,
        status: "open",
      });

      await newTask.save();

      res
        .status(201)
        .json(new ApiResponse(200, newTask, "task added successfully"));
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Fetch all tasks
export const getAllTasks = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const tasks: ITask[] = await Task.find();
    res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
  }
);

// Fetch single task
export const getTaskById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId: string = req.params.id;
      console.log(taskId);

      const task: ITask | null = await Task.findById(taskId);
      if (!task) {
        res
          .status(404)
          .json(new ApiResponse(404, null, `No task with id ${taskId}`));
      } else {
        res.status(200).json(new ApiResponse(200, task, "Task found"));
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

// Update task
export const updateTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId: string = req.params.id;
      const { title, description, status }: Partial<ITask> = req.body;
      const updatedTask: ITask | null = await Task.findByIdAndUpdate(
        taskId,
        { title, description, status, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedTask) {
        res
          .status(404)
          .json(new ApiResponse(404, null, `No task with id ${taskId}`));
      } else {
        res.status(200).json(new ApiResponse(200, updatedTask, "Task updated"));
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

// Delete task
export const deleteTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId: string = req.params.id;
      const deletedTask: ITask | null = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        throw new ApiError(404, `No task with id ${taskId}`);
      }
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);
