type CarouselProps = {
    fileUrl: string;
};

const Carousel = ({ fileUrl }: CarouselProps) => {
    return (
        <div className="carousel-item w-full">
            <img
                src={fileUrl}
                className="w-full object-contain"
                alt="Tailwind CSS Carousel component"
            />
        </div>
    );
};

export default Carousel;
