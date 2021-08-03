import { ObjectId } from "mongodb";

export interface MediaItem {
    _id: ObjectId;
    createdDate: string;
    uri: string;
    liveUri?: string;
}
