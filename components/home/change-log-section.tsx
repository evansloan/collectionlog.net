'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GithubRelease } from '@/lib/api/github/github-api';
import { useLocale } from '@/lib/hooks';
import { formatDate } from '@/lib/utils';

interface ChangeLogSectionProps {
  releases: GithubRelease[];
  title: string;
  value: string;
}

const ChangeLogSection = ({
  releases,
  title,
  value,
}: ChangeLogSectionProps) => {
  const locale = useLocale();

  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className='py-0'>
        {releases.map((release) => (
          <div
            key={release.node_id}
            className='border-b border-b-light py-2 last:border-b-0'
          >
            <h4 className='text-lg font-bold text-rs-yellow'>
              {release.name} - {formatDate(release.created_at, locale)}
            </h4>
            <ReactMarkdown>{release.body}</ReactMarkdown>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ChangeLogSection;
