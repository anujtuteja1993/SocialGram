import { useState } from "react";

type CarouselProps = {
    imgUrls: string[];
};

const Carousel = ({ imgUrls }: CarouselProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    console.log(isImgLoaded);

    return (
        <div className="w-full carousel border-[1px] aspect-[4/5] rounded-box border-primary-content">
            {imgUrls.map((imgUrl, i) => (
                <>
                    {!isImgLoaded && (
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
                    />
                </>
            ))}
        </div>
    );
};

export default Carousel;
