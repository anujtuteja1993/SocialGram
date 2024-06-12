import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

type CarouselDotsProps = {
    imgUrls: string[];
    currentIndex: number;
};

const CarouselDots = ({ imgUrls, currentIndex }: CarouselDotsProps) => {
    return (
        <div className="absolute flex bottom-4 z-10 w-full justify-center">
            <div className="flex justify-center bg-primary-content/50 p-1 rounded-xl">
                {imgUrls.map((imgUrl, i) =>
                    currentIndex === i ? (
                        <GoDotFill key={imgUrl} />
                    ) : (
                        <GoDot key={imgUrl} />
                    )
                )}
            </div>
        </div>
    );
};

export default CarouselDots;
