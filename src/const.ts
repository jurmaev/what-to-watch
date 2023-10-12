export const AppData = { filmName: 'The Grand Budapest Hotel', genre: 'Drama', date: 2014 };

export const Movies = [
  { title: 'Fantastic Beasts: The Crimes of Grindelwald', imgLink: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg' },
  { title: 'Bohemian Rhapsody', imgLink: 'img/bohemian-rhapsody.jpg' },
  { title: 'Macbeth', imgLink: 'img/macbeth.jpg' },
  { title: 'Aviator', imgLink: 'img/aviator.jpg' },
  { title: 'We need to talk about Kevin', imgLink: 'img/we-need-to-talk-about-kevin.jpg' },
  { title: 'What We Do in the Shadows', imgLink: 'img/what-we-do-in-the-shadows.jpg' },
  { title: 'Revenant', imgLink: 'img/revenant.jpg' },
  { title: 'Johnny English', imgLink: 'img/johnny-english.jpg' },
  { title: 'Shutter Island', imgLink: 'img/shutter-island.jpg' },
  { title: 'Pulp Fiction', imgLink: 'img/pulp-fiction.jpg' },
  { title: 'No Country for Old Men', imgLink: 'img/no-country-for-old-men.jpg' },
  { title: 'Snatch', imgLink: 'img/snatch.jpg' },
  { title: 'Moonrise Kingdom', imgLink: 'img/moonrise-kingdom.jpg' },
  { title: 'Seven Years in Tibet', imgLink: 'img/seven-years-in-tibet.jpg' },
  { title: 'Midnight Special', imgLink: 'img/midnight-special.jpg' },
  { title: 'War of the Worlds', imgLink: 'img/war-of-the-worlds.jpg' },
  { title: 'Dardjeeling Limited', imgLink: 'img/dardjeeling-limited.jpg' },
  { title: 'Orlando', imgLink: 'img/orlando.jpg' },
  { title: 'Mindhunter', imgLink: 'img/mindhunter.jpg' },
];

export enum AppRoutes {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Movie = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id'
}
