import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { Search, Filter, Star, BookOpen, Users, ArrowRight } from 'lucide-react';

interface CourseItem {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    thumbnail?: string;
    price: number;
    isFree: boolean;
    level: string;
    category?: { id: string; name: string; slug: string } | null;
    instructor?: { id: string; name: string; avatar?: string | null; headline?: string | null } | null;
    totalLessons: number;
    enrollmentCount: number;
    rating: number;
    reviewCount: number;
}

interface CategoryItem {
    id: string;
    name: string;
    slug: string;
}

interface CoursesIndexProps {
    courses: CourseItem[];
    categories: CategoryItem[];
    filters: {
        search?: string;
        category?: string;
        level?: string;
        price?: string;
        sort?: string;
    };
}

export default function CoursesIndex({
    courses = [],
    categories = [],
    filters = {},
}: CoursesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [level, setLevel] = useState(filters.level || 'All');
    const [price, setPrice] = useState(filters.price || 'all');
    const [sort, setSort] = useState(filters.sort || 'newest');

    const applyFilters = (newFilters: any) => {
        router.get('/courses', {
            search: newFilters.search !== undefined ? newFilters.search : search,
            category: newFilters.category !== undefined ? newFilters.category : category,
            level: newFilters.level !== undefined ? newFilters.level : level,
            price: newFilters.price !== undefined ? newFilters.price : price,
            sort: newFilters.sort !== undefined ? newFilters.sort : sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search });
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Banner */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Explore Course Catalog
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Find world-class technical education built by industry experts.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[260px]">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses by keyword..."
                                className="w-full bg-slate-50 text-slate-900 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-hidden transition"
                            />
                        </div>
                    </form>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category Dropdown */}
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                applyFilters({ category: e.target.value });
                            }}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.slug}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        {/* Level Filter */}
                        <select
                            value={level}
                            onChange={(e) => {
                                setLevel(e.target.value);
                                applyFilters({ level: e.target.value });
                            }}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>

                        {/* Price Filter */}
                        <select
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                applyFilters({ price: e.target.value });
                            }}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="all">All Prices</option>
                            <option value="paid">Paid</option>
                            <option value="free">Free</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value);
                                applyFilters({ sort: e.target.value });
                            }}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="newest">Newest Releases</option>
                            <option value="popular">Most Popular</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Courses Grid */}
                {courses.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <Filter className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">No courses match your criteria</h3>
                        <p className="text-xs text-slate-500 mt-1">Try resetting your filters or search keywords.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                setCategory('');
                                setLevel('All');
                                setPrice('all');
                                applyFilters({ search: '', category: '', level: 'All', price: 'all' });
                            }}
                            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                            >
                                <Link href={`/courses/${course.slug}`} className="relative aspect-video overflow-hidden bg-slate-900 block">
                                    <img
                                        src={
                                            course.thumbnail ||
                                            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
                                        }
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-xs">
                                            {course.level}
                                        </span>
                                    </div>
                                </Link>

                                <div className="p-5 flex-1 flex flex-col">
                                    {course.category && (
                                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
                                            {course.category.name}
                                        </span>
                                    )}

                                    <Link href={`/courses/${course.slug}`}>
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-2 leading-snug">
                                            {course.title}
                                        </h3>
                                    </Link>

                                    {course.subtitle && (
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                            {course.subtitle}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                                        <img
                                            src={
                                                course.instructor?.avatar ||
                                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                                            }
                                            alt={course.instructor?.name || 'Instructor'}
                                            className="w-6 h-6 rounded-full object-cover border border-slate-200"
                                        />
                                        <span className="font-medium text-slate-800 line-clamp-1">
                                            {course.instructor?.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            <span>{course.rating.toFixed(1)}</span>
                                            <span className="text-slate-400 font-normal">({course.reviewCount})</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                                {course.totalLessons} lessons
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                                {course.enrollmentCount}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            {course.isFree ? (
                                                <span className="text-base font-black text-emerald-600">FREE</span>
                                            ) : (
                                                <span className="text-lg font-black text-slate-900">
                                                    ${course.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        <Link
                                            href={`/courses/${course.slug}`}
                                            className="px-4 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition"
                                        >
                                            View Syllabus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
