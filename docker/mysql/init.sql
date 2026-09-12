-- EduLearn Database Dump for Docker Initialization
-- Generated for MySQL 8.0

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'STUDENT',
  `avatar` text COLLATE utf8mb4_unicode_ci,
  `headline` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `isSuspended` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `walletBalance` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `user` (`id`, `name`, `email`, `passwordHash`, `role`, `avatar`, `headline`, `bio`, `isSuspended`, `createdAt`, `updatedAt`, `walletBalance`) VALUES
  ('cmtq2aom20004yq1yuhg67qf6', 'Eleanor Vance (Admin)', 'admin@platform.com', '$2b$10$WVn7OfzMNgnTMqSwD5C6RONLxw52vSK2aTC8NlVXpbQ8750HncCki', 'ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', 'Platform Operations Director', 'Managing quality control, financial payouts, course certifications, and platform revenue.', '0', '2026-09-06 17:04:36.123', '2026-09-06 17:04:36.123', '0'),
  ('cmtq2aom80005yq1ydyq1i2ug', 'Alex Rivera', 'alex.coder@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'INSTRUCTOR', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', 'Principal Software Architect & Lead Instructor', '12+ years building hyper-scale applications. Taught over 120,000 developers worldwide.', '0', '2026-09-06 17:04:36.129', '2026-09-06 17:04:36.129', '320'),
  ('cmtq2aomd0006yq1y3nd4dowx', 'Sarah Jenkins', 'sarah.design@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'INSTRUCTOR', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80', 'Former Staff Product Designer at Stripe & Figma Advocate', 'Passionate about bridging high-end aesthetics with production design systems.', '0', '2026-09-06 17:04:36.133', '2026-09-06 20:07:03.000', '200'),
  ('cmtq2aomh0007yq1y7gc1zur5', 'John Doe', 'john.doe@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'STUDENT', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', 'Aspiring Full Stack Engineer', NULL, '0', '2026-09-06 17:04:36.137', '2026-09-06 17:04:36.137', '0'),
  ('cmtq2aomk0008yq1ydh87a5dt', 'Emma Watson', 'emma.watson@platform.com', '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G', 'STUDENT', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80', 'Digital Product Manager & Learner', NULL, '0', '2026-09-06 17:04:36.141', '2026-09-06 17:04:36.141', '0');

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`),
  UNIQUE KEY `Category_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `category` (`id`, `name`, `slug`, `description`, `icon`) VALUES
  ('cmtq2aodk0000yq1ynz7uesjc', 'Web Development', 'web-development', 'Frontend, backend, full-stack frameworks, APIs, and modern cloud deployment.', 'Code2'),
  ('cmtq2aodp0001yq1yfy9ske4k', 'AI & Machine Learning', 'ai-machine-learning', 'Deep learning, LLMs, neural networks, PyTorch, and generative AI systems.', 'Cpu'),
  ('cmtq2aodu0002yq1ysquobvz3', 'UI/UX & Design Systems', 'ui-ux-design', 'Product design, Figma, typography, wireframing, and interactive design systems.', 'Palette'),
  ('cmtq2aoe00003yq1y7p5au62n', 'Cloud & DevOps', 'cloud-devops', 'Docker, Kubernetes, CI/CD pipelines, AWS, and modern scalable architectures.', 'Cloud');

DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` text COLLATE utf8mb4_unicode_ci,
  `promoVideoUrl` text COLLATE utf8mb4_unicode_ci,
  `price` double NOT NULL DEFAULT '0',
  `isFree` tinyint(1) NOT NULL DEFAULT '0',
  `level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'All Levels',
  `language` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'English',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `rejectionReason` text COLLATE utf8mb4_unicode_ci,
  `instructorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Course_slug_key` (`slug`),
  KEY `Course_instructorId_fkey` (`instructorId`),
  KEY `Course_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Course_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `course` (`id`, `title`, `slug`, `subtitle`, `description`, `thumbnail`, `promoVideoUrl`, `price`, `isFree`, `level`, `language`, `status`, `rejectionReason`, `instructorId`, `categoryId`, `createdAt`, `updatedAt`) VALUES
  ('cmtq2aomp000ayq1yn95jw8ia', 'The Complete 2026 Full-Stack Web Development Bootcamp', 'complete-web-development-bootcamp-2026', 'Master TypeScript, Next.js 15, Prisma ORM, REST & GraphQL APIs from zero to production deployment.', 'Welcome to the most complete and comprehensive Web Development Bootcamp on the web. \nWhether you\'re starting from scratch or looking to update your stack for 2026, this course guides you step-by-step through real-world software engineering practices.\n\n### Key Highlights:\n- **Zero to Hero**: From fundamentals to production-grade architecture.\n- **Enterprise Standards**: Type safety, modular database migrations, and clean code principles.\n- **Hands-on Projects**: Build and ship real full-stack platforms with authentication and payments.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '49.99', '0', 'All Levels', 'English', 'PUBLISHED', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aodk0000yq1ynz7uesjc', '2026-09-06 17:04:36.145', '2026-09-06 17:04:36.145'),
  ('cmtq2aon1000myq1ynj2uabxq', 'UI/UX Masterclass: From Figma to Production Design Systems', 'ui-ux-design-masterclass', 'Learn modern interface design, auto-layout mastery, design tokens, and user psychology.', 'Step inside the world of world-class digital product design. \nThis masterclass takes you through the exact design system methodologies used at leading tech companies like Figma, Stripe, and Apple.', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '39.99', '0', 'Intermediate', 'English', 'PUBLISHED', NULL, 'cmtq2aomd0006yq1y3nd4dowx', 'cmtq2aodu0002yq1ysquobvz3', '2026-09-06 17:04:36.157', '2026-09-06 17:04:36.157'),
  ('cmtq2aon7000syq1y0b9ag1n3', 'Applied AI & Large Language Models with Python', 'applied-ai-llms-python', 'Build production RAG pipelines, fine-tune open weights models, and integrate agentic workflows.', 'Understand the mechanics behind modern generative AI, transformers, vector embeddings, and autonomous agent systems.', 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '59.99', '0', 'Advanced', 'English', 'PUBLISHED', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aodp0001yq1yfy9ske4k', '2026-09-06 17:04:36.164', '2026-09-06 17:04:36.164'),
  ('cmtq2aonc000wyq1ysthbhkfb', 'Next-Gen Microservices with Go and Kubernetes', 'next-gen-microservices-go-kubernetes', 'Production-grade microservices with gRPC, Docker containerization, Helm charts, and CI/CD pipelines.', 'An in-depth enterprise architecture course submitted by Alex Rivera awaiting Admin review and approval to go live on the public marketplace.', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '69.99', '0', 'Advanced', 'English', 'UNDER_REVIEW', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aoe00003yq1y7p5au62n', '2026-09-06 17:04:36.168', '2026-09-06 17:04:36.168'),
  ('crs_elXOURTnMj7rfEXacIl4', 'Test Automated Course 1788726024', 'test-automated-course-1788726024-n75gvr', 'Master skills with real-world hands-on lessons.', 'Comprehensive masterclass designed to take you from beginner to advanced.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80', NULL, '59.99', '0', 'Intermediate', 'English', 'DRAFT', NULL, 'cmtq2aom80005yq1ydyq1i2ug', 'cmtq2aodk0000yq1ynz7uesjc', '2026-09-06 20:20:24.000', '2026-09-06 20:20:24.000');

DROP TABLE IF EXISTS `section`;
CREATE TABLE `section` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Section_courseId_fkey` (`courseId`),
  CONSTRAINT `Section_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `section` (`id`, `title`, `order`, `courseId`, `createdAt`) VALUES
  ('cmtq2aomp000byq1yv0y3q8po', 'Section 1: Modern Full-Stack Landscape & Architecture', '1', 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000eyq1yphargz6c', 'Section 2: Next.js App Router, Server Actions & UI', '2', 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.145'),
  ('cmtq2aomq000jyq1yvtf0moje', 'Section 3: Database Engineering with Prisma & SQLite', '3', 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.145'),
  ('cmtq2aon1000nyq1y356l9th4', 'Module 1: Typography, Grid & Contrast Systems', '1', 'cmtq2aon1000myq1ynj2uabxq', '2026-09-06 17:04:36.157'),
  ('cmtq2aon7000tyq1yorl5gx3b', 'Unit 1: Embeddings & Vector Stores', '1', 'cmtq2aon7000syq1y0b9ag1n3', '2026-09-06 17:04:36.164'),
  ('cmtq2aonc000xyq1ymaclapxw', 'Stage 1: High Performance gRPC Services', '1', 'cmtq2aonc000wyq1ysthbhkfb', '2026-09-06 17:04:36.168');

DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VIDEO',
  `content` text COLLATE utf8mb4_unicode_ci,
  `videoUrl` text COLLATE utf8mb4_unicode_ci,
  `durationSec` int NOT NULL DEFAULT '0',
  `isFreePreview` tinyint(1) NOT NULL DEFAULT '0',
  `sectionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Lesson_sectionId_fkey` (`sectionId`),
  CONSTRAINT `Lesson_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `lesson` (`id`, `title`, `order`, `type`, `content`, `videoUrl`, `durationSec`, `isFreePreview`, `sectionId`, `createdAt`) VALUES
  ('cmtq2aomp000cyq1y9qd7jj70', 'Course Roadmap & Tech Stack Overview', '1', 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '340', '1', 'cmtq2aomp000byq1yv0y3q8po', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000dyq1ymlolsu8z', 'Setting Up TypeScript & Professional Tooling', '2', 'ARTICLE', '### Tooling Checklist for 2026:\n1. **Node.js LTS (v20+)** installed with corepack enabled.\n2. **VS Code or Cursor** with ESLint, Tailwind CSS IntelliSense, and Prettier.\n3. **Git & GitHub** SSH keys configured for seamless push/pull workflows.\n4. **Prisma VS Code Extension** for instant schema validation and syntax highlighting.\n\nEnsure you have created a clean workspace directory before proceeding to Section 2.', NULL, '180', '1', 'cmtq2aomp000byq1yv0y3q8po', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000fyq1y877twakl', 'Deep Dive into React Server Components (RSC)', '1', 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '620', '0', 'cmtq2aomp000eyq1yphargz6c', '2026-09-06 17:04:36.145'),
  ('cmtq2aomp000gyq1y8ert4xst', 'Architectural Knowledge Check', '2', 'QUIZ', NULL, NULL, '300', '0', 'cmtq2aomp000eyq1yphargz6c', '2026-09-06 17:04:36.145'),
  ('cmtq2aomq000kyq1yc57x1sv2', 'Schema Modeling, Relations & Zero-Downtime Migrations', '1', 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '540', '0', 'cmtq2aomq000jyq1yvtf0moje', '2026-09-06 17:04:36.145'),
  ('cmtq2aon1000oyq1yhox104qq', 'The 8-point Grid and Spatial Rhythm', '1', 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '410', '1', 'cmtq2aon1000nyq1y356l9th4', '2026-09-06 17:04:36.157'),
  ('cmtq2aon1000pyq1y87g3claz', 'Typography Scale Quiz', '2', 'QUIZ', NULL, NULL, '200', '0', 'cmtq2aon1000nyq1y356l9th4', '2026-09-06 17:04:36.157'),
  ('cmtq2aon7000uyq1ya54apmp7', 'How Embeddings Work Mathematically', '1', 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '480', '1', 'cmtq2aon7000tyq1yorl5gx3b', '2026-09-06 17:04:36.164'),
  ('cmtq2aonc000yyq1yjcqkdbfo', 'Protocol Buffers vs REST JSON Benchmarks', '1', 'VIDEO', NULL, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '500', '1', 'cmtq2aonc000xyq1ymaclapxw', '2026-09-06 17:04:36.168');

DROP TABLE IF EXISTS `quizquestion`;
CREATE TABLE `quizquestion` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lessonId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `correctAnswer` int NOT NULL,
  `explanation` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `QuizQuestion_lessonId_fkey` (`lessonId`),
  CONSTRAINT `QuizQuestion_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quizquestion` (`id`, `lessonId`, `question`, `options`, `correctAnswer`, `explanation`) VALUES
  ('cmtq2aomp000hyq1y1hn6r3xc', 'cmtq2aomp000gyq1y8ert4xst', 'What is the primary architectural benefit of React Server Components (RSC)?', '[\"They completely eliminate the need for HTML\",\"They keep heavy dependencies on the server and send zero JavaScript bundle to the browser\",\"They run exclusively on mobile phones\",\"They force all state to be stored in browser cookies\"]', '1', 'RSCs execute solely on the server, reducing the client-side JavaScript payload to zero for static rendering parts.'),
  ('cmtq2aomq000iyq1ysc0crn81', 'cmtq2aomp000gyq1y8ert4xst', 'In Next.js App Router, which file convention defines a route\'s visual skeleton during data loading?', '[\"skeleton.tsx\",\"loader.tsx\",\"loading.tsx\",\"spinner.tsx\"]', '2', '`loading.tsx` automatically wraps page segments with React Suspense boundaries.'),
  ('cmtq2aon1000qyq1yg8n3bi6u', 'cmtq2aon1000pyq1y87g3claz', 'Why is the 8-point spatial grid the industry standard?', '[\"Because 8 divides cleanly on almost all screen resolutions and creates visual consistency\",\"Because Figma only allows multiples of 8\",\"Because 8 is a prime number\",\"Because printers only accept 8mm margins\"]', '0', 'The 8-point grid scales predictably across varied device DPIs and simplifies developer handoffs.');

DROP TABLE IF EXISTS `attachment`;
CREATE TABLE `attachment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lessonId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileSize` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Attachment_lessonId_fkey` (`lessonId`),
  CONSTRAINT `Attachment_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalAmount` double NOT NULL,
  `platformFee` double NOT NULL,
  `instructorShare` double NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'COMPLETED',
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CARD',
  `transactionRef` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Order_transactionRef_key` (`transactionRef`),
  KEY `Order_userId_fkey` (`userId`),
  CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `order` (`id`, `userId`, `totalAmount`, `platformFee`, `instructorShare`, `status`, `paymentMethod`, `transactionRef`, `createdAt`) VALUES
  ('cmtq2aoog001gyq1y3eufoy3t', 'cmtq2aomh0007yq1y7gc1zur5', '49.99', '10', '39.99', 'COMPLETED', 'STRIPE_CARD', 'TXN-20260906-INIT-894B', '2026-09-06 17:04:36.208'),
  ('cmtq2aook001kyq1yccv2go7r', 'cmtq2aomk0008yq1ydh87a5dt', '39.99', '8', '31.99', 'COMPLETED', 'PAYPAL', 'TXN-20260906-INIT-551C', '2026-09-06 17:04:36.213');

DROP TABLE IF EXISTS `orderitem`;
CREATE TABLE `orderitem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `platformFee` double NOT NULL,
  `instructorNet` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderItem_orderId_fkey` (`orderId`),
  KEY `OrderItem_courseId_fkey` (`courseId`),
  CONSTRAINT `OrderItem_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orderitem` (`id`, `orderId`, `courseId`, `price`, `platformFee`, `instructorNet`) VALUES
  ('cmtq2aoog001iyq1yx7jeeh1l', 'cmtq2aoog001gyq1y3eufoy3t', 'cmtq2aomp000ayq1yn95jw8ia', '49.99', '10', '39.99'),
  ('cmtq2aool001myq1yj54gzad9', 'cmtq2aook001kyq1yccv2go7r', 'cmtq2aon1000myq1ynj2uabxq', '39.99', '8', '31.99');

DROP TABLE IF EXISTS `enrollment`;
CREATE TABLE `enrollment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Enrollment_userId_courseId_key` (`userId`,`courseId`),
  KEY `Enrollment_courseId_fkey` (`courseId`),
  CONSTRAINT `Enrollment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Enrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `enrollment` (`id`, `userId`, `courseId`, `completedAt`, `createdAt`) VALUES
  ('cmtq2aoni0010yq1ypvl4qxh5', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.172', '2026-09-06 17:04:36.175'),
  ('cmtq2aooc001eyq1yp73dptbb', 'cmtq2aomk0008yq1ydh87a5dt', 'cmtq2aon1000myq1ynj2uabxq', NULL, '2026-09-06 17:04:36.204');

DROP TABLE IF EXISTS `lessonprogress`;
CREATE TABLE `lessonprogress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lessonId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LessonProgress_userId_lessonId_key` (`userId`,`lessonId`),
  KEY `LessonProgress_lessonId_fkey` (`lessonId`),
  CONSTRAINT `LessonProgress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `LessonProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `lessonprogress` (`id`, `userId`, `lessonId`, `completed`, `updatedAt`) VALUES
  ('cmtq2aono0012yq1y8amhzvj4', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000cyq1y9qd7jj70', '1', '2026-09-06 17:04:36.181'),
  ('cmtq2aons0014yq1yk7h9y3bp', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000dyq1ymlolsu8z', '1', '2026-09-06 17:04:36.184'),
  ('cmtq2aonw0016yq1y6zju542g', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000fyq1y877twakl', '1', '2026-09-06 17:04:36.188'),
  ('cmtq2aoo00018yq1y2gjm4vek', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000gyq1y8ert4xst', '1', '2026-09-06 17:04:36.192'),
  ('cmtq2aoo4001ayq1y8mcy1fns', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomq000kyq1yc57x1sv2', '1', '2026-09-06 17:04:36.196');

DROP TABLE IF EXISTS `certificate`;
CREATE TABLE `certificate` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `certificateCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Certificate_certificateCode_key` (`certificateCode`),
  UNIQUE KEY `Certificate_userId_courseId_key` (`userId`,`courseId`),
  KEY `Certificate_courseId_fkey` (`courseId`),
  CONSTRAINT `Certificate_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Certificate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `certificate` (`id`, `certificateCode`, `userId`, `courseId`, `issuedAt`) VALUES
  ('cmtq2aoo7001cyq1y8x90392i', 'CERT-2026-WD89A', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000ayq1yn95jw8ia', '2026-09-06 17:04:36.198');

DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL DEFAULT '5',
  `comment` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Review_userId_courseId_key` (`userId`,`courseId`),
  KEY `Review_courseId_fkey` (`courseId`),
  CONSTRAINT `Review_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `review` (`id`, `userId`, `courseId`, `rating`, `comment`, `createdAt`) VALUES
  ('cmtq2aooq001oyq1yck7ioch5', 'cmtq2aomh0007yq1y7gc1zur5', 'cmtq2aomp000ayq1yn95jw8ia', '5', 'Incredible depth and clarity. The curriculum structure and practical exercises made everything click!', '2026-09-06 17:04:36.218'),
  ('cmtq2aoou001qyq1y92uzv7jo', 'cmtq2aomk0008yq1ydh87a5dt', 'cmtq2aon1000myq1ynj2uabxq', '5', 'Sarah is a master instructor. The design system lessons alone are worth 10x the course price.', '2026-09-06 17:04:36.223');

DROP TABLE IF EXISTS `payout`;
CREATE TABLE `payout` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `method` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'REQUESTED',
  `adminNote` text COLLATE utf8mb4_unicode_ci,
  `requestedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `processedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Payout_instructorId_fkey` (`instructorId`),
  CONSTRAINT `Payout_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `payout` (`id`, `instructorId`, `amount`, `method`, `details`, `status`, `adminNote`, `requestedAt`, `processedAt`) VALUES
  ('cmtq2aooy001syq1yanxmh3fy', 'cmtq2aom80005yq1ydyq1i2ug', '150', 'PAYPAL', 'alex.rivera@paypalsample.com', 'REQUESTED', 'Awaiting standard monthly batch payout confirmation', '2026-09-06 17:04:36.226', NULL),
  ('cmtq2aop2001uyq1yb6aau9o2', 'cmtq2aomd0006yq1y3nd4dowx', '100', 'BANK_TRANSFER', 'Chase Bank - Acct ending in 4819', 'PAID', 'Disbursed via automated wire', '2026-09-06 17:04:36.230', '2026-09-06 17:04:36.229'),
  ('pay_gKsEQwbGKW0LfwVKCq6L', 'cmtq2aomd0006yq1y3nd4dowx', '40', 'BANK_TRANSFER', '123456789', 'PAID', 'Approved and disbursed via clearing wire.', '2026-09-06 20:07:03.000', '2026-09-06 20:08:11.000');

DROP TABLE IF EXISTS `platformsetting`;
CREATE TABLE `platformsetting` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'global',
  `commissionRate` double NOT NULL DEFAULT '20',
  `subscriptionPrice` double NOT NULL DEFAULT '29.99',
  `platformName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EduFlow',
  `supportEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'support@eduflow.com',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `platformsetting` (`id`, `commissionRate`, `subscriptionPrice`, `platformName`, `supportEmail`, `updatedAt`) VALUES
  ('global', '20', '29.99', 'EduFlow', 'admin@eduflow.com', '2026-09-06 17:04:35.808');

SET FOREIGN_KEY_CHECKS=1;
