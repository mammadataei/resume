import { z } from "../deps.ts";

export const ProfileSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
});

export const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  profiles: z.array(ProfileSchema),
});

export const ExperienceSchema = z.object({
  company: z.string(),
  location: z.string().optional(),
  positions: z
    .array(
      z.object({
        position: z.string(),
        from: z.string(),
        to: z.string(),
        highlights: z.array(z.string()),
      }),
    )
    .min(1),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  from: z.string(),
  to: z.string(),
  courses: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
});

export const ResumeSchema = z.object({
  name: z.string(),
  title: z.string(),
  contact: ContactSchema,
  summary: z.string(),
  skills: z.array(z.string()),
  tools: z.array(z.string()),
  experiences: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema),
});

export const LetterSchema = z.object({
  name: z.string(),
  title: z.string(),
  contact: ContactSchema,
  company: z.string(),
  recipient: z.object({
    firstName: z.string(),
    lastName: z.string(),
    title: z.string(),
    address: z.string(),
  }),
  body: z.array(z.string()),
});
