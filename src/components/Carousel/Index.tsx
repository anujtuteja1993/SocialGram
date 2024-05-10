type CarouselProps = {
    fileUrl: string;
    id: number;
};

const Carousel = ({ fileUrl, id }: CarouselProps) => {
    return (
        <div id={"img" + id} className="carousel-item w-full">
            <img
                src={fileUrl}
                className="w-full object-contain"
                alt="Tailwind CSS Carousel component"
            />
        </div>
    );
};

export default Carousel;
