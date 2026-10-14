import { Router } from "express";
import { createNoteController, openNoteController } from "../controllers/noteController";
import { validate } from "../middleware/validate";
import { validateNoteId } from "../middleware/validateNoteId";
import { createNoteSchema } from "../validators/noteSchemas";
import { asyncHandler } from "../utils/asyncHandler";
import { createNoteLimiter, openNoteLimiter } from "../middleware/rateLimit";

const router = Router();

router.post("/", createNoteLimiter, validate(createNoteSchema), asyncHandler(createNoteController));
router.get("/:id", openNoteLimiter, validateNoteId, asyncHandler(openNoteController));

export default router;