-- EduLearn Database Dump for Docker / PostgreSQL Initialization
-- Converted for PostgreSQL 16+

DROP TABLE IF EXISTS "platformsetting" CASCADE;
DROP TABLE IF EXISTS "payout" CASCADE;
DROP TABLE IF EXISTS "review" CASCADE;
DROP TABLE IF EXISTS "certificate" CASCADE;
DROP TABLE IF EXISTS "lessonprogress" CASCADE;
DROP TABLE IF EXISTS "enrollment" CASCADE;
DROP TABLE IF EXISTS "orderitem" CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS "attachment" CASCADE;
DROP TABLE IF EXISTS "quizquestion" CASCADE;
DROP TABLE IF EXISTS "lesson" CASCADE;
DROP TABLE IF EXISTS "section" CASCADE;
DROP TABLE IF EXISTS "course" CASCADE;
DROP TABLE IF EXISTS "category" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- -----------------------------------------------------------------------------
-- Table: user
-- -----------------------------------------------------------------------------
CREATE TABLE "user" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "name" VARCHAR(191) NOT NULL,
  "email" VARCHAR(191) NOT NULL UNIQUE,
  "passwordHash" VARCHAR(191) NOT NULL,
  "role" VARCHAR(191) NOT NULL DEFAULT 'STUDENT',
  "avatar" TEXT,
  "headline" VARCHAR(191) DEFAULT NULL,
  "bio" TEXT,
  "isSuspended" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL,
  "walletBalance" DOUBLE PRECISION NOT NULL DEFAULT 0
);

INSERT INTO "user" ("id", "name", "email", "passwordHash", "role", "avatar", "headline", "bio", "isSuspended", "createdAt", "updatedAt", "walletBalance") VALUES
  ('cmtq2aom20004yq1yuhg67qf6', 'Eleanor Vance (Admin)', 'admin@platform.com', '$2b$10$WVn7OfzMNgnTMqSwD5C6RONLxw52vSK2aTC8NlVXpbQ8750HncCki', 'ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', 'Platform Operations Director', 'Managing quality control, financial payouts, course certifications, and platform revenue.', FALSE, '2026-09-06 17:04:36.123', '2026-09-06 17:04:36.123', 0),
  ('cmtq2aom80005yq1ydyq1i2ug', 'Alex Rivera', 'alex.coder@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'INSTRUCTOR', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', 'Principal Software Architect & Lead Instructor', '12+ years building hyper-scale applications. Taught over 120,000 developers worldwide.', FALSE, '2026-09-06 17:04:36.129', '2026-09-06 17:04:36.129', 320),
  ('cmtq2aomd0006yq1y3nd4dowx', 'Sarah Jenkins', 'sarah.design@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'INSTRUCTOR', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80', 'Former Staff Product Designer at Stripe & Figma Advocate', 'Passionate about bridging high-end aesthetics with production design systems.', FALSE, '2026-09-06 17:04:36.133', '2026-09-06 20:07:03.000', 200),
  ('cmtq2aomh0007yq1y7gc1zur5', 'John Doe', 'john.doe@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'STUDENT', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', 'Aspiring Full Stack Engineer', NULL, FALSE, '2026-09-06 17:04:36.137', '2026-09-06 17:04:36.137', 0),
  ('cmtq2aomk0008yq1ydh87a5dt', 'Emma Watson', 'emma.watson@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'STUDENT', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80', 'Digital Product Manager & Learner', NULL, FALSE, '2026-09-06 17:04:36.141', '2026-09-06 17:04:36.141', 0);

-- -----------------------------------------------------------------------------
-- Table: category
-- -----------------------------------------------------------------------------
CREATE TABLE "category" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "name" VARCHAR(191) NOT NULL UNIQUE,
  "slug" VARCHAR(191) NOT NULL UNIQUE,
  "description" TEXT,
  "icon" VARCHAR(191) DEFAULT NULL
);

