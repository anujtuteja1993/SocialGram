//Need to implement scrolling with buttons for Carousel and Separating the carousel component.

import { PhotoIcon } from "@heroicons/react/24/outline";
import { SetStateAction, useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import Carousel from "../Carousel/Index";

type PhotoUploaderProps = {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
};

const PhotoUploader = ({ files, setFiles }: PhotoUploaderProps) => {
    const [fileUrl, setFileUrl] = useState<string[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFiles(acceptedFiles);
            const newArray: SetStateAction<string[]> = [];
            acceptedFiles.forEach((item) => {
                newArray.push(URL.createObjectURL(item));
            });
            setFileUrl(newArray);
        },
        [files]
    );

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
        useDropzone({
            onDrop,
        });

    return (
        <>
            <div className="w-full inline-flex rounded-box aspect-[4/5] md:h-[650px]">
                {acceptedFiles.length == 0 ? (
                    <div
                        className="flex flex-col gap-4 w-full items-center justify-center border-[1px] rounded-box border-primary-content"
                        {...getRootProps()}
                    >
                        <PhotoIcon className="h-[50px] w-[50px]" />
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag Photos here or click to Browse</p>
                        )}
                    </div>
                ) : (
                    <div className="w-full carousel border-[1px] rounded-box border-primary-content">
                        {fileUrl.map((fileUrl, i) => (
                            <Carousel fileUrl={fileUrl} key={i} id={i + 1} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PhotoUploader;
