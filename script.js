import { usersInformation } from "./data/users.js";
import { products } from "./data/products.js";

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

const saveFilm = () => {
  const form = $$("addFilmForm");
  const dataTable = $$("filmsDataTable");
  const isValid = form.validate();
  if (isValid) {
    const formData = form.getValues();
    if (formData.id) {
      dataTable.updateItem(formData.id, formData);
      dataTable.clearSelection();
    } else {
      dataTable.add(formData);
    }
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
};

const form = {
  view: "form",
  id: "addFilmForm",
  gravity: 1,
  minWidth: 180,
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
          click: saveFilm
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
      return value > 1970 && value < now.getFullYear() && isNumber(value);
    },
    votes: value => {
      return Number.parseFloat(value) < 100000 && isNumber(value);
    },
    rating: value => {
      return Number.parseFloat(value) != 0 && isNumber(value);
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

const valuesToForm = id => {
  const values = $$("filmsDataTable").getItem(id);
  $$("addFilmForm").setValues(values);
};

webix.DataStore.prototype.sorting.as.sortByFloat = (firstNum, secondNum) => {
  const first = Number.parseFloat(firstNum);
  const second = Number.parseFloat(secondNum);
  return first > second ? 1 : first < second ? -1 : 0;
};

const dataTable = {
  view: "datatable",
  id: "filmsDataTable",
  minWidth: 580,
  fillspace: true,
  select: true,
  hover: "row--hover",
  url: "./data/data.js",
  columns: [
    { id: "rank", header: "", sort: "int", width: 40, css: "column--id" },
    {
      id: "title",
      header: [{ text: "Film Title" }, { content: "textFilter" }],
      sort: "string",
      adjust: true,
      fillspace: true
    },
    {
      id: "year",
      header: [{ text: "Released" }, { content: "selectFilter" }],
      sort: "date",
      format: webix.i18n.dateFormatStr,
      adjust: true
    },
    {
      id: "votes",
      header: [{ text: "Votes" }, { content: "textFilter" }],
      sort: "sortByFloat",
      adjust: true
    },
    {
      id: "rating",
      header: [{ text: "Rating" }, { content: "textFilter" }],
      sort: "string",
      adjust: true
    },
    {
      header: "",
      template: "<span class='remove-btn webix_icon wxi-trash'></span>"
    }
  ],

  scrollX: false,
  on: { onAfterSelect: valuesToForm },
  onClick: {
    "remove-btn": function(e, id) {
      this.remove(id);
      return false;
    }
  }
};
const changeListColors = () => {
  debugger;
  const usersList = [
    ...document.getElementsByClassName("users-list--flex")
  ].slice(0, 5);
  usersList.forEach(
    element => (element.parentElement.style.backgroundColor = randomColor())
  );
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
      on: {
        onAfterSelect: function(id) {
          $$(id).show();
        }
      },
      data: [
        { id: "dashboard", title: "Dashboard" },
        { id: "users", title: "Users" },
        { id: "products", title: "Products" },
        { id: "locations", title: "Locations" }
      ]
    },
    {},
    {
      maxHeight: 40,
      borderless: false,
      css: "connection-status",
      template: "<span class='webix_icon wxi-check'>Connected</span>"
    }
  ]
};

const filterUsersList = () => {
  const value = $$("listFilter")
    .getValue()
    .toLowerCase();
  $$("usersList").filter(function(obj) {
    return (
      obj.name.toLowerCase().indexOf(value) !== -1 ||
      obj.country.toLowerCase().indexOf(value) !== -1
    );
  });
};

const randomColor = () => {
  let colorArray = [];
  for (let i = 0; i < 3; i++) {
    colorArray.push(Math.floor(Math.random() * (255 - 0) + 0));
  }
  return `rgb(${colorArray.join(",")}, 0.2)`;
};

const usersList = {
  rows: [
    {
      view: "toolbar",
      elements: [
        {
          view: "text",
          id: "listFilter",
          on: { onTimedKeyPress: filterUsersList }
        },
        {
          view: "button",
          label: "Sort asc",
          gravity: 0.2,
          css: "webix_primary",
          click: () => {
            $$("usersList").sort("name", "asc");
          }
        },
        {
          view: "button",
          label: "Sort Desc",
          gravity: 0.2,
          css: "webix_primary",
          click: () => {
            $$("usersList").sort("name", "desc");
          }
        }
      ]
    },
    {
      view: "list",
      id: "usersList",
      template:
        "<div class= 'users-list--flex'><span>#name# from #country#</span>{common.deleteIcon}</div>",
      type: {
        // userInfo: function(obj) {
        //   `<span>${obj.name} from ${obj.country}</span>`;
        // },
        deleteIcon: "<span class='remove-btn webix_icon wxi-close'></span>"
      },
      onClick: {
        "remove-btn": function(e, id) {
          this.remove(id);
          return false;
        }
      },
      on: { onAfterRender: changeListColors },
      data: webix.copy(usersInformation)
    }
  ]
};

const usesDiagram = {
  view: "chart",
  type: "bar",
  value: "#age#",
  xAxis: {
    title: "Age",
    template: "#age#"
  },
  data: usersInformation
};

const users = {
  id: "users",
  rows: [usersList, usesDiagram]
};

const productsTable = {
  view: "treetable",
  id: "products",
  select: true,

  columns: [
    { id: "id", header: "", adjust: true },
    {
      id: "title",
      header: "Title",
      template: "{common.treetable()} #title#",
      adjust: true,
      fillspace: true
    },
    { id: "price", header: "Price", adjust: true }
  ],
  ready: function() {
    this.openAll();
  },
  data: webix.copy(products)
};

const dashboard = { id: "dashboard", cols: [dataTable, form] };

const multiView = {
  view: "multiview",
  cells: [dashboard, users, productsTable]
};

const content = {
  cols: [sideMenu, { view: "resizer" }, multiView]
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
    rows: [header, content, footer]
  });
});
