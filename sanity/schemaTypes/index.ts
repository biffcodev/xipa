import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { page } from "./page";
import { pillar } from "./pillar";
import { stat } from "./stat";
import { teamMember } from "./teamMember";
import { methodologyStep } from "./methodologyStep";
import { project } from "./project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homePage, page, project, teamMember, pillar, methodologyStep, stat],
};
