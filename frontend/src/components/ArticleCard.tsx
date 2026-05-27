import { Link, useNavigate } from 'react-router-dom';
import type { BlogArticle } from '../data/articles.ts';

type ArticleCardProps = {
  article: BlogArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();

  return (
    <div className="group relative h-full overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm transition hover:border-gray-200 hover:shadow-md">
      {/* Primary Link Overlay */}
      <Link
        to={`/post/${article.id}`}
        className="absolute inset-0 z-0"
        aria-label={article.title}
      />
      
      <article className="flex h-full flex-col">
        <img
          src={article.image}
          alt={article.title}
          className="h-40 w-full object-cover"
        />

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
