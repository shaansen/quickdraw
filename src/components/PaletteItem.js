import React from "react";
import "./PaletteItem.css";

const PaletteItem = ({ name, icon, enabled, tool, clickAction }) => (
    <button
        disabled={!enabled}
        className={"PaletteItem " + (name === tool ? "highlight" : "")}
        onClick={clickAction}
    >
        <img alt={name} src={icon} width="20" />
        <br />
        {name}
    </button>
);

export default PaletteItem;
