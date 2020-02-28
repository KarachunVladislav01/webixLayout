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
webix.ready(function() {
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
});

const form = {
  view: "form",
  id: "addFilmForm",
  minWidth: 150,
  maxWidth: 250,
  elements: [
    { template: "EDIT FILMS", type: "section" },
    {
      view: "text",
      label: "Title",
      name: "title",
      invalidMessage: "Must be filled"
    },
    {
      view: "text",
      label: "Year",
      name: "year",
      invalidMessage: "1970 - the current year"
    },
    {
      view: "text",
      label: "Rating",
      name: "rating",
      invalidMessage: "Number cannot be zero"
    },
    {
      view: "text",
      label: "Votes",
      name: "votes",
      invalidMessage: "must be > 100000"
    },
    {
      margin: 20,
      cols: [
        {
          view: "button",
          label: "Add new",
          css: "webix_primary",
          click: () => {
            const form = $$("addFilmForm");
            const isValid = form.validate();
            if (isValid) {
              const formData = form.getValues();
              $$("filmsDataTable").add(formData);
              webix.message({
                text: "Adding was successful",
                type: "success",
                expire: 2000
              });
              form.clear();
            } else {
              webix.message({
                text: "Invalid data",
                type: "error",
                expire: 2000
              });
            }
          }
        },
        {
          view: "button",
          label: "Clear",
          click: () => {
            confirmOfClearForm();
          }
        }
      ]
    },
    {}
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    year: value => {
      const now = new Date();
      console.log(value);
      return value > 1970 && value < now.getFullYear() && isNumber(value);
    },
    votes: value => {
      return value < 100000 && isNumber(value);
    },
    rating: value => {
      return value != 0 && isNumber(value);
    }
  }
};

const isNumber = value => !Number.isNaN(Number.parseInt(value));

const confirmOfClearForm = () => {
  webix
    .confirm({
      title: "Clear form",
      text: "Are you sure?"
    })
    .then(() => {
      const form = $$("addFilmForm");
      form.clear();
      form.clearValidation();
    });
};

const dataTable = {
  view: "datatable",
  id: "filmsDataTable",
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
