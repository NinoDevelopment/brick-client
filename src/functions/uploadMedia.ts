import axios from "axios";
import { API_MEDIA_UPLOAD } from "@/constants/api";
import { getAdminKey } from "@/functions/getKey";
import { getBrowserApiLink } from "@/functions/getBrowserApiLink";

export type MediaEntity = "items" | "gallery" | "categories";

export const uploadMediaFiles = async (
  entity: MediaEntity,
  id: string,
  files: File[],
): Promise<string[]> => {
  if (!files.length) return [];

  const data = new FormData();
  data.append("entity", entity);
  data.append("id", id);
  for (const file of files) {
    data.append("files", file);
  }

  const response = await axios.post<{ urls: string[] }>(
    `${getBrowserApiLink()}${API_MEDIA_UPLOAD}`,
    data,
    {
      headers: {
        Authorization: getAdminKey() ?? "",
      },
    },
  );

  return response.data.urls ?? [];
};

export const resolveEntityImages = async (
  entity: MediaEntity,
  id: string,
  previews: string[],
  pendingFiles: File[],
): Promise<string[]> => {
  const uploaded = await uploadMediaFiles(entity, id, pendingFiles);
  if (uploaded.length !== pendingFiles.length) {
    throw new Error("Не все файлы загружены");
  }
  let uploadIndex = 0;
  return previews
    .map((preview) => {
      if (preview.startsWith("blob:")) {
        return uploaded[uploadIndex++];
      }
      return preview;
    })
    .filter(Boolean);
};
