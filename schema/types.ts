import { z } from "../deps.ts";
import {
  ContactSchema,
  EducationSchema,
  ExperienceSchema,
  LetterSchema,
  ProfileSchema,
  ProjectSchema,
  ResumeSchema,
} from "./schema.ts";

export type Resume = z.infer<typeof ResumeSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Letter = z.infer<typeof LetterSchema>;
