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
  minWidth: 150,
  maxWidth: 250,
  elements: [
    { template: "EDIT FILMS", type: "section" },
    {
      margin: 20,
      cols: [{ view: "label", label: "Title", width: 70 }, { view: "text" }]
    },
    {
      margin: 20,
      cols: [{ view: "label", label: "Year", width: 70 }, { view: "text" }]
    },
    {
      margin: 20,
      cols: [{ view: "label", label: "Rating", width: 70 }, { view: "text" }]
    },
    {
      margin: 20,
      cols: [{ view: "label", label: "Votes", width: 70 }, { view: "text" }]
    },
    {
      margin: 20,
      cols: [
        { view: "button", label: "Add new", css: "form-button--add" },
        { view: "button", label: "Clear" }
      ]
    },
    {}
  ]
};

const dataTable = {
  view: "datatable",
  minWidth: 540,
  data: filmsSet,
  autoConfig: true
};

const sideMenu = {
  css: "side-bar",
  minWidth: 100,
  rows: [
    {
      view: "list",
      template: "#title#",
      select: true,
      gravity: 0.7,
      minHeight: 400,
      scroll: false,
      borderless: true,
      css: "side-bar",
      data: [
        { id: 1, title: "Dashboard" },
        { id: 2, title: "Users" },
        { id: 3, title: "Products" },
        { id: 4, title: "Locations" }
      ]
    },
    {},
    {
      maxHeight: 40,
      borderless: false,
      css: "connection-status",
      template: "<span class=' webix_icon wxi-check'>Connected</span>"
    }
  ]
};

const content = {
  cols: [sideMenu, { view: "resizer" }, dataTable, form]
};

const footer = {
  css: "footer",
  template:
    "<span>The software is provided by <a href='https://docs.webix.com'>webix.com</a>. Allrights reseved (c)</span>",
  gravity: 0.1,
  maxHeight: 40
};

webix.ready(function() {
  webix
    .ui({
      id: "layout",
      rows: [header, content, footer]
    })
    .show();
});
