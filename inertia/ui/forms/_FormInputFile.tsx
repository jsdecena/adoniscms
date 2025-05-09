import React, { useState } from 'react';
import { CircleAlert, Upload, X } from 'lucide-react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Label } from '../../lib/shadcn';
import { cn, getUseStateValue } from '../../utils';
import axios from 'axios';

type TCommonProps = {
  id?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  labelAction?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  showPreview?: boolean;
};

type TProps<T> = TCommonProps &
  (
    | {
        name: string;
        value: string;
        register?: never;
        onChange: React.Dispatch<React.SetStateAction<T>>;
      }
    | {
        name?: never;
        value?: never;
        onChange?: never;
        register: FieldValues;
      }
  );

const InputFileComponent = <T,>({
  id,
  name,
  label,
  error,
  onChange,
  labelAction,
  accept = 'image/jpeg, image/png, image/jpg',
  maxSize = 10 * 1024 * 1024, // 10MB default
  showPreview = true,
  ...rest
}: TProps<T>) => {
  const isOnChange = typeof onChange === 'function';
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      setUploadedUrl(null);
      
      if (isOnChange) {
        onChange((prev: T) => ({
          ...prev,
          [name as never]: '',
        }));
      }
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSize) {
      setUploadError(`File size exceeds the limit of ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setFile(selectedFile);

    // Create preview for images
    if (showPreview && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    // Upload the file
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('/partners/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.data?.url) {
        setUploadedUrl(response.data.data.url);
        
        if (isOnChange) {
          onChange((prev: T) => ({
            ...prev,
            [name as never]: response.data.data.url,
          }));
        }
      } else {
        setUploadError('Failed to upload file');
      }
    } catch (error: any) {
      console.error('File upload error:', error);
      setUploadError(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setUploadedUrl(null);
    
    if (isOnChange) {
      onChange((prev: T) => ({
        ...prev,
        [name as never]: '',
      }));
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col space-y-1.5">
        {(label || labelAction) && (
          <div className="flex items-center">
            {label && (
              <Label htmlFor={id ?? name}>
                {label}
                {rest?.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
            )}
            {labelAction && labelAction}
          </div>
        )}
        
        <div className="relative">
          {/* File input */}
          <div className={cn(
            "border border-gray-300 rounded-md p-4",
            uploading && "opacity-50 cursor-not-allowed",
            error && "border-red-500",
            rest.className
          )}>
            {/* Preview area */}
            {preview && showPreview && (
              <div className="mb-4 relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-40 max-w-full rounded-md mx-auto"
                />
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  disabled={uploading}
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            {/* Upload button or status */}
            {!file ? (
              <label 
                htmlFor={id ?? name} 
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {rest.placeholder || 'Click to upload a file'}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  {accept.split(',').map(type => type.split('/')[1]).join(', ')} files up to {maxSize / (1024 * 1024)}MB
                </span>
              </label>
            ) : (
              <div className="text-sm text-center">
                {uploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                    <span>Uploading...</span>
                  </div>
                ) : uploadedUrl ? (
                  <div className="text-green-600">
                    File uploaded successfully
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="truncate max-w-xs">{file.name}</span>
                  </div>
                )}
              </div>
            )}
            
            <input
              type="file"
              id={id ?? name}
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading || rest.disabled}
            />
          </div>
          
          {/* Hidden input to store the uploaded URL for form submission */}
          {uploadedUrl && (
            <input 
              type="hidden" 
              name={name} 
              value={uploadedUrl} 
            />
          )}
        </div>
      </div>
      
      {/* Error display */}
      {(error || uploadError) && (
        <div className="my-1 flex w-full text-white bg-red-500 p-2">
          <div className="ml-auto inline-flex items-center gap-1">
            <CircleAlert className="h-3 w-3" />
            <p className="text-sm">{error || uploadError}</p>
          </div>
        </div>
      )}
    </div>
  );
};

function FormInputFile<T>({ register, onChange, ...rest }: TProps<T>) {
  const { control } = useFormContext() ?? {};
  
  return (
    <>
      {register && !onChange ? (
        <Controller
          control={control}
          name={register?.name}
          render={({ field: { onChange, value, name } }) => (
            <InputFileComponent
              {...rest}
              name={name}
              value={value || ''}
              onChange={($v: React.SetStateAction<typeof value>) => {
                const v = getUseStateValue(value, $v);
                onChange(v[name]);
              }}
            />
          )}
        />
      ) : (
        <InputFileComponent
          onChange={onChange}
          name={rest?.name ?? ''}
          value={rest?.value ?? ''}
          {...rest}
        />
      )}
    </>
  );
}

export default FormInputFile;