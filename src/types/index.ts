export type IntroState =
  | 'INTRO_PLAYING'
  | 'INTRO_ENTERING_SCREEN'
  | 'INTRO_REVEALING_HOME'
  | 'INTRO_COMPLETE';

export type SectionId = 'home' | 'events' | 'gallery' | 'contact';

export interface NavItem {
  name: string;
  id: SectionId;
}

export interface FilmItem {
  src: string;
  number: string;
  title: string;
}

export interface EventCardProps {
  title: string;
  description: string;
  entryFee: string;
  image?: string;
  highlighted?: boolean;
  registrationPath?: string;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  entryFee: string;
  image: string;
  registrationPath: string;
}
