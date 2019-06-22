import CreateElementTool from "./CreateElementTool";
import DeleteElementTool from "./DeleteElementTool";

import { Elements } from "../elements";

const gTools = {};
export const registerTool = (toolName, tool) => {
    gTools[toolName] = tool;
};

export const getTool = toolName => {
    return gTools[toolName];
};

registerTool(Elements.Line, new CreateElementTool());
registerTool(Elements.Rect, new CreateElementTool());
registerTool(Elements.Delete, new DeleteElementTool());
