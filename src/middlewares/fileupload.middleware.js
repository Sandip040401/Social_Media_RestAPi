
// Import Multer
import multer from "multer";


// Configure storage with fileName and location

    const storage = multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, './uploads/');
        },
        filename: (req, file, cb) => { 
            cb(null, file.originalname);  
    
        },
    });



export const upload = multer({storage: storage});