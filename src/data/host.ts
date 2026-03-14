export interface KwaboAttention {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface PhilosophyValue {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface HostProfile {
  nameKey: string;
  roleKey: string;
  storyKey: string;
  philosophyTitleKey: string;
  philosophyDescKey: string;
  philosophyValues: PhilosophyValue[];
}

export const hostProfile: HostProfile = {
  nameKey: 'host.name',
  roleKey: 'host.role',
  storyKey: 'host.introStory',
  philosophyTitleKey: 'host.philosophyTitle',
  philosophyDescKey: 'host.philosophyDesc',
  philosophyValues: [
    {
      icon: '🎯',
      titleKey: 'host.value1Title',
      descriptionKey: 'host.value1Desc',
    },
    {
      icon: '💬',
      titleKey: 'host.value2Title',
      descriptionKey: 'host.value2Desc',
    },
    {
      icon: '🔍',
      titleKey: 'host.value3Title',
      descriptionKey: 'host.value3Desc',
    },
  ],
};

export const kwaboAttentions: KwaboAttention[] = [
  {
    icon: '📱',
    titleKey: 'host.kwaboMessageTitle',
    descriptionKey: 'host.kwaboMessageDesc',
  },
  {
    icon: '❄️',
    titleKey: 'host.kwaboClimTitle',
    descriptionKey: 'host.kwaboClimDesc',
  },
  {
    icon: '🧺',
    titleKey: 'host.kwaboPanierTitle',
    descriptionKey: 'host.kwaboPanierDesc',
  },
  {
    icon: '✍️',
    titleKey: 'host.kwaboMotTitle',
    descriptionKey: 'host.kwaboMotDesc',
  },
];
