export interface ApiResponse<T> {
  data: T;
}

export interface Video {
  caption: string;
  video: string;
  thumbnail: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  user: User;
  $databaseId: string;
  $collectionId: string;
}

export interface User {
  auth_id: string;
  avatar: string;
  bio: string;
  full_name: string;
  is_verified: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  video?: Video[];
}
