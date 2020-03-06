webix.protoUI(
  {
    name: "autoGenForm",
    defaults: {
      cancelAction: function() {
        this.clear();
      },
      saveAction: function() {
        webix.message(JSON.stringify(this.getValues(), null, 2));
      }
    },
    $init: function(config) {
      config.elements = config.fields.map(field => {
        return {
          view: "text",
          label: `${field[0].toUpperCase()}${field.slice(1)}`,
          name: field
        };
      });
      config.elements.push(this.buttonConfiguration());
    },
    buttonConfiguration: function() {
      return {
        margin: 40,
        cols: [
          {
            view: "button",
            value: "Add",
            gravity: 0.2,
            css: "webix_primary",
            click: webix.bind(function() {
              this.config.saveAction.call(this);
            }, this)
          },
          {
            view: "button",
            value: "Clear",
            gravity: 0.2,
            click: webix.bind(function() {
              this.config.cancelAction.call(this);
            }, this)
          }
        ]
      };
    }
  },
  webix.ui.form
);
