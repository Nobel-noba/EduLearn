import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
  Play,
  ThumbsUp,
  ThumbsDown,
  X,
  HelpCircle,
  FileText,
  RotateCcw,
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  type: string;
  durationSec: number;
  isFreePreview: boolean;
  quizQuestionsCount: number;
}

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseItem {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  thumbnail: string | null;
  promoVideoUrl: string | null;
  price: number;
  isFree: boolean;
  level: string;
  language: string;
  status: string;
  rejectionReason: string | null;
  category: string;
  instructor: {
    name: string;
    avatar: string | null;
  };
  sectionsCount: number;
  lessonsCount: number;
  sections: Section[];
}

interface Props {
  courses: CourseItem[];
}

export default function AdminCourses({ courses }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [inspectCourse, setInspectCourse] = useState<CourseItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const pendingCoursesCount = courses.filter((c) => c.status === 'UNDER_REVIEW').length;

  const handleApprove = (courseId: number) => {
    setActionLoading(true);
    router.post(`/admin/courses/${courseId}/approve`, {}, {
      onFinish: () => setActionLoading(false),
    });
  };

  const handleReject = () => {
    if (!selectedCourseId || !rejectionReason.trim()) return;
    setActionLoading(true);
    router.post(`/admin/courses/${selectedCourseId}/reject`, {
      reason: rejectionReason,
    }, {
      onFinish: () => {
        setActionLoading(false);
        setRejectModalOpen(false);
        setRejectionReason('');
        setSelectedCourseId(null);
      },
    });
  };

  const handleUnpublish = (courseId: number) => {
    setActionLoading(true);
    router.post(`/admin/courses/${courseId}/unpublish`, {}, {
      onFinish: () => setActionLoading(false),
    });
  };

  const filteredCourses = courses.filter((c) => {
    if (statusFilter === 'ALL') return true;
    return c.status === statusFilter;
  });

  return (
    <AppLayout>
      <Head title="Course Moderation Queue - EduLearn Admin" />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <AdminNav pendingCourses={pendingCoursesCount} />

        {/* Top Header & Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Course Moderation & Quality Control
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review instructor-submitted courses, inspect syllabus content, and approve for marketplace distribution.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {[
              { id: 'ALL', label: `All (${courses.length})` },
              {
                id: 'UNDER_REVIEW',
                label: `Pending Review (${courses.filter((c) => c.status === 'UNDER_REVIEW').length})`,
              },
              {
                id: 'PUBLISHED',
                label: `Published (${courses.filter((c) => c.status === 'PUBLISHED').length})`,
              },
              {
                id: 'DRAFT',
                label: `Drafts (${courses.filter((c) => c.status === 'DRAFT').length})`,
              },
              {
                id: 'REJECTED',
                label: `Rejected (${courses.filter((c) => c.status === 'REJECTED').length})`,
              },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  statusFilter === f.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
              No courses found under this filter.
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={
                      course.thumbnail ||
                      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
                    }
                    alt={course.title}
                    className="w-28 h-20 rounded-xl object-cover bg-slate-900 shrink-0 border border-slate-100"
                  />

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {course.status === 'PUBLISHED' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      )}
                      {course.status === 'UNDER_REVIEW' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3" /> Awaiting Approval
                        </span>
                      )}
                      {course.status === 'DRAFT' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                          Draft
                        </span>
                      )}
                      {course.status === 'REJECTED' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold border border-red-200 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400">•</span>
                      <span className="text-[11px] font-semibold text-indigo-600">
                        {course.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900">{course.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{course.subtitle}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={
                            course.instructor.avatar ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
                          }
                          alt={course.instructor.name}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span className="font-medium text-slate-700">{course.instructor.name}</span>
                      </div>
                      <span>•</span>
                      <span>{course.sectionsCount} sections</span>
                      <span>•</span>
                      <span>{course.lessonsCount} lectures</span>
                      <span>•</span>
                      <span className="font-bold text-slate-900">${course.price.toFixed(2)}</span>
                    </div>

                    {course.rejectionReason && (
                      <div className="mt-2 text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
                        <span className="font-bold">Rejection Note:</span> {course.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Moderation Action Buttons */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => setInspectCourse(course)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    Inspect Syllabus
                  </button>

                  {course.status !== 'PUBLISHED' && (
                    <button
                      onClick={() => handleApprove(course.id)}
                      disabled={actionLoading}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>
                  )}

                  {course.status !== 'REJECTED' && (
                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        setRejectModalOpen(true);
                      }}
                      disabled={actionLoading}
                      className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  {course.status === 'PUBLISHED' && (
                    <button
                      onClick={() => handleUnpublish(course.id)}
                      disabled={actionLoading}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer disabled:opacity-50 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Inspect Syllabus Modal */}
        {inspectCourse && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">{inspectCourse.title}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Instructor: {inspectCourse.instructor.name} • ${inspectCourse.price.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => setInspectCourse(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {inspectCourse.sections.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No sections created yet.</p>
                ) : (
                  inspectCourse.sections.map((section, idx) => (
                    <div key={section.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-800 mb-2">
                        Section {idx + 1}: {section.title}
                      </div>
                      <div className="space-y-1.5 pl-2">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between text-xs py-1 text-slate-600"
                          >
                            <div className="flex items-center gap-2">
                              {lesson.type === 'QUIZ' && <HelpCircle className="w-3.5 h-3.5 text-amber-500" />}
                              {lesson.type === 'ARTICLE' && <FileText className="w-3.5 h-3.5 text-sky-500" />}
                              {lesson.type === 'VIDEO' && <Play className="w-3.5 h-3.5 text-indigo-500" />}
                              <span>{lesson.title}</span>
                              {lesson.isFreePreview && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                                  Preview
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-slate-400 text-[11px]">
                              {Math.round(lesson.durationSec / 60)}m
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setInspectCourse(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Close
                </button>
                {inspectCourse.status !== 'PUBLISHED' && (
                  <button
                    onClick={() => {
                      handleApprove(inspectCourse.id);
                      setInspectCourse(null);
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Approve & Publish Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reject Course Modal */}
        {rejectModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
              <h3 className="text-lg font-black text-slate-900 mb-1">Reject Course Submission</h3>
              <p className="text-xs text-slate-500 mb-4">
                Provide feedback to the instructor explaining what changes or improvements are needed.
              </p>

              <textarea
                rows={4}
                required
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Please add interactive quiz assessments for Section 2 and improve audio quality in lecture 3."
                className="w-full p-3.5 rounded-xl border border-slate-300 text-xs focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-hidden mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!rejectionReason.trim() || actionLoading}
                  onClick={handleReject}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Send Rejection Feedback'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
