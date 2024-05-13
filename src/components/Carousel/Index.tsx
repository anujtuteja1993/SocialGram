type CarouselProps = {
    imgUrls: string[];
};

const Carousel = ({ imgUrls }: CarouselProps) => {
    return (
        <div className="w-full carousel border-[1px] rounded-box border-primary-content">
            {imgUrls.map((imgUrl, i) => (
                <div
                    id={"img" + (i + 1)}
                    key={i}
                    className="carousel-item w-full"
                >
                    <img
                        src={imgUrl}
                        className="w-full object-contain"
                        alt="Image"
                    />
                </div>
            ))}
        </div>
    );
};

export default Carousel;
