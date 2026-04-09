export interface Event {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  expiry_date: string;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
