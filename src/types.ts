export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface MissionPoint {
  number: number;
  text: string;
}

export interface AcademicAspect {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
  colorClass: string;
}

export interface Extracurricular {
  id: string;
  title: string;
  description: string;
  schedule: string;
  iconName: string;
  colorClass: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'kegiatan' | 'sarana' | 'prestasi';
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'Pengumuman' | 'Berita' | 'Agenda';
  isImportant?: boolean;
}

export interface RegistrationInput {
  childName: string;
  nickname: string;
  birthPlace: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan' | '';
  religion: string;
  fatherName: string;
  motherName: string;
  parentJob: string;
  whatsappNumber: string;
  notes?: string;
}

export interface RegistrationRecord extends RegistrationInput {
  id: string;
  registrationDate: string;
  status: 'Menunggu Verifikasi' | 'Diterima' | 'Hubungi Admin';
  registrationNumber: string;
}
