export type AnimalGroup = "mammal" | "bird" | "reptile" | "amphibian" | "fish";

export type Habitat = "forest" | "desert" | "ocean" | "freshwater" | "sky";

export type Diet = "carnivore" | "herbivore";

export type Color = "black" | "white" | "brown" | "gray" | "red";

export type Capabilities = {
  canFly: boolean;
  canSwim: boolean;
  canRun: boolean;
};

export type SizeCategory = "tiny" | "small" | "medium" | "large" | "giant";

export type SocialStructure = "solitary" | "pair";

export type Animal = {
  id: string;
  Name: string;
  group: AnimalGroup;
  colors: Color[];
  habitats: Habitat[];
  diet: Diet;
  socialStructure: SocialStructure;
  capabilities: Capabilities;
};

export const eagle: Animal = {
  id: "bird1",
  Name: "Eagle",
  group: "bird",
  colors: ["white", "brown"],
  habitats: ["forest", "freshwater"],
  diet: "carnivore",
  socialStructure: "pair",
  capabilities: {
    canFly: true,
    canSwim: false,
    canRun: false,
  },
};

export const cheetah: Animal = {
  id: "chetaah1",
  Name: "Cheetah",
  group: "mammal",
  colors: ["brown"],
  habitats: ["desert"],
  diet: "carnivore",
  socialStructure: "solitary",
  capabilities: {
    canFly: false,
    canSwim: false,
    canRun: true,
  },
};
