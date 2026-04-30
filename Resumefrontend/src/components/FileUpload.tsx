import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

interface Props {
  onUpload: (file: File) => void;
  isLoading: boolean;
  uploadedFileName?: string;
}

export default function FileUpload({ onUpload, isLoading, uploadedFileName }: Props) {
  const [dragError, setDragError] = useState('');

  const onDrop = useCallback((accepted: File[], rejected: any[]) => {
    setDragError('');
    if (rejected.length > 0) {
      setDragError('Only PDF, DOC, or DOCX files under 10MB are allowed.');
      return;
    }
    if (accepted[0]) onUpload(accepted[0]);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-indigo-500 bg-indigo-50 scale-[1.01]' : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50'}
          ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}
          ${uploadedFileName ? 'border-emerald-400 bg-emerald-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {uploadedFileName ? (
            <>
              <CheckCircle className="w-12 h-12 text-emerald-500" />
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <FileText className="w-4 h-4" />
                <span>{uploadedFileName}</span>
              </div>
              <p className="text-sm text-slate-500">Drop a new file to replace</p>
            </>
          ) : (
            <>
              <div className={`p-4 rounded-full ${isDragActive ? 'bg-indigo-100' : 'bg-white shadow-sm'}`}>
                <Upload className={`w-8 h-8 ${isDragActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-700">
                  {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                </p>
                <p className="text-sm text-slate-500 mt-1">or <span className="text-indigo-600 font-medium">browse files</span></p>
              </div>
              <p className="text-xs text-slate-400">PDF, DOC, DOCX · Max 10MB</p>
            </>
          )}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-600 font-medium">
              <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              Parsing resume...
            </div>
          </div>
        )}
      </div>
      {dragError && (
        <div className="mt-2 flex items-center gap-1 text-red-500 text-sm">
          <X className="w-4 h-4" /> {dragError}
        </div>
      )}
    </div>
  );
}
