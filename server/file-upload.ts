import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { storage } from './storage';

// Ensure upload directories exist
const uploadDir = 'uploads';
const profileImagesDir = path.join(uploadDir, 'profile-images');
const cvDir = path.join(uploadDir, 'cvs');
const documentsDir = path.join(uploadDir, 'documents');

async function ensureDirectories() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
  
  try {
    await fs.access(profileImagesDir);
  } catch {
    await fs.mkdir(profileImagesDir, { recursive: true });
  }
  
  try {
    await fs.access(cvDir);
  } catch {
    await fs.mkdir(cvDir, { recursive: true });
  }
  
  try {
    await fs.access(documentsDir);
  } catch {
    await fs.mkdir(documentsDir, { recursive: true });
  }
}

// Initialize directories
ensureDirectories();

// Configure multer storage
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = uploadDir;
    
    if (file.fieldname === 'profileImage') {
      dir = profileImagesDir;
    } else if (file.fieldname === 'cv') {
      dir = cvDir;
    } else if (file.fieldname === 'document') {
      dir = documentsDir;
    }
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const userId = req.user?.claims?.sub || 'anonymous';
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${userId}_${timestamp}${ext}`;
    cb(null, filename);
  }
});

// File filter for different types
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.fieldname === 'profileImage') {
    // Only allow image files for profile pictures
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for profile pictures'), false);
    }
  } else if (file.fieldname === 'cv') {
    // Allow PDF and DOC files for CVs
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed for CVs'), false);
    }
  } else {
    // Allow various document types for general documents
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
};

export const upload = multer({
  storage: storage_config,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files per request
  }
});

// Save file info to database
export async function saveFileInfo(userId: string, file: Express.Multer.File, uploadType: string) {
  try {
    return await storage.createUpload({
      userId,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      uploadPath: file.path,
      uploadType
    });
  } catch (error) {
    console.error('Error saving file info:', error);
    throw error;
  }
}

// Get user's uploaded files
export async function getUserFiles(userId: string, uploadType?: string) {
  try {
    return await storage.getUserUploads(userId, uploadType);
  } catch (error) {
    console.error('Error getting user files:', error);
    throw error;
  }
}

// Delete file
export async function deleteFile(userId: string, fileId: number) {
  try {
    const file = await storage.getUpload(fileId);
    if (!file || file.userId !== userId) {
      throw new Error('File not found or access denied');
    }
    
    // Delete physical file
    try {
      await fs.unlink(file.uploadPath);
    } catch (error) {
      console.error('Error deleting physical file:', error);
    }
    
    // Delete from database
    await storage.deleteUpload(fileId);
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}