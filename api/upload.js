import { service,upload } from "./service";
export function  uploadVideo(option){ 
   option.url="upload/evidenceFile";
   return upload(option)
}
export function  uploadImage(option){ 
   option.url="upload/evidencePhoto";
   return upload(option)
}
export function  endPhoto(option){ 
  option.url="upload/endPhoto";
  return upload(option)
}
