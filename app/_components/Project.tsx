import TransitionLink from '@/components/TransitionLink';
import { cn } from '@/lib/utils';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface Props {
  index: number;
  project: IProject;
  selectedProject: string | null;
  onMouseEnter: (_slug: string) => void;
}

const Project = ({ index, project, selectedProject, onMouseEnter }: Props) => {
  const externalLinkSVGRef = useRef<SVGSVGElement>(null);
  const { context, contextSafe } = useGSAP(() => {}, {
    scope: externalLinkSVGRef,
    revertOnUpdate: true,
  });

  const handleMouseEnter = contextSafe?.(() => {
    onMouseEnter(project.slug);

    const arrowLine = externalLinkSVGRef.current?.querySelector('#arrow-line') as SVGPathElement;
    const arrowCurb = externalLinkSVGRef.current?.querySelector('#arrow-curb') as SVGPathElement;
    const box = externalLinkSVGRef.current?.querySelector('#box') as SVGPathElement;

    gsap.set([box, arrowLine, arrowCurb], (el: SVGPathElement) => ({
      opacity: 0,
      strokeDasharray: el?.getTotalLength(),
      strokeDashoffset: el?.getTotalLength(),
    }));

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(externalLinkSVGRef.current, { autoAlpha: 1 })
      .to(box, { opacity: 1, strokeDashoffset: 0 })
      .to(arrowLine, { opacity: 1, strokeDashoffset: 0 }, '<0.2')
      .to(arrowCurb, { opacity: 1, strokeDashoffset: 0 })
      .to(externalLinkSVGRef.current, { autoAlpha: 0 }, '+=1');
  });

  const handleMouseLeave = contextSafe?.(() => {
    gsap.to(externalLinkSVGRef.current, { autoAlpha: 0, duration: 0.2 });
    context.kill();
  });

  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      className="project-item group leading-none py-5 md:border-b first:!pt-0 last:pb-0 last:border-none 
                 md:group-hover/projects:opacity-30 md:hover:!opacity-100 
                 transition-all hover:scale-[1.02] hover:rotate-[0.4deg]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {selectedProject === null && (
        <Image
          src={project.thumbnail}
          alt={project.title}
          width="300"
          height="200"
          className={cn('w-full object-cover mb-6 aspect-[3/2] object-top rounded-xl')}
          key={project.slug}
          loading="lazy"
        />
      )}

      <div className="flex gap-2 md:gap-5">
        <div className="font-anton text-muted-foreground">
          _{(index + 1).toString().padStart(2, '0')}.
        </div>

        <div>
          <h4 className="text-4xl xs:text-6xl flex gap-4 font-anton transition-all duration-700 
                         bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                         bg-[length:200%_auto] bg-right bg-clip-text text-transparent 
                         group-hover:bg-left animate-gradient">
            {project.title}
            <span className="text-foreground opacity-0 group-hover:opacity-100 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                ref={externalLinkSVGRef}
              >
                <path id="box" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <path id="arrow-line" d="M10 14 21 3"></path>
                <path id="arrow-curb" d="M15 3h6v6"></path>
              </svg>
            </span>
          </h4>

          <div
            className="text-sm text-muted-foreground/70 mt-1 italic"
            dangerouslySetInnerHTML={{
              __html: `peep it 👀 — ${project.description || 'check the vibe'}`,
            }}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 
                           text-[0.7rem] uppercase tracking-wide hover:scale-105 transition-all 
                           text-gray-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TransitionLink>
  );
};

export default Project;
