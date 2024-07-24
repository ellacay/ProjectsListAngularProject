import { ProjectData } from "./data";

export interface HeaderData {
  headerTitle: string;
  headerJSName: keyof ProjectData;
}
