import { Router } from "express";
import { createNoteController } from "../controllers/noteController";
import { validate } from "../middleware/validate";
import { createNoteSchema } from "../validators/noteSchemas";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/",
  validate(createNoteSchema),
  asyncHandler(createNoteController),
);

export default router;
