import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 8,
            minFileCount: 4
        },
    })
        .onUploadComplete(async ({ file }) => {
            console.log("file url", file.url);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
