import { useCallback, useEffect, useRef, useState } from "react";

type AddFilesOptions = {
  max?: number;
  replace?: boolean;
};

const revokeIfBlob = (preview: string) => {
  if (preview.startsWith("blob:")) {
    URL.revokeObjectURL(preview);
  }
};

export const useEntityImages = (initialImages: string[] = []) => {
  const [previews, setPreviews] = useState<string[]>(initialImages.filter(Boolean));
  const filesByPreview = useRef(new Map<string, File>());

  const clearFiles = useCallback((values: string[]) => {
    for (const preview of values) {
      filesByPreview.current.delete(preview);
      revokeIfBlob(preview);
    }
  }, []);

  const sync = useCallback(
    (images: string[]) => {
      clearFiles(Array.from(filesByPreview.current.keys()));
      filesByPreview.current = new Map();
      setPreviews(images.filter(Boolean));
    },
    [clearFiles],
  );

  useEffect(() => {
    return () => {
      clearFiles(Array.from(filesByPreview.current.keys()));
    };
  }, [clearFiles]);

  const addFiles = useCallback(
    (fileList: FileList | File[] | null, options?: AddFilesOptions) => {
      if (!fileList) return;
      const incoming = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
      if (!incoming.length) return;

      setPreviews((current) => {
        const base = options?.replace ? [] : current;
        if (options?.replace) {
          clearFiles(current);
        }
        const room = options?.max === undefined ? incoming.length : Math.max(0, options.max - base.length);
        const selected = incoming.slice(0, room);
        const next = [...base];
        for (const file of selected) {
          const preview = URL.createObjectURL(file);
          filesByPreview.current.set(preview, file);
          next.push(preview);
        }
        return next;
      });
    },
    [clearFiles],
  );

  const remove = useCallback((preview: string) => {
    filesByPreview.current.delete(preview);
    revokeIfBlob(preview);
    setPreviews((current) => current.filter((item) => item !== preview));
  }, []);

  const takePendingFiles = useCallback(
    () =>
      previews
        .map((preview) => filesByPreview.current.get(preview))
        .filter((file): file is File => Boolean(file)),
    [previews],
  );

  return {
    previews,
    addFiles,
    remove,
    sync,
    takePendingFiles,
  };
};
