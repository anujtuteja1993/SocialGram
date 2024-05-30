//Need to implement scrolling with buttons for Carousel and Separating the carousel component.

import { HiOutlinePhoto as PhotoIcon } from "react-icons/hi2";
import { SetStateAction, useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import Carousel from "../Carousel/Index";
import Resizer from "react-image-file-resizer";

type PhotoUploaderProps = {
    aspectRatio: string;
    imgUrls?: string[];
    blurHashes?: string[];
    onFieldChange: (files: File[]) => void;
    errored: Boolean;
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

const PhotoUploader = ({
    aspectRatio,
    imgUrls,
    blurHashes,
    onFieldChange,
    errored,
}: PhotoUploaderProps) => {
    const [fileUrl, setFileUrl] = useState<string[] | undefined>(imgUrls);
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(
        async (acceptedFiles: FileWithPath[]) => {
            const filesTobeUploaded: FileWithPath[] = [];
            const newArray: SetStateAction<string[]> = [];
            for (let i = 0; i < acceptedFiles.length; i++) {
                const image: File = await resizeFile(acceptedFiles[i]);
                filesTobeUploaded.push(image);
                newArray.push(URL.createObjectURL(image));
            }
            onFieldChange(filesTobeUploaded);
            setFileUrl(newArray);
            setFiles(filesTobeUploaded);
        },
        [files]
    );

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div
            className={`w-full flex rounded-box items-center justify-center ${
                errored ? "input-error" : ""
            }`}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            {fileUrl ? (
                <Carousel
                    imgUrls={fileUrl}
                    aspectRatio={aspectRatio}
                    blurHashes={blurHashes}
                />
            ) : (
                acceptedFiles.length == 0 && (
                    <div
                        className={`flex flex-col gap-4 w-full items-center justify-center border-[1px] transition-all duration-200 rounded-box border-primary-content${
                            errored ? "border-2 border-[#FE6F6F]" : ""
                        }`}
                        style={{ aspectRatio: `${aspectRatio}` }}
                    >
                        <PhotoIcon className="h-[50px] w-[50px]" />
                        <p className="hidden md:block">
                            Drag Photos here or click to Browse
                        </p>
                        <p className="md:hidden">Tap to Add Photos</p>
                    </div>
                )
            )}
        </div>
    );
};

export default PhotoUploader;
