import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

const Faq = () => {
  return (
    <Accordion type='single' collapsible className='w-full p-4 md:w-2/3'>
      <AccordionItem value='not-updating'>
        <AccordionTrigger>
          Why is my collection log not updating?
        </AccordionTrigger>
        <AccordionContent className='py-0'>
          <p>If you&apos;re having trouble uploading your collection log, or your collection log is not updating, try the following:</p>
          <ol>
            <li>Make sure the &quot;Allow collectionlog.net connections&quot; plugin configuration option is enabled.</li>
            <li>Click through any collection log pages that may need updated.</li>
            <li>Restart your client and try to upload again.</li>
          </ol>
          <p className='mt-1'>If none of the above solutions work, try the following</p>
          <ol>
            <li>
              In the collection log plugin side panel click the &quot;Reset
              collection log data&quot; button and click through your collection log
              again.
            </li>
            <li>
              Attempt to upload your collection log data by clicking the &quot;Upload
              collection log data&quot; button or by logging out.
            </li>
            <li>
              Create a thread in the Log Hunters Discord server #report-a-bug
              forum channel detailing your issues
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='live-stream'>
        <AccordionTrigger>
          How do I display my live stream on collectionlog.net?
        </AccordionTrigger>
        <AccordionContent className='py-0'>
          <p>
            To get your live stream to appear on collectionlog.net make sure
            that:
          </p>
          <ol>
            <li>You are streaming in the Old School Runescape category.</li>
            <li>
              Your live stream title contains one of the following keywords:
              clog, collection log, !log.
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;
