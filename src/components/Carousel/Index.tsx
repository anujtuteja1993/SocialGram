import { useState } from "react";

type CarouselProps = {
    imgUrls: string[];
};

const Carousel = ({ imgUrls }: CarouselProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    console.log(isImgLoaded);

    return (
        <div className="w-full carousel border-[1px] aspect-[4/5] rounded-box border-primary-content">
            {!isImgLoaded && (
                <div className="carousel-item skeleton w-full object-contain" />
            )}
            {imgUrls.map((imgUrl, i) => (
                <div
                    id={"img" + (i + 1)}
                    key={i}
                    className="carousel-item w-full"
                >
                    <img
                        src={imgUrl}
                        className={`w-full object-contain ${
                            isImgLoaded ? "" : "hidden"
                        }`}
                        alt="Image"
                        onLoad={() => setIsImgLoaded(true)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Carousel;
