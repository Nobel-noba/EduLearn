import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import CertificateCard from '../../Components/CertificateCard';

interface CertificateShowProps {
    certificate: {
        code: string;
        studentName: string;
        courseTitle: string;
        instructorName: string;
        issuedAt: string;
        verificationUrl: string;
    };
}

export default function CertificateShow({ certificate }: CertificateShowProps) {
    return (
        <AppLayout>
            <div className="py-8 px-4">
                <CertificateCard
                    code={certificate.code}
                    studentName={certificate.studentName}
                    courseTitle={certificate.courseTitle}
                    instructorName={certificate.instructorName}
                    issuedAt={certificate.issuedAt}
                    verificationUrl={certificate.verificationUrl}
                />
            </div>
        </AppLayout>
    );
}
