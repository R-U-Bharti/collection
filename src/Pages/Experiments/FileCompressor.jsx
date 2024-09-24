const FileCompressor = () => {
    
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file?.size > (1 * 1024 * 1024)) { // > 1 MB
            try {
                const resizedFile = await resizeFile(file);
                console.log(`Resized file of size ${file?.size / (1024 * 1024)}MB to ${resizedFile?.size / (1024 * 1024)}MB`);
            } catch (error) {
                console.error('Error resizing file:', error);
            }
        } else {
            console.log("No need of Compression.")
        }
    };

    const resizeFile = async (file) => {
        if (file.type.startsWith('image/')) {
            return resizeImage(file);
        } else {
            return truncateFile(file);
        }
    };

    const resizeImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 800; // Set your maximum width here
                    const maxHeight = 600; // Set your maximum height here
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width *= ratio;
                        height *= ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                    }, 'image/jpeg');
                };
                img.src = event.target.result;
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const truncateFile = (file) => {
        return new Promise((resolve, reject) => {
            const maxSize = 5 * 1024 * 1024; // 5 MB
            if (file.size <= maxSize) {
                resolve(file);
            } else {
                const truncatedFile = file.slice(0, maxSize, file.type);
                resolve(truncatedFile);
            }
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default FileCompressor;