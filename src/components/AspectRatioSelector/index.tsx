import {
    TbRectangleVertical as AspectRatioDefaultOutline,
    TbRectangleVerticalFilled as AspectRatioDefaultSolid,
    TbRectangle as AspectRatioVideoOutline,
    TbRectangleFilled as AspectRatioVideoSolid,
    TbSquare as AspectRatioSquareOutline,
    TbSquareFilled as AspectRatioSquareSolid,
} from "react-icons/tb";

type AspectRatioSelectorProps = {
    aspectRatio: string;
    setAspectRatio: React.Dispatch<React.SetStateAction<string>>;
    onFieldChange: (aspectRatio: string) => void;
};

const AspectRatioSelector = ({
    aspectRatio,
    setAspectRatio,
    onFieldChange,
}: AspectRatioSelectorProps) => {
    return (
        <div className="flex gap-3 md:gap-5 items-center">
            <p className="text-md md:text-xl">Select the aspect ratio:</p>
            <button
                className="h-7 w-7"
                type="button"
                onClick={() => {
                    setAspectRatio("4/5");
                    onFieldChange("4/5");
                }}
            >
                {aspectRatio === "4/5" ? (
                    <AspectRatioDefaultSolid className="h-full w-full transition duration-200 hover:scale-110 active:scale-90" />
                ) : (
                    <AspectRatioDefaultOutline className="h-full w-full transition duration-200 hover:scale-110 active:scale-90" />
                )}
            </button>
            <button
                className="h-7 w-7"
                type="button"
                onClick={() => {
                    setAspectRatio("1/1");
                    onFieldChange("1/1");
                }}
            >
                {aspectRatio === "1/1" ? (
                    <AspectRatioSquareSolid className="h-full w-full transition duration-200 hover:scale-110 active:scale-90" />
                ) : (
                    <AspectRatioSquareOutline className="h-full w-full transition duration-200 hover:scale-110 active:scale-90" />
                )}
            </button>
            <button
                className="h-7 w-7"
                type="button"
                onClick={() => {
                    setAspectRatio("1.91/1");
                    onFieldChange("1.91/1");
                }}
            >
                {aspectRatio === "1.91/1" ? (
                    <AspectRatioVideoSolid className="h-full w-full transition duration-200 hover:scale-110 active:scale-90" />
                ) : (
                    <AspectRatioVideoOutline className="h-full w-full transition duration-200 hover:scale-110 active:scale-90" />
                )}
            </button>
        </div>
    );
};

export default AspectRatioSelector;