INSERT INTO "category" ("id", "name", "slug", "description", "icon") VALUES
  ('cmtq2aodk0000yq1ynz7uesjc', 'Web Development', 'web-development', 'Frontend, backend, full-stack frameworks, APIs, and modern cloud deployment.', 'Code2'),
  ('cmtq2aodp0001yq1yfy9ske4k', 'AI & Machine Learning', 'ai-machine-learning', 'Deep learning, LLMs, neural networks, PyTorch, and generative AI systems.', 'Cpu'),
  ('cmtq2aodu0002yq1ysquobvz3', 'UI/UX & Design Systems', 'ui-ux-design', 'Product design, Figma, typography, wireframing, and interactive design systems.', 'Palette'),
  ('cmtq2aoe00003yq1y7p5au62n', 'Cloud & DevOps', 'cloud-devops', 'Docker, Kubernetes, CI/CD pipelines, AWS, and modern scalable architectures.', 'Cloud');

-- -----------------------------------------------------------------------------
-- Table: course
-- -----------------------------------------------------------------------------
CREATE TABLE "course" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "title" VARCHAR(191) NOT NULL,
  "slug" VARCHAR(191) NOT NULL UNIQUE,
  "subtitle" TEXT,
  "description" TEXT NOT NULL,
  "thumbnail" TEXT,
  "promoVideoUrl" TEXT,
  "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "isFree" BOOLEAN NOT NULL DEFAULT FALSE,
  "level" VARCHAR(191) NOT NULL DEFAULT 'All Levels',
  "language" VARCHAR(191) NOT NULL DEFAULT 'English',
  "status" VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
  "rejectionReason" TEXT,
  "instructorId" VARCHAR(191) NOT NULL,
  "categoryId" VARCHAR(191) DEFAULT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL,
  CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Course_instructorId_idx" ON "course" ("instructorId");
CREATE INDEX "Course_categoryId_idx" ON "course" ("categoryId");

