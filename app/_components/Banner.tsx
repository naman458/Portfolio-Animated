'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'bottom 70%',
                end: 'bottom 10%',
                scrub: 1,
            },
        });

        tl.fromTo(
            '.slide-up-and-fade',
            { y: 0 },
            { y: -150, opacity: 0, stagger: 0.02 },
        );
    }, { scope: containerRef });

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />
            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                    <h1 className="banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-anton">
                        <span className="text-primary">TECHNODEXTROUS +</span>
                        <br /> <span className="ml-4">NAMAN?</span>
                    </h1>

                    <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Naman Maheshwari
                        </span>
                        , a 3rd-year B.Tech CSE (Data Science) student with a 
                        passion for fintech, problem-solving, and building products 
                        that combine logic with creativity. 
                    </p>


                    <Button
                        as="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={GENERAL_INFO.linkedinProfile}
                        variant="primary"
                        className="mt-9 banner-button slide-up-and-fade"
                    >
                        Let’s Link Up 🐮
                    </Button>
                </div>

                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            6+
                        </h5>
                        <p className="text-muted-foreground">
                            Projects Hard Launched
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            5k+
                        </h5>
                        <p className="text-muted-foreground">
                            Hours in the Zone
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            ∞
                        </h5>
                        <p className="text-muted-foreground">
                            Potential
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
