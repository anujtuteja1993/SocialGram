import { useState } from "react";
import { Blurhash } from "react-blurhash";

type CarouselProps = {
    imgUrls: string[];
    blurHashes?: string[];
};

const Carousel = ({ imgUrls, blurHashes }: CarouselProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    // console.log(blurHashes);
    // const [isLoaded, setLoaded] = useState(false);
    // const [isLoadStarted, setLoadStarted] = useState(false);

    // const handleLoad = () => {
    //     console.log("loaded");
    //     setLoaded(true);
    // };

    // const handleLoadStarted = () => {
    //     console.log("Started: ");
    //     setLoadStarted(true);
    // };

    return (
        <div className="w-full carousel border-[1px] aspect-[4/5] rounded-box border-primary-content">
            {!isImgLoaded && blurHashes && (
                <div className="top-0 bottom-0 w-full overflow-clip">
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
                <>
                    <img
                        id={"img" + (i + 1)}
                        key={i}
                        src={imgUrl}
                        className={`w-full carousel-item object-fill ${
                            !isImgLoaded ? "hidden" : ""
                        }`}
                        alt="Image"
                        onLoad={() => {
                            setIsImgLoaded(true);
                        }}
                    />
                    {/* {!isImgLoaded && (
                        <div className="carousel-item skeleton w-full" />
                    )}
                    <img
                        id={"img" + (i + 1)}
                        key={i}
                        src={imgUrl}
                        className={`w-full carousel-item object-contain ${
                            !isImgLoaded ? "opacity-0" : ""
                        }`}
                        alt="Image"
                        onLoad={() => {
                            setIsImgLoaded(true);
                        }}
                    /> */}
                </>
            ))}
        </div>
    );
};

export default Carousel;
