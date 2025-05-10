import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Subscript as SubscriptIcon, Superscript as SuperscriptIcon, Code, Highlighter, Type } from 'lucide-react';

interface FormWysiwygProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const extensions = [
  StarterKit,
  Underline,
  Highlight,
  Subscript,
  Superscript,
  TextStyle,
  FontFamily,
  Color,
];

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2 bg-gray-50 rounded-t-lg">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'p-1.5 text-gray-900 bg-gray-100 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm'}><Bold className="w-5 h-5" /><span className="sr-only">Bold</span></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'p-1.5 text-gray-900 bg-gray-100 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm'}><Italic className="w-5 h-5" /><span className="sr-only">Italic</span></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'p-1.5 text-gray-900 bg-gray-100 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm'}><UnderlineIcon className="w-5 h-5" /><span className="sr-only">Underline</span></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'p-1.5 text-gray-900 bg-gray-100 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm'}><Strikethrough className="w-5 h-5" /><span className="sr-only">Strike</span></button>
      <button type="button" onClick={() => editor.chain().focus().toggleSubscript().run()} className={editor.isActive('subscript') ? 'p-1.5 text-gray-900 bg-gray-100 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm'}><SubscriptIcon className="w-5 h-5" /><span className="sr-only">Subscript</span></button>
      <button type="button" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={editor.isActive('superscript') ? 'p-1.5 text-gray-900 bg-gray-100 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm'}><SuperscriptIcon className="w-5 h-5" /><span className="sr-only">Superscript</span></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'p-1.5 text-gray-900 bg-yellow-100 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-yellow-100 rounded-sm'}><Highlighter className="w-5 h-5" /><span className="sr-only">Highlight</span></button>
      <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'p-1.5 text-gray-900 bg-gray-200 rounded-sm' : 'p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-sm'}><Code className="w-5 h-5" /><span className="sr-only">Code</span></button>
      <button type="button" className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm"><Type className="w-5 h-5" /><span className="sr-only">Text size</span></button>
    </div>
  );
};

const FormWysiwyg: React.FC<FormWysiwygProps> = ({ name, label, error, required }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const editor = useEditor({
          extensions,
          content: value || '',
          onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
          },
        });

        useEffect(() => {
          if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
          }
        }, [value]);

        return (
          <div className="mb-4">
            {label && (
              <label className="block mb-1 font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            )}
            <div className="border border-gray-200 rounded-lg bg-gray-50">
              <MenuBar editor={editor} />
              <div className="px-4 py-2 bg-white rounded-b-lg">
                <EditorContent editor={editor} style={{ minHeight: 300, height: 300 }} className="h-[300px] min-h-[300px] caret-black outline-none focus:outline-none focus:ring-0 focus:border-0" />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          </div>
        );
      }}
    />
  );
};

export default FormWysiwyg;
