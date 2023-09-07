// Import { debug } from 'console';

// export class FilesInterceptor {
//   constructor() {
//     debug('instantiated');
//   }

//   singleFileStore(fileName: string) {
//     debug('called multer');

//     const storage = multer.diskStorage({
//       destination: '/uploads',
//       fileName(req, file, callback) {
//         const fileName = 'avatar';
//         debug('File', file);
//         callback(null, file.originalname);
//       },
//     });
//     const upload = multer({ dest: 'uploads/' });
//     return upload.single(fileName);
//   }
// }
