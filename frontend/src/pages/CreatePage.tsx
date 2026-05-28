import { useState } from 'react';
import { Navbar } from '../components/Navbar.tsx';
import { Footer } from '../components/Footer.tsx';
import { PageLayout } from '../components/PageLayout.tsx';

export function CreatePage() {
  const [visibility, setVisibility] = useState<'Draft' | 'Publish'>('Draft');

  const [tags, setTags] = useState(['Lifestyle']);

  const handleSelectTag = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = event.target.value;

    if (!selectedTag || tags.includes(selectedTag)) return;

    setTags((currentTags) => [...currentTags, selectedTag]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((currentTags) =>
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <PageLayout>
      <Navbar />

      <section className="mt-8 grid min-h-[680px] grid-cols-1 border-t border-gray-100 pt-8 md:grid-cols-[1fr_290px]">

        <div className="border-b border-gray-100 pb-8 md:border-b-0 md:border-r md:pr-8">

          <p className="mb-2 text-sm font-semibold italic text-indigo-600">
            Heading
          </p>

          <input
            type="text"
            placeholder="Post Title"
            className="mb-8 w-full border-none text-2xl font-medium text-gray-800 outline-none placeholder:text-gray-300"
          />

          <p className="mb-2 text-sm font-semibold italic text-indigo-600">
            Body
          </p>

          <textarea
            placeholder="Start your story..."
            className="h-[480px] w-full resize-none border-none text-sm leading-7 text-gray-700 outline-none placeholder:text-gray-300"
          />
        </div>

        <aside className="pt-8 md:pt-0 md:pl-8">

          <h2 className="mb-5 text-lg font-medium text-gray-700">
            Post <span className='text-indigo-600'>Settings</span>
          </h2>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Cover image
            </p>

            <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400">
              Upload cover
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Categories & tags
            </p>

            <select
              onChange={handleSelectTag}
              value=""
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-300"
            >
              <option value="" disabled>
                Select a category...
              </option>

              <option value="Technology">Technology</option>
              <option value="Startup">Startup</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Finance">Finance</option>
            </select>

            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200"
                >
                  {tag} ×
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Publish date
            </p>

            <input
              type="date"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500 outline-none"
            />
          </div>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Visibility
            </p>

            <div className="space-y-2">

              <button
                type="button"
                onClick={() => setVisibility('Draft')}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm hover:cursor-pointer ${
                  visibility === 'Draft'
                    ? 'bg-indigo-500 text-white'
                    : 'border-gray-200 text-gray-500'
                }`}
              >
                Draft
              </button>

              <button
                type="button"
                onClick={() => setVisibility('Publish')}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
                  visibility === 'Publish'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-gray-200 text-gray-500'
                }`}
              >
                Publish
              </button>

            </div>
          </div>

          <button
            type="button"
            className="mt-10 w-full rounded-md border border-red-200 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            Move to Trash
          </button>

        </aside>
      </section>

      <Footer/>

    </PageLayout>
  );
}