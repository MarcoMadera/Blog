import { UploadTask } from "firebase/storage";
import { Dispatch, SetStateAction } from "react";

export interface IMicroMemory {
  microMemoryId?: string;
  microMemory?: string;
  date: number;
  img?: string;
}

export interface MicroMemoriesContext {
  allMicroMemories: IMicroMemory[];
  setAllMicroMemories: Dispatch<SetStateAction<IMicroMemory[]>>;
  timesLoadedMicroMemories: number;
  setTimesLoadedMicroMemories: Dispatch<SetStateAction<number>>;
  imgURL: string | null;
  setImgURL: Dispatch<SetStateAction<string | null>>;
  microMemory: string;
  setMicroMemory: Dispatch<SetStateAction<string>>;
  isSubmittingMicroMemory: boolean;
  setIsSubmittingMicroMemory: Dispatch<SetStateAction<boolean>>;
  task: UploadTask | null;
  setTask: Dispatch<SetStateAction<MicroMemoriesContext["task"]>>;
  microMemoryCount: number;
  setMicroMemoryCount: Dispatch<SetStateAction<number>>;
}

export interface UseMicroMemories {
  imgURL: MicroMemoriesContext["imgURL"];
  uploadImage: (files: FileList) => void;
  microMemory: MicroMemoriesContext["microMemory"];
  setMicroMemory: MicroMemoriesContext["setMicroMemory"];
  allMicroMemories: MicroMemoriesContext["allMicroMemories"];
  microMemoryCount: MicroMemoriesContext["microMemoryCount"];
  removeMicroMemory: (microMemoryId: string) => void;
  createMicroMemory: (microMemory: string) => Promise<void>;
  updateMicroMemories: ({
    isFirstTime,
  }: {
    isFirstTime: boolean;
  }) => Promise<void>;
  isSubmittingMicroMemory: MicroMemoriesContext["isSubmittingMicroMemory"];
  timesLoadedMicroMemories: MicroMemoriesContext["timesLoadedMicroMemories"];
  setIsSubmittingMicroMemory: MicroMemoriesContext["setIsSubmittingMicroMemory"];
  setTimesLoadedMicroMemories: MicroMemoriesContext["setTimesLoadedMicroMemories"];
}
