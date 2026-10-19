'use client';
import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

const inputClass =
  'w-full rounded-md border border-teal-900 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600';

const Create = () => {
  const router = useRouter();
  const editorRef = useRef(null);

  const componentForm = useFormik({
    initialValues: {
      title: '',
      category: '',
      description: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      values.code = editorRef.current.getValue();

      try {
        const res = await axios.post('http://localhost:5000/component/add', values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.status === 200) {
          toast.success('Component saved');
          // router.push('/browse');
        }
      } catch (err) {
        toast.error('Failed to save component');
      } finally {
        setSubmitting(false);
      }
    },
  });

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={componentForm.handleSubmit}
        className="mx-auto max-w-4xl px-6 py-10"
      >
        <h1 className="mb-1 text-2xl font-bold">New component</h1>
        <p className="mb-8 text-gray-400">
          Write a component and save it to your library.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm text-gray-300">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Primary button"
              className={inputClass}
              value={componentForm.values.title}
              onChange={componentForm.handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-sm text-gray-300">
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Buttons"
              className={inputClass}
              value={componentForm.values.category}
              onChange={componentForm.handleChange}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-1 block text-sm text-gray-300">
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="A green call-to-action button"
              className={inputClass}
              value={componentForm.values.description}
              onChange={componentForm.handleChange}
              required
            />
          </div>
        </div>

        <label className="mb-1 mt-6 block text-sm text-gray-300">Code</label>
        <div className="overflow-hidden rounded-md border border-teal-900">
          <Editor
            height="50vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// write your component here"
            onMount={handleEditorDidMount}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={componentForm.isSubmitting}
            className="rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-500 disabled:opacity-60"
          >
            {componentForm.isSubmitting ? 'Saving…' : 'Save component'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;