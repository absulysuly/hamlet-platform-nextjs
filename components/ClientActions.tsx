'use client';
import { Candidate } from '@/lib/types';
import { FaShareAlt, FaPrint } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

type ClientActionsProps = {
    candidate: Candidate;
    dictionary: any;
}

export default function ClientActions({ candidate, dictionary }: ClientActionsProps) {
  
  const handleShare = async () => {
    const shareData = {
      title: `${dictionary.page.profile.shareTitle} ${candidate.name}`,
      text: `${dictionary.page.profile.shareText} ${candidate.name}, ${dictionary.candidate.candidateIn} ${candidate.governorate}.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(dictionary.page.profile.linkCopied);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error(dictionary.page.profile.shareError);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <FaShareAlt />
          <span>{dictionary.page.profile.share}</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
        >
          <FaPrint />
          <span>{dictionary.page.profile.print}</span>
        </button>
      </div>
    </>
  );
}
