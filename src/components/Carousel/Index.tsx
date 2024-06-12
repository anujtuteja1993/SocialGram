import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";

import CarouselDots from "../CarouselDots";

type CarouselProps = {
    imgUrls: string[];
    blurHashes?: string[];
    aspectRatio?: string;
    postId?: string;
};

const Carousel = ({
    imgUrls,
    blurHashes,
    aspectRatio,
    postId,
}: CarouselProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const [currentImgIndex, setcurrentImgIndex] = useState(0);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);

    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const imgCurrent = carouselRef.current;

        if (currentImgIndex != imgUrls.length - 1) {
            setNextButtonDisabled(false);
        }

        if (currentImgIndex != 0) {
            setPrevButtonDisabled(false);
        }

        if (!imgCurrent) {
            return;
        }

        const images = imgCurrent.querySelectorAll("[id^='img']");
        const imagesArray = Array.from(images);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = imagesArray.indexOf(entry.target);
                        setcurrentImgIndex(index);
                    }
                });
            },
            {
                root: imgCurrent,
                threshold: 0.5,
            }
        );

        images.forEach((slide: Element) => observer.observe(slide));
        return () =>
            images.forEach((slide: Element) => observer.unobserve(slide));
    }, [imgUrls]);

    useEffect(() => {
        if (currentImgIndex != imgUrls.length - 1) {
            setNextButtonDisabled(false);
        }

        if (currentImgIndex != 0) {
            setPrevButtonDisabled(false);
        }
    }, [currentImgIndex]);

    const nextImage = () => {
        if (currentImgIndex === imgUrls.length - 1) {
            setNextButtonDisabled(!nextButtonDisabled);
            return;
        }

        // setPrevButtonDisabled(false);
        document
            .querySelector(
                postId
                    ? "#img" + postId + (currentImgIndex + 1)
                    : "#img" + (currentImgIndex + 1)
            )!
            .scrollIntoView({ block: "nearest", inline: "center" });
    };

    const prevImage = () => {
        if (currentImgIndex === 0) {
            setPrevButtonDisabled(!prevButtonDisabled);
            return;
        }

        document
            .querySelector(
                postId
                    ? "#img" + postId + (currentImgIndex - 1)
                    : "#img" + (currentImgIndex - 1)
            )!
            .scrollIntoView({ block: "nearest", inline: "center" });
    };

    return (
        <div className="relative">
            <div
                className="w-full carousel border-[1px] transition-all duration-200 rounded-box border-primary-content overflow-scroll md:overflow-hidden"
                style={{ aspectRatio: `${aspectRatio ? aspectRatio : "4/5"}` }}
                ref={carouselRef}
            >
                {!isImgLoaded && blurHashes && (
                    <div className="top-0 bottom-0 w-full">
                        <Blurhash
                            hash={blurHashes[0]}
                            width="100%"
                            height="100%"
                            resolutionX={32}
                            resolutionY={32}
                            punch={1}
                        />
                    </div>
                )}
                {imgUrls.map((imgUrl, i) => (
                    <div
                        id={postId ? "img" + postId + i : "img" + i}
                        key={i}
                        className="carousel-item w-full relative"
                    >
                        <img
                            src={imgUrl}
                            className={`object-cover w-full ${
                                !isImgLoaded ? "hidden" : ""
                            }`}
                            alt="Image"
                            onLoad={() => {
                                setIsImgLoaded(true);
                            }}
                        />
                    </div>
                ))}
            </div>
            {imgUrls.length > 1 && (
                <>
                    <div className="absolute transform -translate-y-1/2 top-1/2 w-full px-2 justify-between z-10 flex">
                        <button
                            type="button"
                            className={`w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-3xl bg-primary-content/50 ${
                                currentImgIndex === 0 &&
                                "opacity-0 cursor-default"
                            }`}
                            onClick={() => prevImage()}
                            disabled={prevButtonDisabled}
                        >
                            <GoChevronLeft className="w-3/4 h-3/4" />
                        </button>
                        <button
                            className={`w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-3xl bg-primary-content/50 ${
                                currentImgIndex === imgUrls.length - 1 &&
                                "opacity-0 cursor-default"
                            }`}
                            type="button"
                            onClick={nextImage}
                            disabled={nextButtonDisabled}
                        >
                            <GoChevronRight className="w-3/4 h-3/4" />
                        </button>
                    </div>
                    <CarouselDots
                        imgUrls={imgUrls}
                        currentIndex={currentImgIndex}
                    />
                </>
            )}
        </div>
    );
};

export default Carousel;
