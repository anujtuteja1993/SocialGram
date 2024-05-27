import { useState } from "react";
import { Blurhash } from "react-blurhash";

type CarouselProps = {
    imgUrls: string[];
    blurHashes?: string[];
    aspectRatio?: string;
};

const Carousel = ({ imgUrls, blurHashes, aspectRatio }: CarouselProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);

    return (
        <div
            className="w-full carousel border-[1px] transition-all duration-200 rounded-box border-primary-content"
            style={{ aspectRatio: `${aspectRatio ? aspectRatio : "4/5"}` }}
        >
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
            ))}
        </div>
    );
};

export default Carousel;
