export interface KwaboAttention {
  titleKey: string;
  descriptionKey: string;
}

export interface PhilosophyValue {
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
      titleKey: 'host.value1Title',
      descriptionKey: 'host.value1Desc',
    },
    {
      titleKey: 'host.value2Title',
      descriptionKey: 'host.value2Desc',
    },
    {
      titleKey: 'host.value3Title',
      descriptionKey: 'host.value3Desc',
    },
  ],
};

export const kwaboAttentions: KwaboAttention[] = [
  {
    titleKey: 'host.kwaboMessageTitle',
    descriptionKey: 'host.kwaboMessageDesc',
  },
  {
    titleKey: 'host.kwaboClimTitle',
    descriptionKey: 'host.kwaboClimDesc',
  },
  {
    titleKey: 'host.kwaboPanierTitle',
    descriptionKey: 'host.kwaboPanierDesc',
  },
  {
    titleKey: 'host.kwaboMotTitle',
    descriptionKey: 'host.kwaboMotDesc',
  },
];
