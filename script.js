import { filmsSet } from "./data/test-data.js";

const header = {
  view: "toolbar",
  css: "webix_dark",
  paddingX: 20,
  height: 50,
  cols: [
    {
      view: "label",
      label: "My App",
      gravity: 0.2,
      minWidth: 100,
      maxWidth: 150
    },
    {},
    {
      view: "button",
      type: "icon",
      icon: "wxi-user",
      label: "Profile",
      css: "webix_transparent",
      gravity: 0.2,
      minWidth: 100,
      maxWidth: 150,
      popup: "profile-popup"
    }
  ]
};

webix.ui({
  view: "popup",
  id: "profile-popup",
  body: {
    view: "list",
    data: [
      { id: "1", label: "Settings" },
      { id: "2", label: "Log out" }
    ],
    template: "#label#",
    autoheight: true
  }
});

const form = {
  view: "form",
  minWidth: 150,
  maxWidth: 250,
  elements: [
    { template: "EDIT FILMS", type: "section" },
    {
      view: "text",
      label: "Title"
    },
    {
      view: "text",
      label: "Year"
    },
    {
      view: "text",
      label: "Rating"
    },
    {
      view: "text",
      label: "Votes"
    },
    {
      margin: 20,
      cols: [
        { view: "button", label: "Add new", css: "webix_primary" },
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
  scrollX: false,
  autoConfig: true
};

const sideMenu = {
  css: "side-bar",
  minWidth: 150,
  width: 200,
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
  webix.ui({
    id: "layout",
    rows: [header, content, footer]
  });
});
