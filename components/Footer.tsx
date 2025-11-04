import { GENERAL_INFO } from '@/lib/data';
import { GitFork, Star } from 'lucide-react';

interface RepoStats {
  stargazers_count: number;
  forks_count: number;
}

const Footer = async () => {
  const repoStats = await fetch(
    'https://api.github.com/repos/naman458/Portfolio-Animated',
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  );

  const data = await repoStats.json().catch(() => ({}));
  const { stargazers_count = 0, forks_count = 0 } = data as RepoStats;

  return (
    <footer className="text-center pb-5" id="contact">
      <div className="container">
        <p className="text-lg">Have a project in mind?</p>
        <a
          href={`mailto:${GENERAL_INFO.email}`}
          className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline"
        >
          {GENERAL_INFO.email}
        </a>

        <div>
          <a
            href="https://github.com/naman458/Portfolio-Animated"
            target="_blank"
            className="leading-none text-muted-foreground hover:underline hover:text-white"
          >
            Designed & Built by Naman Maheshwari
            <div className="flex items-center justify-center gap-5 pt-1">
              <span className="flex items-center gap-2">
                <Star size={18} /> {stargazers_count}
              </span>
              <span className="flex items-center gap-2">
                <GitFork size={18} /> {forks_count}
              </span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
