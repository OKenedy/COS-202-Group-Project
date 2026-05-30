import { Link, useNavigate } from 'react-router-dom';
import type { BlogArticle } from '../data/articles.ts';
import { useSavedPosts } from '../hooks/useSavedPosts.ts';

type ArticleCardProps = {
  article: BlogArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useSavedPosts();
  const saved = isSaved(article.id);

  return (
    <div className="group relative h-full overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm transition hover:border-gray-200 hover:shadow-md">
      {/* Primary Link Overlay */}
      <Link
        to={`/post/${article.id}`}
        className="absolute inset-0 z-0"
        aria-label={article.title}
      />
      
      <article className="flex h-full flex-col">
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(article.id);
            }}
            className={`absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 shadow-sm transition hover:bg-white ${
              saved ? 'text-indigo-600' : 'text-gray-400'
            }`}
            aria-label={saved ? "Unsave story" : "Save story"}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col space-y-3 p-4">

          <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-indigo-500">
            {article.category}
          </span>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{article.title}</h3>
          <p className="line-clamp-2 text-xs text-gray-500">{article.excerpt}</p>

          <div className="mt-auto text-[11px] text-gray-400">
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/profile/${encodeURIComponent(article.author)}`);
              }}
              className="relative z-10 cursor-pointer hover:text-indigo-600 hover:underline"
            >
              {article.author}
            </span> • {article.readTime}
          </div>
        </div>
      </article>
    </div>
  );
}