INSERT INTO "course" ("id", "title", "slug", "subtitle", "description", "thumbnail", "promoVideoUrl", "price", "isFree", "level", "language", "status", "rejectionReason", "instructorId", "categoryId", "createdAt", "updatedAt") VALUES
  ('cmtq2aomp000ayq1yn95jw8ia', 'The Complete 2026 Full-Stack Web Development Bootcamp', 'complete-web-development-bootcamp-2026', 'Master TypeScript, Next.js 15, Prisma ORM, REST & GraphQL APIs from zero to production deployment.', 'Welcome to the most complete and comprehensive Web Development Bootcamp on the web. \nWhether you''re starting from scratch or looking to update your stack for 2026, this course guides you step-by-step through real-world software engineering practices.\n\n### Key Highlights:\n- **Zero to Hero**: From fundamentals to production-grade architecture.\n- **Enterprise Standards**: Type safety, modular database migrations, and clean code principles.\n- **Hands-on Projects**: Build and ship real full-stack platforms with authentication and payments.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 49.99, FALSE, 'All Levels', 'English', 'PUBLISHED', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aodk0000yq1ynz7uesjc', '2026-09-06 17:04:36.145', '2026-09-06 17:04:36.145'),
  ('cmtq2aon1000myq1ynj2uabxq', 'UI/UX Masterclass: From Figma to Production Design Systems', 'ui-ux-design-masterclass', 'Learn modern interface design, auto-layout mastery, design tokens, and user psychology.', 'Step inside the world of world-class digital product design. \nThis masterclass takes you through the exact design system methodologies used at leading tech companies like Figma, Stripe, and Apple.', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 39.99, FALSE, 'Intermediate', 'English', 'PUBLISHED', NULL, 'cmtq2aomd0006yq1y3nd4dowx', 'cmtq2aodu0002yq1ysquobvz3', '2026-09-06 17:04:36.157', '2026-09-06 17:04:36.157'),
  ('cmtq2aon7000syq1y0b9ag1n3', 'Applied AI & Large Language Models with Python', 'applied-ai-llms-python', 'Build production RAG pipelines, fine-tune open weights models, and integrate agentic workflows.', 'Understand the mechanics behind modern generative AI, transformers, vector embeddings, and autonomous agent systems.', 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 59.99, FALSE, 'Advanced', 'English', 'PUBLISHED', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aodp0001yq1yfy9ske4k', '2026-09-06 17:04:36.164', '2026-09-06 17:04:36.164'),
  ('cmtq2aonc000wyq1ysthbhkfb', 'Next-Gen Microservices with Go and Kubernetes', 'next-gen-microservices-go-kubernetes', 'Production-grade microservices with gRPC, Docker containerization, Helm charts, and CI/CD pipelines.', 'An in-depth enterprise architecture course submitted by Alex Rivera awaiting Admin review and approval to go live on the public marketplace.', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', 69.99, FALSE, 'Advanced', 'English', 'UNDER_REVIEW', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aoe00003yq1y7p5au62n', '2026-09-06 17:04:36.168', '2026-09-06 17:04:36.168'),
  ('crs_elXOURTnMj7rfEXacIl4', 'Test Automated Course 1788726024', 'test-automated-course-1788726024-n75gvr', 'Master skills with real-world hands-on lessons.', 'Comprehensive masterclass designed to take you from beginner to advanced.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80', NULL, 59.99, FALSE, 'Intermediate', 'English', 'DRAFT', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aodk0000yq1ynz7uesjc', '2026-09-06 20:20:24.000', '2026-09-06 20:20:24.000');

-- -----------------------------------------------------------------------------
-- Table: section
-- -----------------------------------------------------------------------------
CREATE TABLE "section" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "title" VARCHAR(191) NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "courseId" VARCHAR(191) NOT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Section_courseId_idx" ON "section" ("courseId");

INSERT INTO "section" ("id", "title", "order", "courseId", "createdAt") VALUES
  ('cmtq2aomp000byq1yv0y3q8po', 'Section 1: Modern Full-Stack Landscape & Architecture', 1, 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000eyq1yphargz6c', 'Section 2: Next.js App Router, Server Actions & UI', 2, 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.145'),
  ('cmtq2aomq000jyq1yvtf0moje', 'Section 3: Database Engineering with Prisma & SQLite', 3, 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.145'),
  ('cmtq2aon1000nyq1y356l9th4', 'Module 1: Typography, Grid & Contrast Systems', 1, 'cmtq2aon1000myq1ynj2uabxq', '2026-09-06 17:04:36.157'),
  ('cmtq2aon7000tyq1yorl5gx3b', 'Unit 1: Embeddings & Vector Stores', 1, 'cmtq2aon7000syq1y0b9ag1n3', '2026-09-06 17:04:36.164'),
  ('cmtq2aonc000xyq1ymaclapxw', 'Stage 1: High Performance gRPC Services', 1, 'cmtq2aonc000wyq1ysthbhkfb', '2026-09-06 17:04:36.168');

-- -----------------------------------------------------------------------------
-- Table: lesson
-- -----------------------------------------------------------------------------
CREATE TABLE "lesson" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "title" VARCHAR(191) NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "type" VARCHAR(191) NOT NULL DEFAULT 'VIDEO',
  "content" TEXT,
  "videoUrl" TEXT,
  "durationSec" INTEGER NOT NULL DEFAULT 0,
  "isFreePreview" BOOLEAN NOT NULL DEFAULT FALSE,
  "sectionId" VARCHAR(191) NOT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Lesson_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Lesson_sectionId_idx" ON "lesson" ("sectionId");

INSERT INTO "lesson" ("id", "title", "order", "type", "content", "videoUrl", "durationSec", "isFreePreview", "sectionId", "createdAt") VALUES
  ('cmtq2aomp000cyq1y9qd7jj70', 'Course Roadmap & Tech Stack Overview', 1, 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 340, TRUE, 'cmtq2aomp000byq1yv0y3q8po', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000dyq1ymlolsu8z', 'Setting Up TypeScript & Professional Tooling', 2, 'ARTICLE', '### Tooling Checklist for 2026:\n1. **Node.js LTS (v20+)** installed with corepack enabled.\n2. **VS Code or Cursor** with ESLint, Tailwind CSS IntelliSense, and Prettier.\n3. **Git & GitHub** SSH keys configured for seamless push/pull workflows.\n4. **Prisma VS Code Extension** for instant schema validation and syntax highlighting.\n\nEnsure you have created a clean workspace directory before proceeding to Section 2.', NULL, 180, TRUE, 'cmtq2aomp000byq1yv0y3q8po', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000fyq1y877twakl', 'Deep Dive into React Server Components (RSC)', 1, 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 620, FALSE, 'cmtq2aomp000eyq1yphargz6c', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000gyq1y8ert4xst', 'Architectural Knowledge Check', 2, 'QUIZ', NULL, NULL, 300, FALSE, 'cmtq2aomp000eyq1yphargz6c', '2026-09-06 17:04:36.145'),
  ('cmtq2aomq000kyq1yc57x1sv2', 'Schema Modeling, Relations & Zero-Downtime Migrations', 1, 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 540, FALSE, 'cmtq2aomq000jyq1yvtf0moje', '2026-09-06 17:04:36.145'),
  ('cmtq2aon1000oyq1yhox104qq', 'The 8-point Grid and Spatial Rhythm', 1, 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 410, TRUE, 'cmtq2aon1000nyq1y356l9th4', '2026-09-06 17:04:36.157'),
  ('cmtq2aon1000pyq1y87g3claz', 'Typography Scale Quiz', 2, 'QUIZ', NULL, NULL, 200, FALSE, 'cmtq2aon1000nyq1y356l9th4', '2026-09-06 17:04:36.157'),
  ('cmtq2aon7000uyq1ya54apmp7', 'How Embeddings Work Mathematically', 1, 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 480, TRUE, 'cmtq2aon7000tyq1yorl5gx3b', '2026-09-06 17:04:36.164'),
  ('cmtq2aonc000yyq1yjcqkdbfo', 'Protocol Buffers vs REST JSON Benchmarks', 1, 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', 500, TRUE, 'cmtq2aonc000xyq1ymaclapxw', '2026-09-06 17:04:36.168');

-- -----------------------------------------------------------------------------
-- Table: quizquestion
-- -----------------------------------------------------------------------------
CREATE TABLE "quizquestion" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "lessonId" VARCHAR(191) NOT NULL,
  "question" TEXT NOT NULL,
  "options" TEXT NOT NULL,
  "correctAnswer" INTEGER NOT NULL,
  "explanation" TEXT,
  CONSTRAINT "QuizQuestion_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "QuizQuestion_lessonId_idx" ON "quizquestion" ("lessonId");

INSERT INTO "quizquestion" ("id", "lessonId", "question", "options", "correctAnswer", "explanation") VALUES
  ('cmtq2aomp000hyq1y1hn6r3xc', 'cmtq2aomp000gyq1y8ert4xst', 'What is the primary architectural benefit of React Server Components (RSC)?', '["They completely eliminate the need for HTML","They keep heavy dependencies on the server and send zero JavaScript bundle to the browser","They run exclusively on mobile phones","They force all state to be stored in browser cookies"]', 1, 'RSCs execute solely on the server, reducing the client-side JavaScript payload to zero for static rendering parts.'),
  ('cmtq2aomq000iyq1ysc0crn81', 'cmtq2aomp000gyq1y8ert4xst', 'In Next.js App Router, which file convention defines a route''s visual skeleton during data loading?', '["skeleton.tsx","loader.tsx","loading.tsx","spinner.tsx"]', 2, '`loading.tsx` automatically wraps page segments with React Suspense boundaries.'),
  ('cmtq2aon1000qyq1yg8n3bi6u', 'cmtq2aon1000pyq1y87g3claz', 'Why is the 8-point spatial grid the industry standard?', '["Because 8 divides cleanly on almost all screen resolutions and creates visual consistency","Because Figma only allows multiples of 8","Because 8 is a prime number","Because printers only accept 8mm margins"]', 0, 'The 8-point grid scales predictably across varied device DPIs and simplifies developer handoffs.');

-- -----------------------------------------------------------------------------
-- Table: attachment
-- -----------------------------------------------------------------------------
CREATE TABLE "attachment" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "lessonId" VARCHAR(191) NOT NULL,
  "fileName" VARCHAR(191) NOT NULL,
  "fileUrl" TEXT NOT NULL,
  "fileSize" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Attachment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Attachment_lessonId_idx" ON "attachment" ("lessonId");

-- -----------------------------------------------------------------------------
-- Table: order
-- -----------------------------------------------------------------------------
CREATE TABLE "order" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "userId" VARCHAR(191) NOT NULL,
  "totalAmount" DOUBLE PRECISION NOT NULL,
  "platformFee" DOUBLE PRECISION NOT NULL,
  "instructorShare" DOUBLE PRECISION NOT NULL,
  "status" VARCHAR(191) NOT NULL DEFAULT 'COMPLETED',
  "paymentMethod" VARCHAR(191) NOT NULL DEFAULT 'CARD',
  "transactionRef" VARCHAR(191) NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Order_userId_idx" ON "order" ("userId");

INSERT INTO "order" ("id", "userId", "totalAmount", "platformFee", "instructorShare", "status", "paymentMethod", "transactionRef", "createdAt") VALUES
  ('cmtq2aoog001gyq1y3eufoy3t', 'cmtq2aomh0007yq1y7gc1zur5', 49.99, 10, 39.99, 'COMPLETED', 'STRIPE_CARD', 'TXN-20260906-INIT-894B', '2026-09-06 17:04:36.208'),
  ('cmtq2aook001kyq1yccv2go7r', 'cmtq2aomk0008yq1ydh87a5dt', 39.99, 8, 31.99, 'COMPLETED', 'PAYPAL', 'TXN-20260906-INIT-551C', '2026-09-06 17:04:36.213');

-- -----------------------------------------------------------------------------
-- Table: orderitem
-- -----------------------------------------------------------------------------
CREATE TABLE "orderitem" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "orderId" VARCHAR(191) NOT NULL,
  "courseId" VARCHAR(191) NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "platformFee" DOUBLE PRECISION NOT NULL,
  "instructorNet" DOUBLE PRECISION NOT NULL,
  CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "OrderItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "OrderItem_orderId_idx" ON "orderitem" ("orderId");
CREATE INDEX "OrderItem_courseId_idx" ON "orderitem" ("courseId");

INSERT INTO "orderitem" ("id", "orderId", "courseId", "price", "platformFee", "instructorNet") VALUES
  ('cmtq2aoog001iyq1yx7jeeh1l', 'cmtq2aoog001gyq1y3eufoy3t', 'cmtq2aomp000ayq1yn95jw8ia', 49.99, 10, 39.99),
  ('cmtq2aool001myq1yj54gzad9', 'cmtq2aook001kyq1yccv2go7r', 'cmtq2aon1000myq1ynj2uabxq', 39.99, 8, 31.99);

-- -----------------------------------------------------------------------------
-- Table: enrollment
-- -----------------------------------------------------------------------------
CREATE TABLE "enrollment" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "userId" VARCHAR(191) NOT NULL,
  "courseId" VARCHAR(191) NOT NULL,
  "completedAt" TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Enrollment_userId_courseId_key" UNIQUE ("userId", "courseId"),
  CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Enrollment_courseId_idx" ON "enrollment" ("courseId");

INSERT INTO "enrollment" ("id", "userId", "courseId", "completedAt", "createdAt") VALUES
  ('cmtq2aoni0010yq1ypvl4qxh5', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.172', '2026-09-06 17:04:36.175'),
  ('cmtq2aooc001eyq1yp73dptbb', 'cmtq2aomk0008yq1ydh87a5dt', 'cmtq2aon1000myq1ynj2uabxq', NULL, '2026-09-06 17:04:36.204');

-- -----------------------------------------------------------------------------
-- Table: lessonprogress
-- -----------------------------------------------------------------------------
CREATE TABLE "lessonprogress" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "userId" VARCHAR(191) NOT NULL,
  "lessonId" VARCHAR(191) NOT NULL,
  "completed" BOOLEAN NOT NULL DEFAULT FALSE,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL,
  CONSTRAINT "LessonProgress_userId_lessonId_key" UNIQUE ("userId", "lessonId"),
  CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "LessonProgress_lessonId_idx" ON "lessonprogress" ("lessonId");

INSERT INTO "lessonprogress" ("id", "userId", "lessonId", "completed", "updatedAt") VALUES
  ('cmtq2aono0012yq1y8amhzvj4', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000cyq1y9qd7jj70', TRUE, '2026-09-06 17:04:36.181'),
  ('cmtq2aons0014yq1yk7h9y3bp', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000dyq1ymlolsu8z', TRUE, '2026-09-06 17:04:36.184'),
  ('cmtq2aonw0016yq1y6zju542g', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000fyq1y877twakl', TRUE, '2026-09-06 17:04:36.188'),
  ('cmtq2aoo00018yq1y2gjm4vek', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000gyq1y8ert4xst', TRUE, '2026-09-06 17:04:36.192'),
  ('cmtq2aoo4001ayq1y8mcy1fns', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomq000kyq1yc57x1sv2', TRUE, '2026-09-06 17:04:36.196');

-- -----------------------------------------------------------------------------
-- Table: certificate
-- -----------------------------------------------------------------------------
CREATE TABLE "certificate" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "certificateCode" VARCHAR(191) NOT NULL UNIQUE,
  "userId" VARCHAR(191) NOT NULL,
  "courseId" VARCHAR(191) NOT NULL,
  "issuedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Certificate_userId_courseId_key" UNIQUE ("userId", "courseId"),
  CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Certificate_courseId_idx" ON "certificate" ("courseId");

INSERT INTO "certificate" ("id", "certificateCode", "userId", "courseId", "issuedAt") VALUES
  ('cmtq2aoo7001cyq1y8x90392i', 'CERT-2026-WD89A', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.198');

-- -----------------------------------------------------------------------------
-- Table: review
-- -----------------------------------------------------------------------------
CREATE TABLE "review" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "userId" VARCHAR(191) NOT NULL,
  "courseId" VARCHAR(191) NOT NULL,
  "rating" INTEGER NOT NULL DEFAULT 5,
  "comment" TEXT,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Review_userId_courseId_key" UNIQUE ("userId", "courseId"),
  CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Review_courseId_idx" ON "review" ("courseId");

INSERT INTO "review" ("id", "userId", "courseId", "rating", "comment", "createdAt") VALUES
  ('cmtq2aooq001oyq1yck7ioch5', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000ayq1yn95jw8ia', 5, 'Incredible depth and clarity. The curriculum structure and practical exercises made everything click!', '2026-09-06 17:04:36.218'),
  ('cmtq2aoou001qyq1y92uzv7jo', 'cmtq2aomk0008yq1ydh87a5dt', 'cmtq2aon1000myq1ynj2uabxq', 5, 'Sarah is a master instructor. The design system lessons alone are worth 10x the course price.', '2026-09-06 17:04:36.223');

-- -----------------------------------------------------------------------------
-- Table: payout
-- -----------------------------------------------------------------------------
CREATE TABLE "payout" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY,
  "instructorId" VARCHAR(191) NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "method" VARCHAR(191) NOT NULL,
  "details" TEXT NOT NULL,
  "status" VARCHAR(191) NOT NULL DEFAULT 'REQUESTED',
  "adminNote" TEXT,
  "requestedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processedAt" TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT NULL,
  CONSTRAINT "Payout_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Payout_instructorId_idx" ON "payout" ("instructorId");

INSERT INTO "payout" ("id", "instructorId", "amount", "method", "details", "status", "adminNote", "requestedAt", "processedAt") VALUES
  ('cmtq2aooy001syq1yanxmh3fy', 'cmtq2aom80005yq1ydyq1i2ug', 150, 'PAYPAL', 'alex.rivera@paypalsample.com', 'REQUESTED', 'Awaiting standard monthly batch payout confirmation', '2026-09-06 17:04:36.226', NULL),
  ('cmtq2aop2001uyq1yb6aau9o2', 'cmtq2aomd0006yq1y3nd4dowx', 100, 'BANK_TRANSFER', 'Chase Bank - Acct ending in 4819', 'PAID', 'Disbursed via automated wire', '2026-09-06 17:04:36.230', '2026-09-06 17:04:36.229'),
  ('pay_gKsEQwbGKW0LfwVKCq6L', 'cmtq2aomd0006yq1y3nd4dowx', 40, 'BANK_TRANSFER', '123456789', 'PAID', 'Approved and disbursed via clearing wire.', '2026-09-06 20:07:03.000', '2026-09-06 20:08:11.000');

-- -----------------------------------------------------------------------------
-- Table: platformsetting
-- -----------------------------------------------------------------------------
CREATE TABLE "platformsetting" (
  "id" VARCHAR(191) NOT NULL PRIMARY KEY DEFAULT 'global',
  "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 20,
  "subscriptionPrice" DOUBLE PRECISION NOT NULL DEFAULT 29.99,
  "platformName" VARCHAR(191) NOT NULL DEFAULT 'EduFlow',
  "supportEmail" VARCHAR(191) NOT NULL DEFAULT 'support@eduflow.com',
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL
);

INSERT INTO "platformsetting" ("id", "commissionRate", "subscriptionPrice", "platformName", "supportEmail", "updatedAt") VALUES
  ('global', 20, 29.99, 'EduFlow', 'admin@eduflow.com', '2026-09-06 17:04:35.808');
