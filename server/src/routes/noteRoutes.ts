import { Router } from "express";
import { createNoteController, openNoteController } from "../controllers/noteController";
import { validate } from "../middleware/validate";
import { validateNoteId } from "../middleware/validateNoteId";
import { createNoteSchema } from "../validators/noteSchemas";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", validate(createNoteSchema), asyncHandler(createNoteController));
router.get("/:id", validateNoteId, asyncHandler(openNoteController));

export default router;