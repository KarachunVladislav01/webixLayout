import { filmsSet } from "./data/test-data.js";

webix.ready(function() {
  webix
    .ui({
      id: "layout",
      rows: [
        {
          cols: [
            { view: "label", label: "My App" },
            {},
            { view: "button", label: "Profile" }
          ]
        },
        {
          cols: [
            {
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
            },
            { view: "resizer" },
            {
              view: "datatable",
              data: filmsSet,
              autoConfig: true,
              autoheight: true
            },
            {
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
            }
          ]
        },
        {
          template:
            "The software is provided by https://docs.webix.com. Allrights reseved (c)"
        }
      ]
    })
    .show();
});
