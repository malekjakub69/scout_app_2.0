export interface IMeet {
  id: number;
  key: number;
  troop_id: number;
  date: Date;
  type:  typeof MeetType;
  topic: string;
}

export enum MeetType {
  "vyprava_1" = "Jednodení výprava",
  "jina_akce" = "Jiná akce",
  "odd" = "Oddílovka",
  "dr" = "Družinovka",
  "vyprava_n" = "Výprava vícedenní"
}