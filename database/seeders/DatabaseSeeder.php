<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Users
        DB::table('user')->upsert([
            [
                'id' => 'cmtq2aom20004yq1yuhg67qf6',
                'name' => 'Eleanor Vance (Admin)',
                'email' => 'admin@platform.com',
                'passwordHash' => '$2b$10$WVn7OfzMNgnTMqSwD5C6RONLxw52vSK2aTC8NlVXpbQ8750HncCki',
                'role' => 'ADMIN',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
                'headline' => 'Platform Operations Director',
                'bio' => 'Managing quality control, financial payouts, course certifications, and platform revenue.',
                'isSuspended' => false,
                'createdAt' => '2026-09-06 17:04:36.123',
                'updatedAt' => '2026-09-06 17:04:36.123',
                'walletBalance' => 0,
            ],
            [
                'id' => 'cmtq2aom80005yq1ydyq1i2ug',
                'name' => 'Alex Rivera',
                'email' => 'alex.coder@platform.com',
                'passwordHash' => '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G',
                'role' => 'INSTRUCTOR',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
                'headline' => 'Principal Software Architect & Lead Instructor',
                'bio' => '12+ years building hyper-scale applications. Taught over 120,000 developers worldwide.',
                'isSuspended' => false,
                'createdAt' => '2026-09-06 17:04:36.129',
                'updatedAt' => '2026-09-06 17:04:36.129',
                'walletBalance' => 320,
            ],
            [
                'id' => 'cmtq2aomd0006yq1y3nd4dowx',
                'name' => 'Sarah Jenkins',
                'email' => 'sarah.design@platform.com',
                'passwordHash' => '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G',
                'role' => 'INSTRUCTOR',
                'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
                'headline' => 'Former Staff Product Designer at Stripe & Figma Advocate',
                'bio' => 'Passionate about bridging high-end aesthetics with production design systems.',
                'isSuspended' => false,
                'createdAt' => '2026-09-06 17:04:36.133',
                'updatedAt' => '2026-09-06 20:07:03.000',
                'walletBalance' => 200,
            ],
            [
                'id' => 'cmtq2aomh0007yq1y7gc1zur5',
                'name' => 'John Doe',
                'email' => 'john.doe@platform.com',
                'passwordHash' => '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G',
                'role' => 'STUDENT',
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
                'headline' => 'Aspiring Full Stack Engineer',
                'bio' => null,
                'isSuspended' => false,
                'createdAt' => '2026-09-06 17:04:36.137',
                'updatedAt' => '2026-09-06 17:04:36.137',
                'walletBalance' => 0,
            ],
            [
                'id' => 'cmtq2aomk0008yq1ydh87a5dt',
                'name' => 'Emma Watson',
                'email' => 'emma.watson@platform.com',
                'passwordHash' => '$2b$10$yTQueIf/UKG8QF5KB483/uEFSA1WjXmadzbU6b2p6qyYsJl2hQe4G',
                'role' => 'STUDENT',
                'avatar' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
                'headline' => 'Digital Product Manager & Learner',
                'bio' => null,
                'isSuspended' => false,
                'createdAt' => '2026-09-06 17:04:36.141',
                'updatedAt' => '2026-09-06 17:04:36.141',
                'walletBalance' => 0,
            ],
        ], ['id'], ['name', 'email', 'passwordHash', 'role', 'avatar', 'headline', 'bio', 'isSuspended', 'updatedAt', 'walletBalance']);

        // 2. Categories
        DB::table('category')->upsert([
            [
                'id' => 'cmtq2aodk0000yq1ynz7uesjc',
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => 'Frontend, backend, full-stack frameworks, APIs, and modern cloud deployment.',
                'icon' => 'Code2',
            ],
            [
                'id' => 'cmtq2aodp0001yq1yfy9ske4k',
                'name' => 'AI & Machine Learning',
                'slug' => 'ai-machine-learning',
                'description' => 'Deep learning, LLMs, neural networks, PyTorch, and generative AI systems.',
                'icon' => 'Cpu',
            ],
            [
                'id' => 'cmtq2aodu0002yq1ysquobvz3',
                'name' => 'UI/UX & Design Systems',
                'slug' => 'ui-ux-design',
                'description' => 'Product design, Figma, typography, wireframing, and interactive design systems.',
                'icon' => 'Palette',
            ],
            [
                'id' => 'cmtq2aoe00003yq1y7p5au62n',
                'name' => 'Cloud & DevOps',
                'slug' => 'cloud-devops',
                'description' => 'Docker, Kubernetes, CI/CD pipelines, AWS, and modern scalable architectures.',
                'icon' => 'Cloud',
            ],
        ], ['id'], ['name', 'slug', 'description', 'icon']);

        // 3. Courses
        DB::table('course')->upsert([
            [
                'id' => 'cmtq2aomp000ayq1yn95jw8ia',
                'title' => 'The Complete 2026 Full-Stack Web Development Bootcamp',
                'slug' => 'complete-web-development-bootcamp-2026',
                'subtitle' => 'Master TypeScript, Next.js 15, Prisma ORM, REST & GraphQL APIs from zero to production deployment.',
                'description' => "Welcome to the most complete and comprehensive Web Development Bootcamp on the web. \nWhether you're starting from scratch or looking to update your stack for 2026, this course guides you step-by-step through real-world software engineering practices.\n\n### Key Highlights:\n- **Zero to Hero**: From fundamentals to production-grade architecture.\n- **Enterprise Standards**: Type safety, modular database migrations, and clean code principles.\n- **Hands-on Projects**: Build and ship real full-stack platforms with authentication and payments.",
                'thumbnail' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
                'promoVideoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                'price' => 49.99,
                'isFree' => false,
                'level' => 'All Levels',
                'language' => 'English',
                'status' => 'PUBLISHED',
                'rejectionReason' => null,
                'instructorId' => 'cmtq2aom80005yq1ydyq1i2ug',
                'categoryId' => 'cmtq2aodk0000yq1ynz7uesjc',
                'createdAt' => '2026-09-06 17:04:36.145',
                'updatedAt' => '2026-09-06 17:04:36.145',
            ],
            [
                'id' => 'cmtq2aon1000myq1ynj2uabxq',
                'title' => 'UI/UX Masterclass: From Figma to Production Design Systems',
                'slug' => 'ui-ux-design-masterclass',
                'subtitle' => 'Learn modern interface design, auto-layout mastery, design tokens, and user psychology.',
                'description' => "Step inside the world of world-class digital product design. \nThis masterclass takes you through the exact design system methodologies used at leading tech companies like Figma, Stripe, and Apple.",
                'thumbnail' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
                'promoVideoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                'price' => 39.99,
                'isFree' => false,
                'level' => 'Intermediate',
                'language' => 'English',
                'status' => 'PUBLISHED',
                'rejectionReason' => null,
                'instructorId' => 'cmtq2aomd0006yq1y3nd4dowx',
                'categoryId' => 'cmtq2aodu0002yq1ysquobvz3',
                'createdAt' => '2026-09-06 17:04:36.157',
                'updatedAt' => '2026-09-06 17:04:36.157',
            ],
            [
                'id' => 'cmtq2aon7000syq1y0b9ag1n3',
                'title' => 'Applied AI & Large Language Models with Python',
                'slug' => 'applied-ai-llms-python',
                'subtitle' => 'Build production RAG pipelines, fine-tune open weights models, and integrate agentic workflows.',
                'description' => 'Understand the mechanics behind modern generative AI, transformers, vector embeddings, and autonomous agent systems.',
                'thumbnail' => 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
                'promoVideoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                'price' => 59.99,
                'isFree' => false,
                'level' => 'Advanced',
                'language' => 'English',
                'status' => 'PUBLISHED',
                'rejectionReason' => null,
                'instructorId' => 'cmtq2aom80005yq1ydyq1i2ug',
                'categoryId' => 'cmtq2aodp0001yq1yfy9ske4k',
                'createdAt' => '2026-09-06 17:04:36.164',
                'updatedAt' => '2026-09-06 17:04:36.164',
            ],
            [
                'id' => 'cmtq2aonc000wyq1ysthbhkfb',
                'title' => 'Next-Gen Microservices with Go and Kubernetes',
                'slug' => 'next-gen-microservices-go-kubernetes',
                'subtitle' => 'Production-grade microservices with gRPC, Docker containerization, Helm charts, and CI/CD pipelines.',
                'description' => 'An in-depth enterprise architecture course submitted by Alex Rivera awaiting Admin review and approval to go live on the public marketplace.',
                'thumbnail' => 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
                'promoVideoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
                'price' => 69.99,
                'isFree' => false,
                'level' => 'Advanced',
                'language' => 'English',
                'status' => 'UNDER_REVIEW',
                'rejectionReason' => null,
                'instructorId' => 'cmtq2aom80005yq1ydyq1i2ug',
                'categoryId' => 'cmtq2aoe00003yq1y7p5au62n',
                'createdAt' => '2026-09-06 17:04:36.168',
                'updatedAt' => '2026-09-06 17:04:36.168',
            ],
            [
                'id' => 'crs_elXOURTnMj7rfEXacIl4',
                'title' => 'Test Automated Course 1788726024',
                'slug' => 'test-automated-course-1788726024-n75gvr',
                'subtitle' => 'Master skills with real-world hands-on lessons.',
                'description' => 'Comprehensive masterclass designed to take you from beginner to advanced.',
                'thumbnail' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
                'promoVideoUrl' => null,
                'price' => 59.99,
                'isFree' => false,
                'level' => 'Intermediate',
                'language' => 'English',
                'status' => 'DRAFT',
                'rejectionReason' => null,
                'instructorId' => 'cmtq2aom80005yq1ydyq1i2ug',
                'categoryId' => 'cmtq2aodk0000yq1ynz7uesjc',
                'createdAt' => '2026-09-06 20:20:24.000',
                'updatedAt' => '2026-09-06 20:20:24.000',
            ],
        ], ['id'], ['title', 'slug', 'subtitle', 'description', 'thumbnail', 'promoVideoUrl', 'price', 'isFree', 'level', 'language', 'status', 'rejectionReason', 'instructorId', 'categoryId', 'updatedAt']);

        // 4. Sections
        DB::table('section')->upsert([
            ['id' => 'cmtq2aomp000byq1yv0y3q8po', 'title' => 'Section 1: Modern Full-Stack Landscape & Architecture', 'order' => 1, 'courseId' => 'cmtq2aomp000ayq1yn95jw8ia', 'createdAt' => '2026-09-06 17:04:36.145'],
            ['id' => 'cmtq2aomp000eyq1yphargz6c', 'title' => 'Section 2: Next.js App Router, Server Actions & UI', 'order' => 2, 'courseId' => 'cmtq2aomp000ayq1yn95jw8ia', 'createdAt' => '2026-09-06 17:04:36.145'],
            ['id' => 'cmtq2aomq000jyq1yvtf0moje', 'title' => 'Section 3: Database Engineering with Prisma & SQLite', 'order' => 3, 'courseId' => 'cmtq2aomp000ayq1yn95jw8ia', 'createdAt' => '2026-09-06 17:04:36.145'],
            ['id' => 'cmtq2aon1000nyq1y356l9th4', 'title' => 'Module 1: Typography, Grid & Contrast Systems', 'order' => 1, 'courseId' => 'cmtq2aon1000myq1ynj2uabxq', 'createdAt' => '2026-09-06 17:04:36.157'],
            ['id' => 'cmtq2aon7000tyq1yorl5gx3b', 'title' => 'Unit 1: Embeddings & Vector Stores', 'order' => 1, 'courseId' => 'cmtq2aon7000syq1y0b9ag1n3', 'createdAt' => '2026-09-06 17:04:36.164'],
            ['id' => 'cmtq2aonc000xyq1ymaclapxw', 'title' => 'Stage 1: High Performance gRPC Services', 'order' => 1, 'courseId' => 'cmtq2aonc000wyq1ysthbhkfb', 'createdAt' => '2026-09-06 17:04:36.168'],
        ], ['id'], ['title', 'order', 'courseId']);

        // 5. Lessons
        DB::table('lesson')->upsert([
            [
                'id' => 'cmtq2aomp000cyq1y9qd7jj70',
                'title' => 'Course Roadmap & Tech Stack Overview',
                'order' => 1,
                'type' => 'VIDEO',
                'content' => null,
                'videoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                'durationSec' => 340,
                'isFreePreview' => true,
                'sectionId' => 'cmtq2aomp000byq1yv0y3q8po',
                'createdAt' => '2026-09-06 17:04:36.145',
            ],
            [
                'id' => 'cmtq2aomp000dyq1ymlolsu8z',
                'title' => 'Setting Up TypeScript & Professional Tooling',
                'order' => 2,
                'type' => 'ARTICLE',
                'content' => "### Tooling Checklist for 2026:\n1. **Node.js LTS (v20+)** installed with corepack enabled.\n2. **VS Code or Cursor** with ESLint, Tailwind CSS IntelliSense, and Prettier.\n3. **Git & GitHub** SSH keys configured for seamless push/pull workflows.\n4. **Prisma VS Code Extension** for instant schema validation and syntax highlighting.\n\nEnsure you have created a clean workspace directory before proceeding to Section 2.",
                'videoUrl' => null,
                'durationSec' => 180,
                'isFreePreview' => true,
                'sectionId' => 'cmtq2aomp000byq1yv0y3q8po',
                'createdAt' => '2026-09-06 17:04:36.145',
            ],
            [
                'id' => 'cmtq2aomp000fyq1y877twakl',
                'title' => 'Deep Dive into React Server Components (RSC)',
                'order' => 1,
                'type' => 'VIDEO',
                'content' => null,
                'videoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                'durationSec' => 620,
                'isFreePreview' => false,
                'sectionId' => 'cmtq2aomp000eyq1yphargz6c',
                'createdAt' => '2026-09-06 17:04:36.145',
            ],
            [
                'id' => 'cmtq2aomp000gyq1y8ert4xst',
                'title' => 'Architectural Knowledge Check',
                'order' => 2,
                'type' => 'QUIZ',
                'content' => null,
                'videoUrl' => null,
                'durationSec' => 300,
                'isFreePreview' => false,
                'sectionId' => 'cmtq2aomp000eyq1yphargz6c',
                'createdAt' => '2026-09-06 17:04:36.145',
            ],
            [
                'id' => 'cmtq2aomq000kyq1yc57x1sv2',
                'title' => 'Schema Modeling, Relations & Zero-Downtime Migrations',
                'order' => 1,
                'type' => 'VIDEO',
                'content' => null,
                'videoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                'durationSec' => 540,
                'isFreePreview' => false,
                'sectionId' => 'cmtq2aomq000jyq1yvtf0moje',
                'createdAt' => '2026-09-06 17:04:36.145',
            ],
            [
                'id' => 'cmtq2aon1000oyq1yhox104qq',
                'title' => 'The 8-point Grid and Spatial Rhythm',
                'order' => 1,
                'type' => 'VIDEO',
                'content' => null,
                'videoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                'durationSec' => 410,
                'isFreePreview' => true,
                'sectionId' => 'cmtq2aon1000nyq1y356l9th4',
                'createdAt' => '2026-09-06 17:04:36.157',
            ],
            [
                'id' => 'cmtq2aon1000pyq1y87g3claz',
                'title' => 'Typography Scale Quiz',
                'order' => 2,
                'type' => 'QUIZ',
                'content' => null,
                'videoUrl' => null,
                'durationSec' => 200,
                'isFreePreview' => false,
                'sectionId' => 'cmtq2aon1000nyq1y356l9th4',
                'createdAt' => '2026-09-06 17:04:36.157',
            ],
            [
                'id' => 'cmtq2aon7000uyq1ya54apmp7',
                'title' => 'How Embeddings Work Mathematically',
                'order' => 1,
                'type' => 'VIDEO',
                'content' => null,
                'videoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                'durationSec' => 480,
                'isFreePreview' => true,
                'sectionId' => 'cmtq2aon7000tyq1yorl5gx3b',
                'createdAt' => '2026-09-06 17:04:36.164',
            ],
            [
                'id' => 'cmtq2aonc000yyq1yjcqkdbfo',
                'title' => 'Protocol Buffers vs REST JSON Benchmarks',
                'order' => 1,
                'type' => 'VIDEO',
                'content' => null,
                'videoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
                'durationSec' => 500,
                'isFreePreview' => true,
                'sectionId' => 'cmtq2aonc000xyq1ymaclapxw',
                'createdAt' => '2026-09-06 17:04:36.168',
            ],
        ], ['id'], ['title', 'order', 'type', 'content', 'videoUrl', 'durationSec', 'isFreePreview', 'sectionId']);

        // 6. Quiz Questions
        DB::table('quizquestion')->upsert([
            [
                'id' => 'cmtq2aomp000hyq1y1hn6r3xc',
                'lessonId' => 'cmtq2aomp000gyq1y8ert4xst',
                'question' => 'What is the primary architectural benefit of React Server Components (RSC)?',
                'options' => '["They completely eliminate the need for HTML","They keep heavy dependencies on the server and send zero JavaScript bundle to the browser","They run exclusively on mobile phones","They force all state to be stored in browser cookies"]',
                'correctAnswer' => 1,
                'explanation' => 'RSCs execute solely on the server, reducing the client-side JavaScript payload to zero for static rendering parts.',
            ],
            [
                'id' => 'cmtq2aomq000iyq1ysc0crn81',
                'lessonId' => 'cmtq2aomp000gyq1y8ert4xst',
                'question' => 'In Next.js App Router, which file convention defines a route\'s visual skeleton during data loading?',
                'options' => '["skeleton.tsx","loader.tsx","loading.tsx","spinner.tsx"]',
                'correctAnswer' => 2,
                'explanation' => '`loading.tsx` automatically wraps page segments with React Suspense boundaries.',
            ],
            [
                'id' => 'cmtq2aon1000qyq1yg8n3bi6u',
                'lessonId' => 'cmtq2aon1000pyq1y87g3claz',
                'question' => 'Why is the 8-point spatial grid the industry standard?',
                'options' => '["Because 8 divides cleanly on almost all screen resolutions and creates visual consistency","Because Figma only allows multiples of 8","Because 8 is a prime number","Because printers only accept 8mm margins"]',
                'correctAnswer' => 0,
                'explanation' => 'The 8-point grid scales predictably across varied device DPIs and simplifies developer handoffs.',
            ],
        ], ['id'], ['lessonId', 'question', 'options', 'correctAnswer', 'explanation']);

        // 7. Orders
        DB::table('order')->upsert([
            [
                'id' => 'cmtq2aoog001gyq1y3eufoy3t',
                'userId' => 'cmtq2aomh0007yq1y7gc1zur5',
                'totalAmount' => 49.99,
                'platformFee' => 10,
                'instructorShare' => 39.99,
                'status' => 'COMPLETED',
                'paymentMethod' => 'STRIPE_CARD',
                'transactionRef' => 'TXN-20260906-INIT-894B',
                'createdAt' => '2026-09-06 17:04:36.208',
            ],
            [
                'id' => 'cmtq2aook001kyq1yccv2go7r',
                'userId' => 'cmtq2aomk0008yq1ydh87a5dt',
                'totalAmount' => 39.99,
                'platformFee' => 8,
                'instructorShare' => 31.99,
                'status' => 'COMPLETED',
                'paymentMethod' => 'PAYPAL',
                'transactionRef' => 'TXN-20260906-INIT-551C',
                'createdAt' => '2026-09-06 17:04:36.213',
            ],
        ], ['id'], ['userId', 'totalAmount', 'platformFee', 'instructorShare', 'status', 'paymentMethod', 'transactionRef']);

        // 8. Order Items
        DB::table('orderitem')->upsert([
            ['id' => 'cmtq2aoog001iyq1yx7jeeh1l', 'orderId' => 'cmtq2aoog001gyq1y3eufoy3t', 'courseId' => 'cmtq2aomp000ayq1yn95jw8ia', 'price' => 49.99, 'platformFee' => 10, 'instructorNet' => 39.99],
            ['id' => 'cmtq2aool001myq1yj54gzad9', 'orderId' => 'cmtq2aook001kyq1yccv2go7r', 'courseId' => 'cmtq2aon1000myq1ynj2uabxq', 'price' => 39.99, 'platformFee' => 8, 'instructorNet' => 31.99],
        ], ['id'], ['orderId', 'courseId', 'price', 'platformFee', 'instructorNet']);

        // 9. Enrollments
        DB::table('enrollment')->upsert([
            ['id' => 'cmtq2aoni0010yq1ypvl4qxh5', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'courseId' => 'cmtq2aomp000ayq1yn95jw8ia', 'completedAt' => '2026-09-06 17:04:36.172', 'createdAt' => '2026-09-06 17:04:36.175'],
            ['id' => 'cmtq2aooc001eyq1yp73dptbb', 'userId' => 'cmtq2aomk0008yq1ydh87a5dt', 'courseId' => 'cmtq2aon1000myq1ynj2uabxq', 'completedAt' => null, 'createdAt' => '2026-09-06 17:04:36.204'],
        ], ['id'], ['userId', 'courseId', 'completedAt']);

        // 10. Lesson Progress
        DB::table('lessonprogress')->upsert([
            ['id' => 'cmtq2aono0012yq1y8amhzvj4', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'lessonId' => 'cmtq2aomp000cyq1y9qd7jj70', 'completed' => true, 'updatedAt' => '2026-09-06 17:04:36.181'],
            ['id' => 'cmtq2aons0014yq1yk7h9y3bp', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'lessonId' => 'cmtq2aomp000dyq1ymlolsu8z', 'completed' => true, 'updatedAt' => '2026-09-06 17:04:36.184'],
            ['id' => 'cmtq2aonw0016yq1y6zju542g', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'lessonId' => 'cmtq2aomp000fyq1y877twakl', 'completed' => true, 'updatedAt' => '2026-09-06 17:04:36.188'],
            ['id' => 'cmtq2aoo00018yq1y2gjm4vek', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'lessonId' => 'cmtq2aomp000gyq1y8ert4xst', 'completed' => true, 'updatedAt' => '2026-09-06 17:04:36.192'],
            ['id' => 'cmtq2aoo4001ayq1y8mcy1fns', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'lessonId' => 'cmtq2aomq000kyq1yc57x1sv2', 'completed' => true, 'updatedAt' => '2026-09-06 17:04:36.196'],
        ], ['id'], ['userId', 'lessonId', 'completed', 'updatedAt']);

        // 11. Certificates
        DB::table('certificate')->upsert([
            ['id' => 'cmtq2aoo7001cyq1y8x90392i', 'certificateCode' => 'CERT-2026-WD89A', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'courseId' => 'cmtq2aomp000ayq1yn95jw8ia', 'issuedAt' => '2026-09-06 17:04:36.198'],
        ], ['id'], ['certificateCode', 'userId', 'courseId', 'issuedAt']);

        // 12. Reviews
        DB::table('review')->upsert([
            ['id' => 'cmtq2aooq001oyq1yck7ioch5', 'userId' => 'cmtq2aomh0007yq1y7gc1zur5', 'courseId' => 'cmtq2aomp000ayq1yn95jw8ia', 'rating' => 5, 'comment' => 'Incredible depth and clarity. The curriculum structure and practical exercises made everything click!', 'createdAt' => '2026-09-06 17:04:36.218'],
            ['id' => 'cmtq2aoou001qyq1y92uzv7jo', 'userId' => 'cmtq2aomk0008yq1ydh87a5dt', 'courseId' => 'cmtq2aon1000myq1ynj2uabxq', 'rating' => 5, 'comment' => 'Sarah is a master instructor. The design system lessons alone are worth 10x the course price.', 'createdAt' => '2026-09-06 17:04:36.223'],
        ], ['id'], ['userId', 'courseId', 'rating', 'comment']);

        // 13. Payouts
        DB::table('payout')->upsert([
            ['id' => 'cmtq2aooy001syq1yanxmh3fy', 'instructorId' => 'cmtq2aom80005yq1ydyq1i2ug', 'amount' => 150, 'method' => 'PAYPAL', 'details' => 'alex.rivera@paypalsample.com', 'status' => 'REQUESTED', 'adminNote' => 'Awaiting standard monthly batch payout confirmation', 'requestedAt' => '2026-09-06 17:04:36.226', 'processedAt' => null],
            ['id' => 'cmtq2aop2001uyq1yb6aau9o2', 'instructorId' => 'cmtq2aomd0006yq1y3nd4dowx', 'amount' => 100, 'method' => 'BANK_TRANSFER', 'details' => 'Chase Bank - Acct ending in 4819', 'status' => 'PAID', 'adminNote' => 'Disbursed via automated wire', 'requestedAt' => '2026-09-06 17:04:36.230', 'processedAt' => '2026-09-06 17:04:36.229'],
            ['id' => 'pay_gKsEQwbGKW0LfwVKCq6L', 'instructorId' => 'cmtq2aomd0006yq1y3nd4dowx', 'amount' => 40, 'method' => 'BANK_TRANSFER', 'details' => '123456789', 'status' => 'PAID', 'adminNote' => 'Approved and disbursed via clearing wire.', 'requestedAt' => '2026-09-06 20:07:03.000', 'processedAt' => '2026-09-06 20:08:11.000'],
        ], ['id'], ['instructorId', 'amount', 'method', 'details', 'status', 'adminNote', 'requestedAt', 'processedAt']);

        // 14. Platform Settings
        DB::table('platformsetting')->upsert([
            ['id' => 'global', 'commissionRate' => 20, 'subscriptionPrice' => 29.99, 'platformName' => 'EduFlow', 'supportEmail' => 'admin@eduflow.com', 'updatedAt' => '2026-09-06 17:04:35.808'],
        ], ['id'], ['commissionRate', 'subscriptionPrice', 'platformName', 'supportEmail', 'updatedAt']);
    }
}
