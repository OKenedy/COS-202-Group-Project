import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';
import { PageLayout } from '../components/PageLayout.tsx';
import { articles } from '../data/articles.ts';
import type { BlogArticle } from '../data/articles.ts';

const topics = [
  {
    label: 'Technology',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
      </svg>
    ),
  },
  {
    label: 'Start Up',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    label: 'Finance',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4M10.5 10.5h3" />
      </svg>
    ),
  },
  {
    label: 'Lifestyle',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

type ProfileTab = 'published' | 'highlights' | 'drafts';

function ProfileStoryRow({ article, date }: { article: BlogArticle; date: string }) {
  return (
    <article className="flex flex-col gap-5 border-b border-gray-100 py-8 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {article.category} <span className="font-normal text-gray-400">·</span> {article.readTime}
        </p>
        <h2 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tight text-[#111] sm:text-2xl">
          <Link to={`/post/${article.id}`} className="text-inherit no-underline hover:text-gray-700">
            {article.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <time dateTime={date}>{date}</time>
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Save story"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="More options"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
        </div>
      </div>
      <Link to={`/post/${article.id}`} className="shrink-0 no-underline sm:pt-1" tabIndex={-1} aria-hidden>
        <img
          src={article.image}
          alt=""
          className="h-28 w-full rounded-md object-cover grayscale sm:h-24 sm:w-40"
        />
      </Link>
    </article>
  );
}

function ProfileFooter({ name }: { name: string }) {
  return (
    <footer className="border-t border-gray-100 p-6 md:p-10 pt-10">
      <div className="flex flex-col justify-between gap-8 text-sm text-gray-500 md:flex-row md:items-end">
        <div>
          <p className="text-base font-semibold tracking-wide text-[#111] uppercase">{name.split(' ')[0] || 'MUSK'}</p>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-gray-500">
            Crafting stories and ideas for the modern reader. Discover high-quality articles across inspiring themes.
          </p>
          <p className="mt-4 text-xs text-gray-400">© 2026 {name.toUpperCase()}. All rights reserved.</p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-xs">
          <div className="space-y-2">
            <p className="font-semibold uppercase tracking-wider text-gray-700">Company</p>
            <p className="cursor-pointer hover:text-gray-800">About</p>
            <p className="cursor-pointer hover:text-gray-800">Careers</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold uppercase tracking-wider text-gray-700">Support</p>
            <p className="cursor-pointer hover:text-gray-800">Contact</p>
            <p className="cursor-pointer hover:text-gray-800">Privacy Policy</p>
            <p className="cursor-pointer hover:text-gray-800">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ProfilePage() {
  const { authorName } = useParams();
  const currentAuthorName = authorName ? decodeURIComponent(authorName) : 'Elena Vance';

  const [tab, setTab] = useState<ProfileTab>('published');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentAuthorName,
    bio: 'Creative Director & Design Philosopher. Exploring the intersection of digital ethics, minimalist aesthetics, and the future of human-computer interaction. Currently archiving thoughts on Lumina.',
    location: 'San Francisco',
    website: currentAuthorName.toLowerCase().replace(/\s+/g, '') + '.design',
  });

  // Demo: update profile data if URL authorName changes
  useMemo(() => {
    setProfileData(prev => ({
      ...prev,
      name: currentAuthorName,
      website: currentAuthorName.toLowerCase().replace(/\s+/g, '') + '.design'
    }));
  }, [currentAuthorName]);

  const authorArticles = useMemo(() => {
    return articles.filter(a => a.author === currentAuthorName).map((article, i) => ({
      article,
      date: ['Apr 14, 2026', 'Mar 22, 2026', 'Feb 8, 2026', 'Jan 15, 2026'][i % 4] ?? 'Jan 1, 2026',
    }));
  }, [currentAuthorName]);

  const filteredFeed = authorArticles.filter(({ article }) => {
    if (!selectedTopic) return true;
    const articleCat = article.category.toLowerCase().replace(/\s+/g, '');
    const selectedCat = selectedTopic.toLowerCase().replace(/\s+/g, '');
    return articleCat === selectedCat;
  });

  return (
    <PageLayout mainClassName="flex flex-col p-0 text-[#1a1a1a]">
      <div className="border-b border-gray-100 p-6 md:p-10">
        <Navbar />
      </div>

      <div className="flex">
        <aside className="hidden w-[220px] shrink-0 border-r border-gray-100 bg-[#f9f9f9] px-5 py-8 md:flex md:flex-col lg:w-[260px] lg:px-7">
          <div>
            <p className="font-semibold tracking-tight text-[#111]">Library</p>
            <p className="mt-0.5 text-xs text-gray-500">Curated topics</p>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Topics">
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm no-underline transition hover:bg-gray-200/80 hover:text-gray-900 ${
                  selectedTopic === null ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700'
                }`}
              >
                <span className="text-gray-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                All Posts
              </button>
              {topics.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedTopic(label)}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm no-underline transition hover:bg-gray-200/80 hover:text-gray-900 ${
                    selectedTopic === label ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700'
                  }`}
                >
                  <span className="text-gray-500">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-10">
            <button
              type="button"
              className="w-full rounded-md bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
            >
              Become a member
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=8b5cf6&color=fff&size=200`}
                alt=""
                className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
              />
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 font-serif text-2xl font-semibold outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-[15px] outline-none focus:ring-2 focus:ring-violet-500"
                      rows={3}
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="Location"
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <input
                        type="text"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        placeholder="Website"
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">{profileData.name}</h1>
                      <button
                        type="button"
                        className="rounded-md bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                      >
                        Follow
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:border-gray-400 hover:bg-gray-50"
                        aria-label="Edit Profile"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                      {profileData.bio}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {profileData.location}
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <a href={`https://${profileData.website}`} className="text-gray-600 underline-offset-2 hover:underline">
                          {profileData.website}
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        Joined March 2022
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gray-100 pt-8 sm:max-w-md">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">{authorArticles.length > 0 ? authorArticles.length : 42}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Stories</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">12.8k</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">156</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Following</p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-2">
              <div className="flex gap-8 border-b border-gray-200" role="tablist" aria-label="Profile content">
                {(
                  [
                    { id: 'published' as const, label: 'Published' },
                    { id: 'highlights' as const, label: 'Highlights' },
                    { id: 'drafts' as const, label: 'Drafts' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`-mb-px border-b-2 pb-3 text-sm font-medium transition ${
                      tab === id
                        ? 'border-[#111] text-[#111]'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="pt-2" role="tabpanel">
                {tab === 'published' && (
                  <div>
                    {filteredFeed.length > 0 ? (
                      filteredFeed.map(({ article, date }) => (
                        <ProfileStoryRow key={article.id} article={article} date={date} />
                      ))
                    ) : (
                      <p className="py-14 text-center text-sm text-gray-500">No stories found.</p>
                    )}
                  </div>
                )}
                {tab === 'highlights' && (
                  <p className="py-14 text-center text-sm text-gray-500">No highlighted stories yet.</p>
                )}
                {tab === 'drafts' && (
                  <p className="py-14 text-center text-sm text-gray-500">No drafts saved.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <ProfileFooter name={profileData.name} />
    </PageLayout>
  );
}
