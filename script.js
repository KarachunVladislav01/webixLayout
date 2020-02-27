import { filmsSet } from "./data/test-data.js";

const header = {
  css: "header",
  paddingX: 20,
  height: 50,
  cols: [
    {
      view: "label",
      label: "My App",
      gravity: 0.2,
      minWidth: 200
    },
    {},
    {
      view: "button",
      type: "icon",
      icon: "mdi mdi-account",
      label: "Profile",
      gravity: 0.2,
      minWidth: 200
    }
  ]
};

const form = {
  view: "form",
  elements: [
    { cols: [{ view: "label", label: "Title" }, { view: "text" }] },
    { cols: [{ view: "label", label: "Year" }, { view: "text" }] },
    {
      cols: [{ view: "label", label: "Rating" }, { view: "text" }]
    },
    { cols: [{ view: "label", label: "Votes" }, { view: "text" }] },
    {},
    {
      cols: [
        { view: "button", label: "Add new" },
        { view: "button", label: "Clear" }
      ]
    }
  ]
};

const dataTable = {
  view: "datatable",
  minWidth: 540,
  data: filmsSet,
  autoConfig: true,
  autoheight: true
};

const sideMenu = {
  rows: [
    {
      view: "list",
      template: "#title#",
      select: true,
      data: [
        { id: 1, title: "Dashboard" },
        { id: 2, title: "Users" },
        { id: 3, title: "Products" },
        { id: 4, title: "Locations" }
      ]
    },
    {},
    { view: "label", label: "Connected" }
  ]
};

const content = {
  cols: [sideMenu, { view: "resizer" }, dataTable, form]
};

const footer = {
  template:
    "The software is provided by https://docs.webix.com. Allrights reseved (c)",
  height: 20
};

webix.ready(function() {
  webix
    .ui({
      id: "layout",
      rows: [header, content, footer]
    })
    .show();
});
