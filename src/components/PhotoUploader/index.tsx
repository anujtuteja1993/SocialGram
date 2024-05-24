//Need to implement scrolling with buttons for Carousel and Separating the carousel component.

import { PhotoIcon } from "@heroicons/react/24/outline";
import { SetStateAction, useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import Carousel from "../Carousel/Index";
import Resizer from "react-image-file-resizer";

type PhotoUploaderProps = {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
};

const resizeFile = (file: File) =>
    new Promise<any>((resolve) => {
        Resizer.imageFileResizer(
            file,
            2000,
            2000,
            "JPEG",
            40,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });

const PhotoUploader = ({ files, setFiles }: PhotoUploaderProps) => {
    const [fileUrl, setFileUrl] = useState<string[]>([]);

    const onDrop = useCallback(
        async (acceptedFiles: FileWithPath[]) => {
            const filesTobeUploaded: FileWithPath[] = [];
            const newArray: SetStateAction<string[]> = [];
            for (let i = 0; i < acceptedFiles.length; i++) {
                const image: File = await resizeFile(acceptedFiles[i]);
                filesTobeUploaded.push(image);
                newArray.push(URL.createObjectURL(image));
            }
            // acceptedFiles.forEach((item) => {
            //     newArray.push(URL.createObjectURL(item));
            // });
            setFiles(filesTobeUploaded);
            setFileUrl(newArray);
        },
        [files]
    );

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        // isDragActive
    } = useDropzone({
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
                        {/* {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : ( */}
                        <p>Drag Photos here or click to Browse</p>
                        {/* )} */}
                    </div>
                ) : (
                    <>
                        <Carousel imgUrls={fileUrl} />
                    </>
                )}
            </div>
        </>
    );
};

export default PhotoUploader;
