export type Person = {
  id: number;
  name: string;
  age: number;
  gender: GENDER;
  type: TYPE;
};
// imported with archs named import

export enum GENDER {
  male = "male",
  female = "female",
}

export enum TYPE {
  kid = "kid",
  women = "women",
  men = "men",
}
