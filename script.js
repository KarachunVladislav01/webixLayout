const filmCategoriesCollection = new webix.DataCollection({
  url: "./data/categories.js"
});

const usersCollection = new webix.DataCollection({
  url: "./data/users.js",
  scheme: {
    $init: function(obj) {
      const age = obj.age;
      if (age < 26) obj.$css = "user-list--color";
    }
  }
});

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
      view: "richselect",
      label: "Category",
      options: filmCategoriesCollection
    },
    {
      margin: 20,
      cols: [
        {
          view: "button",
          label: "Add new",
          css: "webix_primary",
          click: function() {
            this.getFormView().save();
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const filterOptions = {
  view: "tabbar",
  id: "selector",
  options: [
    { id: "all", value: "All" },
    { id: "old", value: "Old" },
    { id: "modern", value: "Modern" },
    { id: "new", value: "New" }
  ],
  on: {
    onChange: function() {
      $$("filmsDataTable").filterByAll();
    }
  }
};

const dataTable = {
  view: "datatable",
  id: "filmsDataTable",
  minWidth: 580,
  fillspace: true,
  select: true,
  hover: "row--hover",
  url: "./data/data.js",
  scheme: {
    $init: function(obj) {
      obj.votes = parseFloat(obj.votes.replace(",", "."));
      obj.rating = parseFloat(obj.rating.replace(",", "."));
      obj.categoryId = getRandomInt(1, 5);
    }
  },
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
      id: "categoryId",
      header: [{ text: "Category" }, { content: "selectFilter" }],
      sort: "string",
      collection: filmCategoriesCollection,
      adjust: true
    },
    {
      id: "votes",
      header: [{ text: "Votes" }, { content: "textFilter" }],
      sort: "int",
      adjust: true
    },
    {
      id: "rating",
      header: [{ text: "Rating" }, { content: "textFilter" }],
      sort: "int",
      adjust: true
    },
    {
      id: "year",
      header: { text: "Released" },
      sort: "date",
      format: webix.i18n.dateFormatStr,
      adjust: true
    },
    {
      header: "",
      template: "<span class='remove-btn webix_icon wxi-trash'></span>"
    }
  ],
  scrollX: false,
  onClick: {
    "remove-btn": function(e, id) {
      this.remove(id);
      return false;
    }
  },
  on: {
    onAfterAdd: function(id) {
      this.showItem(id);
    }
  },
  ready: function() {
    $$("addFilmForm").bind($$("filmsDataTable"));
    $$("filmsDataTable").registerFilter(
      $$("selector"),
      {
        columnId: "year",
        compare: function(value, filter, item) {
          switch (filter) {
            case "old":
              return value < 2000;
              break;
            case "new":
              return value >= 2000;
              break;
            case "modern":
              return value >= 1910 && value <= 1960;
              break;
            case "all":
              return value;
              break;
            default:
              webix.message({ type: "error", text: "No filter" });
          }
        }
      },
      {
        getValue: function(node) {
          return node.getValue();
        },
        setValue: function(node, value) {
          node.setValue(value);
        }
      }
    );
  }
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
        { id: "admin", title: "Admin" }
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

webix.protoUI(
  {
    name: "editlist"
  },
  webix.EditAbility,
  webix.ui.list
);

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
        },
        {
          view: "button",
          label: "Add new",
          gravity: 0.2,
          css: "webix_primary",
          click: () => {
            const name = $$("listFilter").getValue();
            usersCollection.add(
              {
                name: name,
                age: getRandomInt(1, 100),
                country: "USA"
              },
              0
            );
          }
        }
      ]
    },
    {
      view: "editlist",
      id: "usersList",
      template:
        "<div class= 'users-list--flex'>{common.userInfo()}{common.deleteIcon}</div>",
      type: {
        userInfo: function(obj) {
          return `<span>${obj.name}, ${obj.age}, from ${obj.country}</span>`;
        },
        deleteIcon: "<span class='remove-btn webix_icon wxi-close'></span>"
      },
      onClick: {
        "remove-btn": function(e, id) {
          usersCollection.remove(id);
          return false;
        }
      },
      rules: {
        name: webix.rules.isNotEmpty
      },
      editable: true,
      editor: "text",
      editValue: "name"
    }
  ]
};

const usesDiagram = {
  view: "chart",
  id: "usersChart",
  type: "bar",
  value: "#age#",
  xAxis: {
    title: "Country",
    template: function(obj) {
      if (obj.$group) return obj.country;
      else return obj.age;
    }
  }
};

const users = {
  id: "users",
  rows: [usersList, usesDiagram]
};

webix.protoUI(
  {
    name: "edittreetable"
  },
  webix.EditAbility,
  webix.ui.treetable
);

const productsTable = {
  view: "treetable",
  id: "products",
  select: "cell",
  editable: true,
  columns: [
    { id: "id", header: "", adjust: true },
    {
      id: "title",
      header: "Title",
      template: "{common.treetable()} #title#",
      adjust: true,
      editor: "text",
      fillspace: true
    },
    { id: "price", header: "Price", editor: "text", adjust: true }
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    price: webix.rules.isNumber
  },
  ready: function() {
    this.openAll();
  },
  url: "./data/products.js"
};

const adminForm = {
  view: "form",
  id: "addCategoryForm",
  gravity: 1,
  minWidth: 180,
  maxWidth: 250,
  elements: [
    { template: "EDIT CATEGORY", type: "section" },
    {
      view: "text",
      label: "Category",
      name: "value",
      invalidMessage: "Must be filled"
    },
    {
      margin: 20,
      cols: [
        {
          view: "button",
          label: "Add new",
          css: "webix_primary",
          click: function() {
            const form = $$("addCategoryForm");
            if (form.validate()) {
              filmCategoriesCollection.add(form.getValues(), 0);
              form.clear();
            } else {
              webix.message("Invalid values");
              return false;
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
    value: webix.rules.isNotEmpty
  }
};

const adminDataTable = {
  view: "datatable",
  id: "categoryDataTable",
  minWidth: 300,
  fillspace: true,
  select: true,
  hover: "row--hover",
  columns: [
    { id: "id", header: "", sort: "int", width: 40, css: "column--id" },
    {
      id: "value",
      header: [{ text: "Film category" }],
      sort: "string",
      adjust: true,
      fillspace: true
    },
    {
      header: "",
      template: "<span class='remove-btn webix_icon wxi-trash'></span>"
    }
  ],
  scrollX: false,
  onClick: {
    "remove-btn": function(e, id) {
      filmCategoriesCollection.remove(id);
      return false;
    }
  },
  on: {
    onAfterAdd: function(id) {
      this.showItem(id);
    }
  }
};

const dashboard = {
  id: "dashboard",
  cols: [{ rows: [filterOptions, dataTable] }, form]
};

const admin = {
  id: "admin",
  cols: [adminDataTable, adminForm]
};

const multiView = {
  view: "multiview",
  cells: [dashboard, users, productsTable, admin]
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

  webix.ui({
    rows: [header, content, footer]
  });

  $$("usersList").sync(usersCollection);
  $$("usersChart").sync(usersCollection, function() {
    this.group({
      by: "country",
      map: {
        age: ["id", "count"]
      }
    });
  });
  $$("addCategoryForm").bind($$("categoryDataTable"));
  $$("categoryDataTable").sync(filmCategoriesCollection);
});
