export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect."
    
    return err;
}


// export const imageUpload = async (images) => {
//     let imgArr = [];
//     for(const item of images){
//         const formData = new FormData()

//         if(item.camera){
//             formData.append("file", item.camera)
//         }else{
//             formData.append("file", item)
//         }
        
//         // formData.append("upload_preset", "ml_default")
//         formData.append("cloud_name", "dvjzqcfup")

//         const res = await fetch("cloudinary://934771764244368:Dty1HmgM_z9VjFK1Tyf-oE8Mc2M@dvjzqcfup", {
//             method: "POST",
//             body: formData
//         })
        
//         const data = await res.json()
//         imgArr.push({public_id: data.public_id, url: data.secure_url})
//     }
//     return imgArr;
// }

// export const imageUpload = async (images) => {
//     let imgArr = [];
//     const cloudName = "dvjzqcfup";
//     const apiKey = "934771764244368";
//     const uploadPreset = "Dty1HmgM_z9VjFK1Tyf-oE8Mc2M";  // Replace with your actual upload preset

//     for (const item of images) {
//         const formData = new FormData();

//         if (item.camera) {
//             formData.append("file", item.camera);
//         } else {
//             formData.append("file", item);
//         }

//         formData.append("upload_preset", uploadPreset);

//         const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//             method: "POST",
//             body: formData
//         });

//         const data = await res.json();
//         imgArr.push({ public_id: data.public_id, url: data.secure_url });
//     }
//     return imgArr;
// };


export const imageUpload = async (images) => {
    let imgArr = [];
    const cloudName = "dvjzqcfup";
    const apiKey = "934771764244368";
    const unsignedUploadPreset = "jpjw6kic";  

    for (const item of images) {
        const formData = new FormData();

        if (item.camera) {
            formData.append("file", item.camera);
        } else {
            formData.append("file", item);
        }

        formData.append("upload_preset", unsignedUploadPreset);
        formData.append("unsigned", "true"); 

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
        console.log(data.secure_url);
    }
    return imgArr;
};
